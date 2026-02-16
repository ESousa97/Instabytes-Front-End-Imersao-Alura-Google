import React from 'react';
import { Check, X } from 'lucide-react';

type PostDescriptionEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  rows: number;
  className?: string;
  maxLength?: number;
};

const PostDescriptionEditor: React.FC<PostDescriptionEditorProps> = ({
  value,
  onChange,
  onCancel,
  onSave,
  rows,
  className,
  maxLength = 1000
}) => {
  return (
    <div className={className ? `${className} space-y-3` : 'space-y-3'}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        rows={rows}
        maxLength={maxLength}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {value.length}/{maxLength} caracteres
        </span>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <X size={16} />
          </button>
          <button
            onClick={onSave}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-1"
          >
            <Check size={16} />
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDescriptionEditor;