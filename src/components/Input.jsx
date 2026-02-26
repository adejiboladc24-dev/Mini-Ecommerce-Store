const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '',
  icon: Icon,
  ...props 
}) => {
  // Check if sophisticated-input class is being used
  const isSophisticated = className.includes('sophisticated-input');
  
  // Base classes - no icon padding since icons are now external
  const baseClasses = `w-full px-4 py-3 rounded-lg focus:outline-none transition-all`;
  
  // Default styling (for regular forms)
  const defaultClasses = `bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400`;
  
  // Use sophisticated styling if that class is present, otherwise use default
  const finalClasses = isSophisticated 
    ? `${baseClasses} ${className}` 
    : `${baseClasses} ${defaultClasses} ${className}`;

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={finalClasses}
      {...props}
    />
  );
};

export default Input;
