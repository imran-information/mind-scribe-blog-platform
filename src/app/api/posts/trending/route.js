import clientPromise from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('mind-scribe');

        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const trendingPosts = await db.collection('blogs')
            .find({ createdAt: { $gte: oneWeekAgo } })
            .sort({ likes: -1 })
            .limit(4)
            .toArray();

        return NextResponse.json(trendingPosts);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Trending post ber korte parini' }, { status: 500 });
    }
}
