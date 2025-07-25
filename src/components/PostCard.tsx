import React from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  Bookmark,
  MoreHorizontal,
  Bot,
  Sparkles,
  User,
  Play
} from 'lucide-react';
import type { PostCardProps } from '../types';

const PostCard: React.FC<PostCardProps> = ({
  post,
  index,
  onLike,
  onComment,
  onShare,
  onOpenModal,
  commentText,
  setCommentText
}) => {
  const formatTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'agora';
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <article
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Post Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer">
              <span className="text-white font-bold text-lg">
                {(post.autor || 'U')[0].toUpperCase()}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
              <Bot size={12} className="text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">
              {post.autor || 'Usuário'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Sparkles size={12} />
              {formatTime(post.createdAt)} • Gerado por IA
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors group">
          <MoreHorizontal size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200" />
        </button>
      </div>

      {/* Post Image */}
      {post.imgUrl && (
        <div className="relative group cursor-pointer" onClick={onOpenModal}>
          <img
            src={post.imgUrl}
            alt={post.alt || 'Imagem do post'}
            className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
              <Play size={16} className="text-white" />
            </div>
          </div>
          
          {/* AI Badge */}
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
              <Bot size={12} className="text-white" />
              <span className="text-xs text-white font-medium">IA</span>
            </div>
          </div>
        </div>
      )}

      {/* Post Actions */}
      <div className="p-6">
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
                      ? 'text-red-500 fill-red-500 scale-110' 
                      : 'text-gray-700 dark:text-gray-300 group-hover:text-red-500 group-hover:scale-110'
                  }`}
                />
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {post.curtidas || 0}
              </span>
            </button>

            {/* Comment Button */}
            <button
              onClick={onOpenModal}
              className="group flex items-center gap-2 transition-all duration-200"
            >
              <div className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <MessageCircle 
                  size={24} 
                  className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-200"
                />
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {post.comentarios?.length || 0}
              </span>
            </button>

            {/* Share Button */}
            <button
              onClick={() => onShare(post)}
              className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Share2 
                size={24} 
                className="text-gray-700 dark:text-gray-300 group-hover:text-green-500 group-hover:scale-110 transition-all duration-200"
              />
            </button>
          </div>

          {/* Bookmark Button */}
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
            <Bookmark size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-yellow-500 transition-colors" />
          </button>
        </div>

        {/* Post Description */}
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <p className="text-gray-900 dark:text-gray-100 leading-relaxed flex-1">
              <span className="font-semibold mr-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">
                {post.autor || 'Usuário'}
              </span>
              {post.descricao}
            </p>
            <div className="flex-shrink-0 ml-2">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full px-2 py-1 flex items-center gap-1">
                <Bot size={10} className="text-purple-600 dark:text-purple-400" />
                <span className="text-xs text-purple-700 dark:text-purple-300 font-medium">IA</span>
              </div>
            </div>
          </div>

          {/* Comments Preview */}
          {post.comentarios && post.comentarios.length > 0 && (
            <div className="space-y-2">
              {post.comentarios.slice(0, 2).map((comentario, index) => (
                <div key={index} className="text-sm flex items-start gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">
                      {(comentario.autor || 'U')[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-gray-900 dark:text-gray-100 mr-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">
                      {comentario.autor}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 break-words">
                      {comentario.texto}
                    </span>
                  </div>
                </div>
              ))}
              
              {post.comentarios.length > 2 && (
                <button
                  onClick={onOpenModal}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors font-medium"
                >
                  Ver todos os {post.comentarios.length} comentários
                </button>
              )}
            </div>
          )}

          {/* Add Comment */}
          <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
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
              className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-none outline-none text-sm"
            />
            <button
              onClick={() => onComment(post._id)}
              disabled={!commentText.trim()}
              className="text-purple-600 hover:text-purple-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors p-1 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
