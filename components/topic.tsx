'use client';

import { Form, Button, Textarea } from '@heroui/react';
import React, { FormEvent } from 'react';

import { AIAnimationWrapper } from './ai-animation-wrapper';

import { useTaskStore } from '@/store/task';
import { useDeepResearch } from '@/hooks/use-deep-research';

export function Topic() {
    const { askQuestions, isThinking } = useDeepResearch();
    const { setQuestion, questions } = useTaskStore.getState();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));

        setQuestion(data.topic as string);
        await askQuestions();
    };

    return (
        <AIAnimationWrapper className="flex w-full flex-col" isLoading={isThinking}>
            <section className="z-10 flex w-full flex-col rounded-lg bg-background p-4">
                <h2 className="text-lg">1. Research topics</h2>
                <Form className="w-full items-center" onSubmit={onSubmit}>
                    <Textarea
                        errorMessage="Please enter a topic"
                        label="Research Topics"
                        labelPlacement="outside"
                        name="topic"
                        placeholder="Any topic you want to research"
                        rows={3}
                    />
                    <Button fullWidth type="submit">
                        Start thinking
                    </Button>
                    {questions && (
                        <div className="text-small text-default-500">
                            You submitted: <code>{questions}</code>
                        </div>
                    )}
                </Form>
            </section>
        </AIAnimationWrapper>
    );
}
