import clientPromise from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("mind-scribe");

        const recentPost = await db
            .collection('blogs')
            .find({ status: "published" })
            .sort({ createdAt: -1 })
            .limit(4)
            .toArray();

        return NextResponse.json(recentPost);  
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch recent post' }, { status: 500 });
    }
}
