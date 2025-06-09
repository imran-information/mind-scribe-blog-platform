import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: ({ search } = {}) => ({
                url: 'posts',
                params: search ? { search } : undefined,
            }),
            providesTags: ['Posts'],
        }),
        getFeaturedPost: builder.query({
            query: () => 'posts/featured',
        }),
        getTrendingPosts: builder.query({
            query: () => 'posts/trending',
        }),
        getRecentPosts: builder.query({
            query: () => 'posts/recent'
        }),
        getPostById: builder.query({
            query: (id) => `posts/${id}`,
        }),
        createPost: builder.mutation({
            query: (body) => ({
                url: 'posts',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Posts'],
        }),
        updatePost: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `posts/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Posts'],
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Posts'],
        }),
        generateAIContent: builder.mutation({
            query: (body) => ({
                url: 'ai/generate',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetFeaturedPostQuery,
    useGetTrendingPostsQuery,
    useGetRecentPostsQuery,
    useGetPostByIdQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useGenerateAIContentMutation,
} = blogApi;