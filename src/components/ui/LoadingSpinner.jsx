import React from 'react';
import Icon from '../AppIcon';

const LoadingSpinner = ({ 
  size = 24, 
  className = '', 
  text = '', 
  variant = 'default' 
}) => {
  const getSpinnerClasses = () => {
    const baseClasses = 'animate-spin';
    
    switch (variant) {
      case 'button':
        return `${baseClasses} text-current`;
      case 'overlay':
        return `${baseClasses} text-primary`;
      case 'inline':
        return `${baseClasses} text-muted-foreground`;
      default:
        return `${baseClasses} text-primary`;
    }
  };

  const getContainerClasses = () => {
    switch (variant) {
      case 'overlay':
        return 'fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-1100';
      case 'inline':
        return 'inline-flex items-center space-x-2';
      case 'button':
        return 'inline-flex items-center space-x-2';
      default:
        return 'flex items-center justify-center space-x-2';
    }
  };

  if (variant === 'overlay') {
    return (
      <div className={getContainerClasses()}>
        <div className="flex flex-col items-center space-y-3">
          <Icon 
            name="Loader2" 
            size={size} 
            className={getSpinnerClasses()} 
          />
          {text && (
            <p className="text-sm text-muted-foreground font-medium">
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      <Icon 
        name="Loader2" 
        size={size} 
        className={getSpinnerClasses()} 
      />
      {text && (
        <span className="text-sm text-muted-foreground font-medium">
          {text}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;