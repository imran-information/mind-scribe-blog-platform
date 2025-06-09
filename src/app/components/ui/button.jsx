'use client';

export default function Button({
    children,
    onClick,
    disabled = false,
    type = 'button',
    variant = 'primary',  
    size = 'md',  
    className = '',
    ...props
}) {
    // Base styles
    const baseStyles = `
        inline-flex items-center justify-center
        font-medium rounded-md
        focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-colors duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
    `;

    // Size variants
    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    // Color variants
    const variantStyles = {
        primary: `
            bg-blue-600 text-white
            hover:bg-blue-700
            focus:ring-blue-500
            active:bg-blue-800
        `,
        outline: `
            border border-blue-600 text-blue-600
            hover:bg-blue-50
            focus:ring-blue-500
            active:bg-blue-100
        `,
        ghost: `
            text-blue-600
            hover:bg-blue-50
            focus:ring-blue-500
            active:bg-blue-100
        `,
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                ${baseStyles}
                ${sizeStyles[size]}
                ${variantStyles[variant]}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}