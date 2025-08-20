import * as React from 'react';
import { toast as sonnerToast, Toaster as SonnerToaster } from 'sonner';
import { cn } from '@/lib/utils';

// Toast component using Sonner
export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Toast function to trigger notifications
export const toast = {
  default: (message: string, options?: Omit<ToastProps, 'variant'>) => {
    return sonnerToast(message, {
      description: options?.description,
      duration: options?.duration,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });
  },

  success: (message: string, options?: Omit<ToastProps, 'variant'>) => {
    return sonnerToast.success(message, {
      description: options?.description,
      duration: options?.duration,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });
  },

  error: (message: string, options?: Omit<ToastProps, 'variant'>) => {
    return sonnerToast.error(message, {
      description: options?.description,
      duration: options?.duration,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });
  },

  warning: (message: string, options?: Omit<ToastProps, 'variant'>) => {
    return sonnerToast.warning(message, {
      description: options?.description,
      duration: options?.duration,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });
  },

  info: (message: string, options?: Omit<ToastProps, 'variant'>) => {
    return sonnerToast.info(message, {
      description: options?.description,
      duration: options?.duration,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });
  },

  promise: sonnerToast.promise,
  dismiss: sonnerToast.dismiss,
  loading: sonnerToast.loading,
};

// Toaster component to render notifications
export interface ToasterProps {
  className?: string;
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  expand?: boolean;
  richColors?: boolean;
  closeButton?: boolean;
}

export function Toaster({
  className,
  position = 'bottom-right',
  expand = false,
  richColors = true,
  closeButton = true,
  ...props
}: ToasterProps) {
  return (
    <SonnerToaster
      className={cn('toaster group', className)}
      position={position}
      expand={expand}
      richColors={richColors}
      closeButton={closeButton}
      toastOptions={{
        classNames: {
          toast: cn(
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg'
          ),
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
}
