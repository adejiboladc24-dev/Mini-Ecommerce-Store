import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const ToastNotification = () => {
  const { toasts, removeToast } = useToast();

  const icons = {
    success: <CheckCircle className="text-green-500" size={24} />,
    error: <XCircle className="text-red-500" size={24} />,
    info: <Info className="text-blue-500" size={24} />,
  };

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className="bg-white dark:bg-dark-card shadow-lg rounded-lg p-4 flex items-center gap-3 min-w-[300px] border border-gray-200 dark:border-gray-700"
          >
            {icons[toast.type]}
            <p className="flex-1 text-gray-900 dark:text-white font-medium">
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-dark-hover rounded transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastNotification;
