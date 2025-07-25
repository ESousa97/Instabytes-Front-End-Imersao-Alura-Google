import { useState, useCallback } from 'react';
import axios from 'axios';
import type { Post } from '../types';

const API_BASE_URL = 'http://localhost:3000';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  // Buscar todos os posts
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/posts`);
      
      if (response.data.success) {
        setPosts(response.data.data || []);
      } else {
        throw new Error(response.data.message || 'Erro ao carregar posts');
      }
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      throw error;
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
    
    try {
      const formData = new FormData();
      formData.append('imagem', file);
      formData.append('autor', 'Usuário');

      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Erro no upload');
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erro ao enviar imagem');
      }
      throw error;
    } finally {
      setUploading(false);
    }
  }, []);

  // Curtir post
  const handleLike = useCallback(async (postId: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts/${postId}/curtir`, {
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
      }
    } catch (error) {
      console.error('Erro ao curtir:', error);
      throw error;
    }
  }, []);

  // Adicionar comentário
  const handleComment = useCallback(async (postId: string, texto: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts/${postId}/comentarios`, {
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
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Erro ao adicionar comentário');
      }
    } catch (error) {
      console.error('Erro ao comentar:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erro ao adicionar comentário');
      }
      throw error;
    }
  }, []);

  return {
    posts,
    loading,
    uploading,
    fetchPosts,
    handleFileUpload,
    handleLike,
    handleComment
  };
};
