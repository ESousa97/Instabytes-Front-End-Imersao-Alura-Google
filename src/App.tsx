import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UploadArea from './components/UploadArea';
import PostCard from './components/PostCard';
import PostModal from './components/PostModal';
import Notification from './components/Notification';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import ScrollToTopButton from './components/ScrollToTopButton';
import { useTheme } from './hooks/useTheme';
import { usePosts } from './hooks/usePosts';
import { useNotification } from './hooks/useNotification';
import type { Post } from './types';

const App: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { 
    posts, 
    loading, 
    uploading, 
    fetchPosts, 
    handleFileUpload, 
    handleLike, 
    handleComment,
    handleEdit,
    handleDelete
  } = usePosts();
  const { notification, showNotification, hideNotification } = useNotification();
  
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentText, setCommentText] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return fallback;
  };

  useEffect(() => {
    fetchPosts();
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchPosts]);

  const handleShare = async (post: Post) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'InstaBytes',
          text: post.descricao,
          url: post.shareUrl || window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(post.shareUrl || window.location.href);
        showNotification('Link copiado! 📋');
      }
    } catch (error: unknown) {
      console.error('Erro ao compartilhar', error);
      showNotification('Erro ao compartilhar', 'error');
    }
  };

  const onFileUpload = async (file: File) => {
    try {
      await handleFileUpload(file);
      showNotification('Imagem enviada e processada com IA! 🎉✨');
      fetchPosts();
    } catch (error: unknown) {
      showNotification(getErrorMessage(error, 'Erro ao enviar imagem'), 'error');
    }
  };

  const onComment = async (postId: string) => {
    if (!commentText.trim()) return;
    
    try {
      await handleComment(postId, commentText.trim());
      setCommentText('');
      showNotification('Comentário adicionado! 💬');
    } catch (error: unknown) {
      showNotification(getErrorMessage(error, 'Erro ao adicionar comentário'), 'error');
    }
  };

  const onEdit = async (postId: string, updateData: { descricao?: string; alt?: string; autor?: string }) => {
    try {
      await handleEdit(postId, updateData);
      showNotification('Post editado com sucesso! ✏️');
      
      // Atualizar o post selecionado no modal se estiver aberto
      if (selectedPost && selectedPost._id === postId) {
        setSelectedPost(prev => prev ? { ...prev, ...updateData } : null);
      }
    } catch (error: unknown) {
      showNotification(getErrorMessage(error, 'Erro ao editar post'), 'error');
    }
  };

  const onDelete = async (postId: string) => {
    try {
      await handleDelete(postId);
      showNotification('Post deletado com sucesso! 🗑️');
      
      // Fechar modal se o post deletado estiver sendo visualizado
      if (selectedPost && selectedPost._id === postId) {
        setSelectedPost(null);
      }
    } catch (error: unknown) {
      showNotification(getErrorMessage(error, 'Erro ao deletar post'), 'error');
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black min-h-screen">
        
        {/* Header */}
        <Header 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onFileUpload={onFileUpload}
          uploading={uploading}
        />

        {/* Notificação */}
        <Notification 
          notification={notification}
          onClose={hideNotification}
        />

        {/* Área de Upload */}
        <UploadArea 
          onFileUpload={onFileUpload}
          uploading={uploading}
        />

        {/* Conteúdo Principal */}
        <main className="max-w-4xl mx-auto px-4 pb-8">
          {loading ? (
            <LoadingSpinner />
          ) : posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-8">
              {posts.map((post, index) => (
                <PostCard
                  key={post._id}
                  post={post}
                  index={index}
                  onLike={handleLike}
                  onComment={onComment}
                  onShare={handleShare}
                  onOpenModal={() => setSelectedPost(post)}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  commentText={commentText}
                  setCommentText={setCommentText}
                />
              ))}
            </div>
          )}
        </main>

        {/* Botão de Scroll para o Topo */}
        <ScrollToTopButton show={showScrollTop} />

        {/* Modal de Post */}
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={handleLike}
          onComment={onComment}
          onShare={handleShare}
          onEdit={onEdit}
          onDelete={onDelete}
          commentText={commentText}
          setCommentText={setCommentText}
        />
      </div>
    </div>
  );
};

export default App;
