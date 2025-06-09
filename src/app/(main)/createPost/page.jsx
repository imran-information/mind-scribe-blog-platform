'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGenerateAIContentMutation } from '@/features/apiSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles } from 'lucide-react';

export default function CreatePost() {
    const { register, handleSubmit, setValue, watch } = useForm();
    const [aiLoading, setAiLoading] = useState(false);
    const [generateAIContent] = useGenerateAIContentMutation();
    const [newTag, setNewTag] = useState('');

    const content = watch('content');
    const tags = watch('tags', []);

    const handleGenerateAI = async () => {
        if (!content) return;

        setAiLoading(true);
        try {
            const result = await generateAIContent({ content }).unwrap();
            setValue('tags', result.tags);
        } catch (error) {
            console.error('Failed to generate AI content:', error);
        } finally {
            setAiLoading(false);
        }
    };

    const addTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setValue('tags', [...tags, newTag]);
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setValue(
            'tags',
            tags.filter((tag) => tag !== tagToRemove)
        );
    };

    const onSubmit = (data) => {
        console.log('Post created:', data);
        // Here you would call useCreatePostMutation
    };

    return (
        <div className="container py-8">
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        {...register('title', { required: true })}
                        placeholder="Enter post title"
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="content">Content</Label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleGenerateAI}
                            disabled={aiLoading || !content}
                        >
                            {aiLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Sparkles className="mr-2 h-4 w-4" />
                            )}
                            AI Assist
                        </Button>
                    </div>
                    <Textarea
                        id="content"
                        {...register('content', { required: true })}
                        rows={10}
                        placeholder="Write your post content here..."
                    />
                </div>

                <div>
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {tags?.map((tag) => (
                            <Badge
                                key={tag}
                                variant="outline"
                                className="cursor-pointer hover:bg-secondary"
                                onClick={() => removeTag(tag)}
                            >
                                {tag} ×
                            </Badge>
                        ))}
                    </div>
                    <div className="flex space-x-2">
                        <Input
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Add a tag"
                            onKeyDown={(e) => e.key === 'Enter' && addTag()}
                        />
                        <Button type="button" variant="outline" onClick={addTag}>
                            Add
                        </Button>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button type="submit">Publish Post</Button>
                </div>
            </form>
        </div>
    );
}