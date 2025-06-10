import clientPromise from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("ai-blog-platform");

        const featuredPost = await db
            .collection('blogs')
            .find()
            .sort({ likes: -1 })
            .limit(1)
            .toArray();

        return NextResponse.json(featuredPost[0]);  
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch featured post' }, { status: 500 });
    }
}