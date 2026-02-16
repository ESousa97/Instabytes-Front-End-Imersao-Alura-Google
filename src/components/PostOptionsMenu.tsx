import React from 'react';
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react';

type PostOptionsMenuProps = {
  showOptions: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  triggerButtonClassName?: string;
  triggerIconClassName?: string;
};

const PostOptionsMenu: React.FC<PostOptionsMenuProps> = ({
  showOptions,
  onToggle,
  onEdit,
  onDelete,
  triggerButtonClassName = 'p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors',
  triggerIconClassName = 'text-gray-400'
}) => {
  return (
    <div className="relative">
      <button onClick={onToggle} className={triggerButtonClassName}>
        <MoreHorizontal size={20} className={triggerIconClassName} />
      </button>

      {showOptions && (
        <div className="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-10 min-w-[160px]">
          <button
            onClick={onEdit}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-gray-700 dark:text-gray-300"
          >
            <Edit2 size={16} />
            Editar post
          </button>
          <button
            onClick={onDelete}
            className="w-full px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2 text-red-600 dark:text-red-400"
          >
            <Trash2 size={16} />
            Deletar post
          </button>
        </div>
      )}
    </div>
  );
};

export default PostOptionsMenu;