'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiArrowRight, FiSearch, FiTrendingUp, FiClock, FiBookmark } from 'react-icons/fi';
import { Skeleton } from './components/ui/skeleton';
import { useGetFeaturedPostQuery, useGetPostsQuery, useGetRecentPostsQuery, useGetTrendingPostsQuery } from './features/apiSlice';
import Button from './components/ui/button';
import { BlogCard } from './components/blogCard/BlogCard';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState(''); 
  const { data: posts, isLoading, isError } = useGetPostsQuery({ search: searchQuery });
  const { data: featuredPost, isLoading: featuredPostIsLoading } = useGetFeaturedPostQuery();
  const { data: trendingPosts = [], isLoading: trendingPostsIsLoading } = useGetTrendingPostsQuery();
  const { data: recentPosts = [], isLoading: recentPostsIsLoading } = useGetRecentPostsQuery();


  // console.log('all post ', posts)

  // console.log("trending",trendingPosts) 

  if (isError) return <div>Error loading posts</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Discover & Share{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                AI-Powered
              </span>{' '}
              Stories
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
              Join our community of writers and readers. Create content enhanced with AI,
              discover new perspectives, and share your knowledge with the world.
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-md mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search articles, tags, or authors..."
                className="block w-full pl-10 pr-3 py-3 border border-input rounded-lg bg-background shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && !featuredPostIsLoading ? (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-background rounded-xl shadow-lg overflow-hidden border border-muted">
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-1/2">
                  <img
                    className="h-full w-full object-cover"
                    src={featuredPost.image || '/placeholder-post.jpg'}
                    alt={featuredPost.title}
                  />
                </div>
                <div className="p-8 md:w-1/2">
                  <div className="uppercase tracking-wide text-sm text-primary font-semibold">
                    Featured Post
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-foreground">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    {featuredPost.summary || featuredPost.content.substring(0, 200) + '...'}
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={featuredPost.author.avatar || '/placeholder-avatar.jpg'}
                        alt={featuredPost.author.name}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-foreground">
                        {featuredPost.author.name}
                      </p>
                      <div className="flex space-x-1 text-sm text-muted-foreground">
                        <time dateTime={featuredPost.createdAt}>
                          {new Date(featuredPost.createdAt).toLocaleDateString()}
                        </time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{featuredPost.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      href={`/posts/${featuredPost._id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Read full story <FiArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </section>
      )}

      {/* Trending & Recent Posts */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Trending Posts */}
            <div>
              <div className="flex items-center mb-6">
                <FiTrendingUp className="h-5 w-5 text-primary" />
                <h2 className="ml-2 text-xl font-bold text-foreground">Trending Now</h2>
              </div>

              {trendingPostsIsLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex space-x-4">
                      <Skeleton className="h-16 w-16 rounded-lg" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {trendingPosts.map((post) => (
                    <div key={post._id} className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-16 w-16 rounded-lg object-cover"
                          src={post.image || '/placeholder-post.jpg'}
                          alt={post.title}
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-foreground">
                          <Link href={`/posts/${post._id}`} className="hover:text-primary">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {post.summary || post.content.substring(0, 100) + '...'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Posts */}
            <div>
              <div className="flex items-center mb-6">
                <FiClock className="h-5 w-5 text-primary" />
                <h2 className="ml-2 text-xl font-bold text-foreground">Recent Posts</h2>
              </div>

              {recentPostsIsLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex space-x-4">
                      <Skeleton className="h-16 w-16 rounded-lg" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {recentPosts.map((post) => (
                    <div key={post._id} className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-16 w-16 rounded-lg object-cover"
                          src={post.image || '/placeholder-post.jpg'}
                          alt={post.title}
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-foreground">
                          <Link href={`/posts/${post._id}`} className="hover:text-primary">
                            {post.title}
                          </Link>
                        </h3>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          <span className="mx-2">&middot;</span>
                          <span>{post.readTime} min read</span>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">All Articles</h2>
            <Button variant='outline'>
              <Link
                href="/blogs"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
              >
                View all <FiArrowRight className="ml-1" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts?.slice(0, 6).map((post) => (
                <BlogCard key={post._id} post={post}/>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to share your story?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Join our community of writers and readers. Create AI-enhanced content and reach thousands of readers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button>
              <Link href="/create">Start Writing</Link>
            </Button>

            <Button variant="outline">
              <Link href="/signup">Join Now</Link>
            </Button>

          </div>
        </div>
      </section>
    </div>
  );
}