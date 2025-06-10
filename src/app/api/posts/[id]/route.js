import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb'; 
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const client = await clientPromise;
        const db = client.db('ai-blog-platform');

        const id = params.id;
        console.log(id)

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
        }

        const blog = await db.collection('blogs').findOne({ _id: new ObjectId(id) });

        if (!blog) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(blog, { status: 200 });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
