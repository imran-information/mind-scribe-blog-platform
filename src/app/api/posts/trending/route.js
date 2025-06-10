import clientPromise from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('ai-blog-platform');

    const trendingPosts = await db.collection('blogs').aggregate([
      {
        $match: {
          status: 'published'  
        }
      },
      {
        $addFields: {
          popularity: { $add: ['$likes', '$views'] }  
        }
      },
      {
        $sort: { popularity: -1 }  
      },
      {
        $limit: 4  
      }
    ]).toArray();

    return NextResponse.json(trendingPosts);
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    return NextResponse.json(
      { error: 'Trending post ber korte parini' },
      { status: 500 }
    );
  }
}
