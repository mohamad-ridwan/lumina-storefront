/**
 * @fileoverview Alert Component
 * Alert component for displaying messages and notifications
 */

import { cn } from '@/shared/lib/utils';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { ReactNode, useState } from 'react';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles = {
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: 'text-blue-600',
    IconComponent: Info,
  },
  success: {
    container: 'bg-green-50 border-green-200 text-green-800',
    icon: 'text-green-600',
    IconComponent: CheckCircle,
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    icon: 'text-yellow-600',
    IconComponent: AlertCircle,
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800',
    icon: 'text-red-600',
    IconComponent: XCircle,
  },
};

export const Alert = ({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  
  const { container, icon, IconComponent } = variantStyles[variant];

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'border rounded-lg p-4 flex items-start gap-3',
        container,
        className
      )}
      role="alert"
    >
      <IconComponent className={cn('h-5 w-5 flex-shrink-0 mt-0.5', icon)} />
      
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="font-medium mb-1">
            {title}
          </h4>
        )}
        <div className="text-sm">
          {children}
        </div>
      </div>

      {dismissible && (
        <button
          onClick={handleDismiss}
          className={cn(
            'flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors',
            icon
          )}
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};