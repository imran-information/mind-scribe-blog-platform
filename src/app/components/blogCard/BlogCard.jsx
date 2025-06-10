import Link from 'next/link'
import React from 'react'
import { FiCalendar, FiClock } from 'react-icons/fi'

export const BlogCard = ({ post }) => {
    return (
        <div key={post._id} className="bg-background rounded-lg shadow-sm border border-muted overflow-hidden hover:shadow-md transition-shadow">
            <Link href={`/blogs/${post._id}`}>
                <img
                    className="w-full h-48 object-cover"
                    src={post.image || '/placeholder-post.jpg'}
                    alt={post.title}
                />
                <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                        <span className="inline-flex items-center text-sm text-gray-500">
                            <FiCalendar className="mr-1" size={14} />
                            {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        <span className="inline-flex items-center text-sm text-gray-500">
                            <FiClock className="mr-1" size={14} />
                            {post.readTime || '5 min read'}
                        </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">{post.content}</p>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </div>
    )
}
