import { Topic } from '@/features/ai-questions';

export async function ResearchPage() {
    return (
        <div className="flex h-screen w-full max-w-2xl flex-col items-center">
            <Topic />
        </div>
    );
}
