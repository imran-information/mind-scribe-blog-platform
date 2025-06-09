import React from 'react';

// Basic Skeleton component
export const Skeleton = ({
  className = '',
  variant = 'default',
  ...props
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded-md';  

  const variants = {
    default: '',
    card: 'h-full w-full rounded-lg',
    text: 'h-4 w-full',
    avatar: 'h-10 w-10 rounded-full',
    button: 'h-10 w-24 rounded-md',
    image: 'h-48 w-full rounded-lg',
    title: 'h-6 w-3/4 rounded',
    subtitle: 'h-4 w-1/2 rounded',
  };

  const variantClass = variants[variant] || variants.default;

  return (
    <div
      className={`${baseClasses} ${variantClass} ${className}`}
      {...props}
    />
  );
};

// SkeletonCard component
export const SkeletonCard = () => (
  <div className="space-y-4">
    <Skeleton variant="image" />
    <div className="space-y-2">
      <Skeleton variant="title" />
      <Skeleton variant="subtitle" />
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-3/4" />
    </div>
  </div>
);

// SkeletonPost component (avatar + text)
export const SkeletonPost = () => (
  <div className="flex space-x-4">
    <Skeleton variant="avatar" />
    <div className="flex-1 space-y-2">
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-1/2" />
    </div>
  </div>
);

// SkeletonList: for lists of posts
export const SkeletonList = ({ count = 3 }) => (
  <div className="space-y-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonPost key={i} />
    ))}
  </div>
);

// SkeletonGrid: for card layout
export const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);
