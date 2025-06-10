import clientPromise from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db("ai-blog-platform");
        const url = new URL(request.url);
        const search = url.searchParams.get('search') || '';

        const filter = search
            ? {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { tags: { $in: [new RegExp(search, 'i')] } },
                    { 'author.name': { $regex: search, $options: 'i' } },
                ],
            }
            : {};

        const blogs = await db
            .collection('blogs')
            .find(filter)
            .sort({ createdAt: -1 })
            .toArray();

        return new Response(JSON.stringify(blogs), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

 
export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db();
        const body = await request.json();

        const blog = await db
            .collection('blogs')
            .insertOne(body);

        return NextResponse.json(blog);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}