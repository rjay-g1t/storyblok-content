'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type ButtonAction =
  | { type: 'navigate'; path: string }
  | { type: 'refresh' }
  | { type: 'back' }
  | { type: 'external'; url: string }
  | { type: 'custom'; handler: () => void }
  | { type: 'copy'; text: string }
  | { type: 'download'; url: string; filename?: string };

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'outline'
  | 'ghost'
  | 'link';

type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonConfig {
  id: string;
  label: string;
  action: ButtonAction;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

interface ClientButtonsProps {
  buttons: ButtonConfig[];
  layout?: 'horizontal' | 'vertical' | 'grid';
  alignment?: 'left' | 'center' | 'right' | 'between' | 'around';
  spacing?: 'tight' | 'normal' | 'loose';
  containerClassName?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full';
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  outline:
    'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
  ghost: 'text-gray-600 hover:text-gray-800 hover:bg-gray-100',
  link: 'text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline',
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const containerMaxWidths: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  full: 'max-w-full',
};

const layoutStyles: Record<string, string> = {
  horizontal: 'flex',
  vertical: 'flex flex-col',
  grid: 'grid grid-cols-2 gap-4',
};

const alignmentStyles: Record<string, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

const spacingStyles: Record<string, string> = {
  tight: 'gap-2',
  normal: 'gap-4',
  loose: 'gap-6',
};

export function ClientButtons({
  buttons,
  layout = 'horizontal',
  alignment = 'between',
  spacing = 'normal',
  containerClassName = '',
  maxWidth = '4xl',
}: ClientButtonsProps) {
  const router = useRouter();

  const handleButtonClick = async (action: ButtonAction) => {
    switch (action.type) {
      case 'navigate':
        router.push(action.path);
        break;

      case 'refresh':
        window.location.reload();
        break;

      case 'back':
        router.back();
        break;

      case 'external':
        window.open(action.url, '_blank', 'noopener,noreferrer');
        break;

      case 'custom':
        action.handler();
        break;

      case 'copy':
        try {
          await navigator.clipboard.writeText(action.text);
          console.log('Copied to clipboard:', action.text);
        } catch (error) {
          console.error('Failed to copy to clipboard:', error);
        }
        break;

      case 'download':
        const link = document.createElement('a');
        link.href = action.url;
        if (action.filename) {
          link.download = action.filename;
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;

      default:
        console.warn('Unknown button action type');
    }
  };

  const renderButton = (button: ButtonConfig) => {
    const {
      id,
      label,
      action,
      variant = 'outline',
      size = 'md',
      icon,
      disabled = false,
      loading = false,
      className = '',
    } = button;

    const baseClasses =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variantClasses = buttonVariants[variant];
    const sizeClasses = buttonSizes[size];

    const buttonClasses =
      `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim();

    return (
      <button
        key={id}
        onClick={() => handleButtonClick(action)}
        disabled={disabled || loading}
        className={buttonClasses}
        aria-label={label}
      >
        {loading ? (
          <svg
            className="w-4 h-4 mr-2 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        ) : icon ? (
          <span className="mr-2">{icon}</span>
        ) : null}
        {label}
      </button>
    );
  };

  const containerClasses = [
    containerMaxWidths[maxWidth],
    'mx-auto mt-8',
    layoutStyles[layout],
    layout === 'horizontal' ? alignmentStyles[alignment] : '',
    layout !== 'grid' ? spacingStyles[spacing] : '',
    containerClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={containerClasses}>{buttons.map(renderButton)}</div>;
}
