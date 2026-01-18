import React, { useState } from 'react';
import {
  X,
  Heart,
  Share2,
  Send,
  Bookmark,
  MessageCircle,
  Bot,
  Sparkles,
  User,
  Image,
  Edit2,
  Trash2,
  Check,
  MoreHorizontal
} from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';
import { formatTime } from '../utils/formatTime';
import type { PostModalProps } from '../types';

const PostModal: React.FC<PostModalProps> = ({
  post,
  onClose,
  onLike,
  onComment,
  onShare,
  onEdit,
  onDelete,
  commentText,
  setCommentText
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post?.descricao || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!post) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSaveEdit = async () => {
    if (editText.trim() !== post.descricao) {
      await onEdit(post._id, { descricao: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(post.descricao);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await onDelete(post._id);
    setShowDeleteConfirm(false);
    onClose(); // Fechar modal após deletar
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex shadow-2xl animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Section */}
        <div className="flex-1 bg-black flex items-center justify-center min-h-0">
          {post.imgUrl ? (
            <img
              src={post.imgUrl}
              alt={post.alt || 'Imagem do post'}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-white text-center p-8">
              <Image size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Post sem imagem</p>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="w-96 flex flex-col bg-white dark:bg-gray-800">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">
                    {(post.autor || 'U')[0].toUpperCase()}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <Bot size={8} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {post.autor || 'Usuário'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Bot size={10} />
                  {formatTime(post.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Options Menu */}
              <div className="relative">
                <button 
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <MoreHorizontal size={20} className="text-gray-400" />
                </button>
                
                {showOptions && (
                  <div className="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-10 min-w-[160px]">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setShowOptions(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-gray-700 dark:text-gray-300"
                    >
                      <Edit2 size={16} />
                      Editar post
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(true);
                        setShowOptions(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2 text-red-600 dark:text-red-400"
                    >
                      <Trash2 size={16} />
                      Deletar post
                    </button>
                  </div>
                )}
              </div>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors group"
              >
                <X size={24} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          <ConfirmationModal
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={handleDelete}
            title="Deletar Post"
            message="Tem certeza que deseja deletar este post? Esta ação não pode ser desfeita."
            confirmText="Deletar"
            cancelText="Cancelar"
            type="danger"
          />

          {/* Description */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">
                  {(post.autor || 'U')[0].toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={4}
                      maxLength={1000}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {editText.length}/1000 caracteres
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                        >
                          <X size={16} />
                        </button>
                        <button
                          onClick={handleSaveEdit}
                          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Check size={16} />
                          Salvar
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-900 dark:text-gray-100 leading-relaxed">
                      <span className="font-semibold mr-2">{post.autor || 'Usuário'}</span>
                      {post.descricao}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full px-2 py-1 flex items-center gap-1">
                        <Sparkles size={10} className="text-purple-600 dark:text-purple-400" />
                        <span className="text-xs text-purple-700 dark:text-purple-300 font-medium">
                          Descrição gerada por IA
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar min-h-0">
            {post.comentarios && post.comentarios.length > 0 ? (
              post.comentarios.map((comentario, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 animate-fade-in-up" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">
                      {(comentario.autor || 'U')[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      <span className="font-semibold mr-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">
                        {comentario.autor}
                      </span>
                      <span className="break-words">{comentario.texto}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatTime(comentario.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Nenhum comentário ainda
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                  Seja o primeiro a comentar!
                </p>
              </div>
            )}
          </div>

          {/* Actions and New Comment */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900/50 flex-shrink-0">
            
            {/* Action Buttons */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-6">
                
                {/* Like Button */}
                <button
                  onClick={() => onLike(post._id)}
                  className="group flex items-center gap-2 transition-all duration-200"
                >
                  <div className={`p-2 rounded-full transition-all ${
                    post.isLiked 
                      ? 'bg-red-100 dark:bg-red-900/30' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}>
                    <Heart 
                      size={24} 
                      className={`transition-all duration-200 ${
                        post.isLiked 
                          ? 'text-red-500 fill-red-500' 
                          : 'text-gray-700 dark:text-gray-300 group-hover:text-red-500'
                      }`}
                    />
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {post.curtidas || 0}
                  </span>
                </button>

                {/* Share Button */}
                <button
                  onClick={() => onShare(post)}
                  className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Share2 
                    size={24} 
                    className="text-gray-700 dark:text-gray-300 group-hover:text-green-500 transition-colors"
                  />
                </button>
              </div>

              {/* Bookmark Button */}
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                <Bookmark size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-yellow-500 transition-colors" />
              </button>
            </div>

            {/* Comment Input */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-white" />
              </div>
              <input
                type="text"
                placeholder="Adicione um comentário..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    onComment(post._id);
                  }
                }}
                className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
              />
              <button
                onClick={() => onComment(post._id)}
                disabled={!commentText.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:shadow-none"
              >
                <Send size={16} />
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
