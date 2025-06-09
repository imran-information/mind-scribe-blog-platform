'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import {
    FiSearch,
    FiCalendar,
    FiClock,
    FiArrowRight,
    FiTag,
    FiChevronLeft,
    FiChevronRight,
    FiBookmark,
    FiEye,
    FiHeart
} from 'react-icons/fi'
import Image from 'next/image'
import { useGetFeaturedPostQuery, useGetPostsQuery } from '@/app/features/apiSlice'
import { Skeleton } from '@/app/components/ui/skeleton'

const BlogsPage = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 6

    const { data: posts, isLoading, isError } = useGetPostsQuery({
        search: searchQuery
    })
    const { data: featuredPost, isLoading: featuredPostIsLoading } = useGetFeaturedPostQuery()

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const allTags = [...new Set(posts?.flatMap(post => post.tags) || [])]
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost) || []
    const totalPages = Math.ceil((posts?.length || 0) / postsPerPage)

    if (isError) {
        return (
            <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">
                        Failed to load posts
                    </h2>
                    <p className="text-gray-400">
                        Please try refreshing the page or check your connection
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">AI-Powered Stories</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Discover and share content enhanced with artificial intelligence
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="mb-12 bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-800">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="text-gray-500" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-800 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-white placeholder-gray-500"
                                placeholder="Search articles, tags, or authors..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    setCurrentPage(1)
                                }}
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {allTags.slice(0, 5).map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => {
                                        setSearchQuery(tag)
                                        setCurrentPage(1)
                                    }}
                                    className={`px-3 py-1.5 rounded-full text-sm flex items-center transition-colors ${searchQuery === tag
                                        ? 'bg-emerald-600 text-white shadow-sm'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                        }`}
                                >
                                    <FiTag className="mr-1" size={12} />
                                    {tag}
                                </button>
                            ))}
                            {allTags.length > 5 && (
                                <span className="px-3 py-1.5 rounded-full text-sm bg-gray-800 text-gray-500">
                                    +{allTags.length - 5} more
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Featured Post */}
                {featuredPost && !featuredPostIsLoading ? (
                    <div className="mb-12 rounded-xl shadow-md overflow-hidden bg-gray-900 border border-gray-800 hover:shadow-lg transition-shadow duration-300">
                        <div className="relative h-64 w-full">
                            <Image
                                src={featuredPost?.image}
                                alt="Featured post"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        </div>
                        <div className="p-8">
                            <div className="flex items-center mb-4">
                                <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                                    Featured Story
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">
                                {featuredPost?.title}
                            </h2>
                            <p className="text-gray-400 mb-6 line-clamp-2">
                                {featuredPost?.content.substring(0, 200)}...
                            </p>
                            <div className="flex items-center justify-between">
                                <Link
                                    href={`/post/${featuredPost?._id}`}
                                    className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium group"
                                >
                                    Read full story <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <FiHeart className="mr-1" /> {featuredPost?.likes}
                                    </span>
                                    <span className="flex items-center">
                                        <FiEye className="mr-1" /> {featuredPost?.views}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mb-12">
                        <Skeleton className="h-64 w-full rounded-xl bg-gray-800" />
                    </div>
                )}

                {/* Blog Grid */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Latest Articles</h2>

                    {isLoading ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-800">
                                    <Skeleton className="h-48 w-full bg-gray-800" />
                                    <div className="p-6">
                                        <Skeleton className="h-6 w-3/4 mb-4 bg-gray-800" />
                                        <Skeleton className="h-4 w-full mb-2 bg-gray-800" />
                                        <Skeleton className="h-4 w-5/6 mb-6 bg-gray-800" />
                                        <Skeleton className="h-10 w-32 bg-gray-800" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : currentPosts.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {currentPosts.map(post => (
                                <div key={post._id} className="bg-gray-900 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-800">
                                    {post.image && (
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                        </div>
                                    )}
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
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {post.tags?.slice(0, 3).map(tag => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 py-1 bg-gray-800 text-gray-300 text-xs rounded-full hover:bg-gray-700 cursor-pointer transition-colors"
                                                    onClick={() => {
                                                        setSearchQuery(tag)
                                                        setCurrentPage(1)
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {post.tags?.length > 3 && (
                                                <span className="px-2.5 py-1 bg-gray-800 text-gray-500 text-xs rounded-full">
                                                    +{post.tags.length - 3}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium group"
                                            >
                                                Read more <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                                                <span className="flex items-center">
                                                    <FiHeart className="mr-1" /> {post.likes || 0}
                                                </span>
                                                <span className="flex items-center">
                                                    <FiEye className="mr-1" /> {post.views || 0}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-900 rounded-xl shadow-sm border border-gray-800">
                            <p className="text-gray-400 text-lg mb-4">No articles found matching your criteria</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('')
                                    setCurrentPage(1)
                                }}
                                className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors"
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center items-center gap-4">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2.5 rounded-full bg-gray-900 border border-gray-800 disabled:opacity-50 hover:bg-gray-800 transition-colors shadow-sm text-gray-400 hover:text-white"
                        >
                            <FiChevronLeft />
                        </button>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum
                                if (totalPages <= 5) {
                                    pageNum = i + 1
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i
                                } else {
                                    pageNum = currentPage - 2 + i
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === pageNum
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800'
                                            } transition-colors`}
                                    >
                                        {pageNum}
                                    </button>
                                )
                            })}
                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <span className="mx-1 text-gray-500">...</span>
                            )}
                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === totalPages
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800'
                                        } transition-colors`}
                                >
                                    {totalPages}
                                </button>
                            )}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2.5 rounded-full bg-gray-900 border border-gray-800 disabled:opacity-50 hover:bg-gray-800 transition-colors shadow-sm text-gray-400 hover:text-white"
                        >
                            <FiChevronRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BlogsPage