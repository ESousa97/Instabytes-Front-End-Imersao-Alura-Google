import React, { useState, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  X,
  Image as ImageIcon,
  Loader2,
  Camera,
  AlertCircle,
} from 'lucide-react';

// -----------------------
// TIPOS (INTERFACES)
// -----------------------

/** Representa um comentário em um post */
interface Comentario {
  _id: string;
  autor: string;
  texto: string;
  createdAt: string;
}

/** Representa um post */
interface Post {
  _id: string;
  autor: string;
  imgUrl: string;
  alt?: string;
  descricao: string;
  curtidas: number;
  createdAt: string;
  comentarios: Comentario[];
  shareUrl?: string;
}

// -----------------------
// CONSTANTES
// -----------------------

const API_BASE_URL =
  'http://localhost:3000';

// -----------------------
// COMPONENTE PRINCIPAL
// -----------------------

const InstagramClone: React.FC = () => {
  // -----------------------
  // STATES
  // -----------------------
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [notification, setNotification] = useState<
    { message: string; type: 'success' | 'error' } | null
  >(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentText, setCommentText] = useState<string>('');

  // -----------------------
  // BUSCA DE POSTS AO CARREGAR
  // -----------------------
  useEffect(() => {
    fetchPosts();
  }, []);

  /** Busca todos os posts do backend */
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/posts`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.data || []);
      } else {
        throw new Error(data.message || 'Erro ao carregar posts');
      }
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      showNotification('Erro ao carregar posts', 'error');
    } finally {
      setLoading(false);
    }
  };

  /** Exibe uma notificação */
  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // -----------------------
  // UPLOAD DE IMAGEM
  // -----------------------

  /** Faz o upload do arquivo selecionado */
  const handleFileUpload = async (file: File | null) => {
    if (!file) return;

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      showNotification('Apenas imagens são permitidas (JPEG, PNG, GIF, WEBP)', 'error');
      return;
    }

    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification('Arquivo muito grande. Máximo 5MB.', 'error');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('imagem', file);
    formData.append('autor', 'Usuário');

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        showNotification('Imagem enviada com sucesso! 🎉');
        setSelectedFile(null);
        fetchPosts(); // Recarregar posts
      } else {
        throw new Error(data.message || 'Erro no upload');
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      showNotification('Erro ao enviar imagem', 'error');
    } finally {
      setUploading(false);
    }
  };

  // -----------------------
  // DRAG AND DROP
  // -----------------------

  /** Manipula eventos de drag na área de upload */
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  /** Manipula o drop do arquivo na área de upload */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      handleFileUpload(file);
    }
  };

  // -----------------------
  // CURTIR POST
  // -----------------------

  /** Realiza a ação de curtir em um post */
  const handleLike = async (postId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/curtir`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ acao: 'curtir' }),
      });

      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? { ...post, curtidas: (post.curtidas || 0) + 1 }
              : post
          )
        );
      }
    } catch (error) {
      console.error('Erro ao curtir:', error);
    }
  };

  // -----------------------
  // ADICIONAR COMENTÁRIO
  // -----------------------

  /** Adiciona um comentário em um post */
  const handleComment = async (postId: string) => {
    if (!commentText.trim()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/comentarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          autor: 'Usuário',
          texto: commentText.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  comentarios: [...(post.comentarios || []), data.data],
                }
              : post
          )
        );
        setCommentText('');
        showNotification('Comentário adicionado!');
      }
    } catch (error) {
      console.error('Erro ao comentar:', error);
      showNotification('Erro ao adicionar comentário', 'error');
    }
  };

  // -----------------------
  // COMPARTILHAR POST
  // -----------------------

  /** Compartilha o post (Web Share API ou copia link) */
  const handleShare = async (post: Post) => {
    const shareData = {
      title: 'InstaBytes',
      text: post.descricao,
      url: post.shareUrl || window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        showNotification('Link copiado para a área de transferência!');
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
      showNotification('Erro ao compartilhar', 'error');
    }
  };

  // -----------------------
  // RENDERIZAÇÃO
  // -----------------------

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            InstaBytes
          </h1>

          <div className="flex items-center gap-4">
            <label
              htmlFor="file-upload"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 transition-colors"
            >
              <Camera size={20} />
              Upload
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                  setSelectedFile(file);
                  handleFileUpload(file);
                }
              }}
              className="hidden"
            />
          </div>
        </div>
      </header>

      {/* Notificação */}
      {notification && (
        <div
          className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-green-500 text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'error' && <AlertCircle size={20} />}
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-2 hover:opacity-70"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Área de Upload (Drag & Drop) */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 size={48} className="text-blue-500 animate-spin" />
              <p className="text-gray-600">Processando imagem com IA...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <ImageIcon size={48} className="text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-700">
                  Arraste uma imagem aqui ou clique em Upload
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  PNG, JPG, GIF até 5MB - Legenda gerada automaticamente com IA
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lista de Posts */}
      <main className="max-w-4xl mx-auto px-4 pb-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="text-blue-500 animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon size={64} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhum post ainda</p>
            <p className="text-gray-400">Seja o primeiro a compartilhar uma imagem!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Cabeçalho do Post */}
                <div className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {(post.autor || 'U')[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {post.autor || 'Usuário'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                {/* Imagem do Post */}
                {post.imgUrl && (
                  <div className="relative">
                    <img
                      src={post.imgUrl}
                      alt={post.alt || 'Imagem do post'}
                      className="w-full h-96 object-cover cursor-pointer hover:opacity-95 transition-opacity"
                      onClick={() => setSelectedPost(post)}
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Ações do Post */}
                <div className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <button
                      onClick={() => handleLike(post._id)}
                      className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors"
                    >
                      <Heart size={24} className="hover:scale-110 transition-transform" />
                      <span className="font-medium">{post.curtidas || 0}</span>
                    </button>

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors"
                    >
                      <MessageCircle size={24} />
                      <span className="font-medium">
                        {post.comentarios?.length || 0}
                      </span>
                    </button>

                    <button
                      onClick={() => handleShare(post)}
                      className="flex items-center gap-2 text-gray-700 hover:text-green-500 transition-colors"
                    >
                      <Share2 size={24} />
                    </button>
                  </div>

                  {/* Descrição */}
                  <div className="mb-3">
                    <p className="text-gray-900">
                      <span className="font-semibold mr-2">
                        {post.autor || 'Usuário'}
                      </span>
                      {post.descricao}
                    </p>
                  </div>

                  {/* Comentários Preview */}
                  {post.comentarios && post.comentarios.length > 0 && (
                    <div className="space-y-2">
                      {post.comentarios.slice(0, 2).map((comentario, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-semibold mr-2">
                            {comentario.autor}
                          </span>
                          <span className="text-gray-700">
                            {comentario.texto}
                          </span>
                        </div>
                      ))}
                      {post.comentarios.length > 2 && (
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Ver todos os {post.comentarios.length} comentários
                        </button>
                      )}
                    </div>
                  )}

                  {/* Adicionar Comentário */}
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
                    <input
                      type="text"
                      placeholder="Adicione um comentário..."
                      value={commentText}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCommentText(e.target.value)
                      }
                      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          handleComment(post._id);
                        }
                      }}
                      className="flex-1 border-none outline-none text-sm placeholder-gray-400"
                    />
                    <button
                      onClick={() => handleComment(post._id)}
                      disabled={!commentText.trim()}
                      className="text-blue-500 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Modal de Post Detalhado */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagem */}
            <div className="flex-1 bg-black flex items-center justify-center">
              {selectedPost.imgUrl ? (
                <img
                  src={selectedPost.imgUrl}
                  alt={selectedPost.alt || 'Imagem do post'}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-white text-center p-8">
                  <ImageIcon size={64} className="mx-auto mb-4 opacity-50" />
                  <p>Post sem imagem</p>
                </div>
              )}
            </div>

            {/* Sidebar com detalhes */}
            <div className="w-96 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {(selectedPost.autor || 'U')[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">
                      {selectedPost.autor || 'Usuário'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {new Date(selectedPost.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Descrição */}
              <div className="p-4 border-b border-gray-200">
                <p className="text-sm">
                  <span className="font-semibold mr-2">
                    {selectedPost.autor || 'Usuário'}
                  </span>
                  {selectedPost.descricao}
                </p>
              </div>

              {/* Comentários */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {selectedPost.comentarios && selectedPost.comentarios.length > 0 ? (
                  selectedPost.comentarios.map((comentario, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                        {(comentario.autor || 'U')[0].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold mr-2">{comentario.autor}</span>
                          {comentario.texto}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(comentario.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm text-center py-8">
                    Nenhum comentário ainda
                  </p>
                )}
              </div>

              {/* Ações e novo comentário */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => handleLike(selectedPost._id)}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors"
                  >
                    <Heart size={24} />
                    <span className="font-medium">
                      {selectedPost.curtidas || 0}
                    </span>
                  </button>

                  <button
                    onClick={() => handleShare(selectedPost)}
                    className="flex items-center gap-2 text-gray-700 hover:text-green-500 transition-colors"
                  >
                    <Share2 size={24} />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Adicione um comentário..."
                    value={commentText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCommentText(e.target.value)
                    }
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === 'Enter') {
                        handleComment(selectedPost._id);
                      }
                    }}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleComment(selectedPost._id)}
                    disabled={!commentText.trim()}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramClone;
