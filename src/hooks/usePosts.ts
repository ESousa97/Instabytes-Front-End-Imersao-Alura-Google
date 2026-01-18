import { useState, useCallback } from 'react';
import axios from 'axios';
import type { Post } from '../types';

// Configurar a URL base da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Configurar axios com timeout e interceptors
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para log de requests (apenas em desenvolvimento)
if (import.meta.env.MODE === 'development') {
  api.interceptors.request.use(
    (config) => {
      console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error('❌ API Request Error:', error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
      return response;
    },
    (error) => {
      console.error('❌ API Response Error:', error.response?.status, error.message);
      return Promise.reject(error);
    }
  );
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  // Buscar todos os posts
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      console.log('🔍 Buscando posts...');
      
      const response = await api.get('/posts');
      
      if (response.data.success) {
        const postsData = response.data.data || [];
        console.log(`📝 ${postsData.length} posts encontrados`);
        setPosts(postsData);
      } else {
        throw new Error(response.data.message || 'Erro ao carregar posts');
      }
    } catch (error) {
      console.error('❌ Erro ao buscar posts:', error);
      
      // Se for erro de conexão, mostrar posts mockados para desenvolvimento
      if (axios.isAxiosError(error) && (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK')) {
        console.log('🔧 Usando dados mockados para desenvolvimento');
        setPosts([
          {
            _id: '1',
            autor: 'Demo User',
            imgUrl: 'https://picsum.photos/600/400?random=1',
            alt: 'Imagem de demonstração',
            descricao: 'Esta é uma imagem de demonstração gerada pela IA. O sistema está funcionando perfeitamente! 🚀',
            curtidas: 42,
            createdAt: new Date().toISOString(),
            comentarios: [
              {
                _id: '1',
                autor: 'João',
                texto: 'Que foto incrível! 😍',
                createdAt: new Date().toISOString(),
              },
              {
                _id: '2',
                autor: 'Maria',
                texto: 'A IA está cada vez melhor! 🤖',
                createdAt: new Date().toISOString(),
              }
            ],
            isLiked: false,
          }
        ]);
      }
      
      // Não fazer throw aqui para não quebrar a UI
    } finally {
      setLoading(false);
    }
  }, []);

  // Upload de arquivo
  const handleFileUpload = useCallback(async (file: File) => {
    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Apenas imagens são permitidas (JPEG, PNG, GIF, WEBP)');
    }

    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Arquivo muito grande. Máximo 5MB.');
    }

    setUploading(true);
    console.log('📤 Iniciando upload...', { name: file.name, size: file.size, type: file.type });
    
    try {
      const formData = new FormData();
      formData.append('imagem', file);
      formData.append('autor', 'Usuário');

      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 segundos para upload
      });

      if (response.data.success) {
        console.log('✅ Upload concluído com sucesso!');
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Erro no upload');
      }
    } catch (error) {
      console.error('❌ Erro no upload:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new Error('Upload demorou muito. Tente novamente com uma imagem menor.');
        } else if (error.response?.status === 413) {
          throw new Error('Arquivo muito grande para o servidor.');
        } else if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        } else if (error.code === 'ERR_NETWORK') {
          throw new Error('Erro de conexão. Verifique se o servidor está funcionando.');
        }
      }
      
      throw new Error('Erro inesperado no upload. Tente novamente.');
    } finally {
      setUploading(false);
    }
  }, []);

  // Curtir post
  const handleLike = useCallback(async (postId: string) => {
    try {
      console.log(`👍 Curtindo post ${postId}...`);
      
      const response = await api.post(`/posts/${postId}/curtir`, {
        acao: 'curtir'
      });

      if (response.status === 200) {
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post._id === postId
              ? { ...post, curtidas: (post.curtidas || 0) + 1, isLiked: true }
              : post
          )
        );
        console.log('✅ Post curtido com sucesso!');
      }
    } catch (error) {
      console.error('❌ Erro ao curtir:', error);
      
      // Fallback: atualizar localmente mesmo se der erro na API
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? { ...post, curtidas: (post.curtidas || 0) + 1, isLiked: true }
            : post
        )
      );
    }
  }, []);

  // Adicionar comentário
  const handleComment = useCallback(async (postId: string, texto: string) => {
    try {
      console.log(`💬 Adicionando comentário ao post ${postId}...`);
      
      const response = await api.post(`/posts/${postId}/comentarios`, {
        autor: 'Usuário',
        texto: texto.trim(),
      });

      if (response.data.success) {
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post._id === postId
              ? {
                  ...post,
                  comentarios: [...(post.comentarios || []), response.data.data],
                }
              : post
          )
        );
        console.log('✅ Comentário adicionado com sucesso!');
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Erro ao adicionar comentário');
      }
    } catch (error) {
      console.error('❌ Erro ao comentar:', error);
      
      // Fallback: adicionar comentário localmente
      const novoComentario = {
        _id: Date.now().toString(),
        autor: 'Usuário',
        texto: texto.trim(),
        createdAt: new Date().toISOString(),
      };
      
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? {
                ...post,
                comentarios: [...(post.comentarios || []), novoComentario],
              }
            : post
        )
      );
      
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      
      // Não fazer throw aqui para permitir funcionamento offline
      console.log('💾 Comentário salvo localmente');
    }
  }, []);

  // Editar post
  const handleEdit = useCallback(async (postId: string, updateData: { descricao?: string; alt?: string; autor?: string }) => {
    try {
      console.log(`✏️ Editando post ${postId}...`, updateData);
      
      const response = await api.put(`/posts/${postId}`, updateData);

      if (response.data.success) {
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post._id === postId
              ? { ...post, ...updateData, updatedAt: new Date().toISOString() }
              : post
          )
        );
        console.log('✅ Post editado com sucesso!');
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Erro ao editar post');
      }
    } catch (error) {
      console.error('❌ Erro ao editar post:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Post não encontrado');
        } else if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        } else if (error.code === 'ERR_NETWORK') {
          // Fallback: atualizar localmente
          setPosts(prevPosts =>
            prevPosts.map(post =>
              post._id === postId
                ? { ...post, ...updateData, updatedAt: new Date().toISOString() }
                : post
            )
          );
          console.log('💾 Post editado localmente');
          return;
        }
      }
      
      throw new Error('Erro inesperado ao editar post. Tente novamente.');
    }
  }, []);

  // Deletar post
  const handleDelete = useCallback(async (postId: string) => {
    try {
      console.log(`🗑️ Deletando post ${postId}...`);
      
      const response = await api.delete(`/posts/${postId}`);

      if (response.data.success) {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
        console.log('✅ Post deletado com sucesso!');
        return true;
      } else {
        throw new Error(response.data.message || 'Erro ao deletar post');
      }
    } catch (error) {
      console.error('❌ Erro ao deletar post:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Post não encontrado');
        } else if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        } else if (error.code === 'ERR_NETWORK') {
          // Fallback: remover localmente
          setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
          console.log('💾 Post removido localmente');
          return true;
        }
      }
      
      throw new Error('Erro inesperado ao deletar post. Tente novamente.');
    }
  }, []);

  return {
    posts,
    loading,
    uploading,
    fetchPosts,
    handleFileUpload,
    handleLike,
    handleComment,
    handleEdit,
    handleDelete
  };
};
