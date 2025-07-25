// src/types/index.ts

export interface Comentario {
  _id: string;
  autor: string;
  texto: string;
  createdAt: string;
}

export interface Post {
  _id: string;
  autor: string;
  imgUrl: string;
  alt?: string;
  descricao: string;
  curtidas: number;
  createdAt: string;
  updatedAt?: string;
  comentarios: Comentario[];
  shareUrl?: string;
  isLiked?: boolean;
}

export interface NotificationData {
  message: string;
  type: 'success' | 'error';
}

export interface PostCardProps {
  post: Post;
  index: number;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (post: Post) => void;
  onOpenModal: () => void;
  onEdit: (postId: string, updateData: { descricao?: string; alt?: string; autor?: string }) => Promise<void>;
  onDelete: (postId: string) => Promise<void>;
  commentText: string;
  setCommentText: (text: string) => void;
}

export interface PostModalProps {
  post: Post | null;
  onClose: () => void;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (post: Post) => void;
  onEdit: (postId: string, updateData: { descricao?: string; alt?: string; autor?: string }) => Promise<void>;
  onDelete: (postId: string) => Promise<void>;
  commentText: string;
  setCommentText: (text: string) => void;
}

export interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onFileUpload: (file: File) => void;
  uploading: boolean;
}

export interface UploadAreaProps {
  onFileUpload: (file: File) => void;
  uploading: boolean;
}

export interface NotificationProps {
  notification: NotificationData | null;
  onClose: () => void;
}

export interface ScrollToTopButtonProps {
  show: boolean;
}

export interface EditPostData {
  descricao?: string;
  alt?: string;
  autor?: string;
}
