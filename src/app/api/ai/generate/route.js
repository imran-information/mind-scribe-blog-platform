import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    try {
        const { content } = await req.json();
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        // Generate summary
        const summaryPrompt = `Summarize this blog post content in 2-3 sentences:\n\n${content}`;
        const summaryResult = await model.generateContent(summaryPrompt);
        const summary = await summaryResult.response.text();

        // Generate tags
        const tagsPrompt = `Generate 3-5 relevant tags for this blog post content, return as comma-separated values:\n\n${content}`;
        const tagsResult = await model.generateContent(tagsPrompt);
        const tags = (await tagsResult.response.text())
            .split(',')
            .map((tag) => tag.trim());

        return NextResponse.json({ summary, tags });
    } catch (error) {
        console.error('AI generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate content' },
            { status: 500 }
        );
    }
}