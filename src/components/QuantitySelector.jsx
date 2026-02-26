import { Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const QuantitySelector = ({ quantity, onIncrease, onDecrease, min = 1, max = 99 }) => {
  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-dark-hover rounded-lg p-1">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onDecrease}
        disabled={quantity <= min}
        className="p-2 rounded-lg hover:bg-white dark:hover:bg-dark-card transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus size={16} className="text-gray-700 dark:text-gray-300" />
      </motion.button>
      
      <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
        {quantity}
      </span>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onIncrease}
        disabled={quantity >= max}
        className="p-2 rounded-lg hover:bg-white dark:hover:bg-dark-card transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus size={16} className="text-gray-700 dark:text-gray-300" />
      </motion.button>
    </div>
  );
};

export default QuantitySelector;
