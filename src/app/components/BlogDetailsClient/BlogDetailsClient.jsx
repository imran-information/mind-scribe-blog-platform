'use client';

import { useGetPostByIdQuery } from '@/app/features/apiSlice';
import Image from 'next/image'; 
import { FaHeart, FaEye, FaCalendarAlt, FaUser } from 'react-icons/fa';

export default function BlogDetailsClient({ id }) {
    const { data: blog, error, isLoading } = useGetPostByIdQuery(id);

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (error || !blog) return <p className="text-center mt-10 text-red-500">Error loading blog.</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64 md:h-96 w-full">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="p-6 md:p-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300 mb-6">
                        <div className="flex items-center gap-2">
                            <FaUser className="text-blue-500" />
                            <span>{blog.author.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-blue-500" />
                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaHeart className="text-red-500" />
                            <span>{blog.likes} Likes</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaEye className="text-blue-500" />
                            <span>{blog.views} Views</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {blog.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="prose max-w-none dark:prose-invert prose-lg">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {blog.content}
                        </p>
                    </div>

                    {blog.author.avatar && (
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={blog.author.avatar}
                                    alt={blog.author.name}
                                    width={64}
                                    height={64}
                                    className="rounded-full"
                                />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        About {blog.author.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Content creator and AI enthusiast
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </article>

            <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    You Might Also Like
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Related posts here */}
                </div>
            </section>
        </div>
    );
}
