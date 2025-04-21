'use client';

import { Form, Button, Textarea } from '@heroui/react';
import React from 'react';
import { AIAnimationWrapper } from './ai-animation-wrapper';

export function Topic() {
    const [submitted, setSubmitted] = React.useState(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));

        setSubmitted(data);
    };

    return (
        <section className="flex w-full flex-col rounded-lg border-2 p-4">
            <h2 className="text-lg">1. Research topics</h2>
            <Form className="w-full items-center" onSubmit={onSubmit}>
                <Textarea
                    errorMessage="Please enter a topic"
                    label="Research Topics"
                    labelPlacement="outside"
                    name="topic"
                    rows={3}
                    placeholder="Any topic you want to research"
                />
                <Button fullWidth type="submit">
                    Start thinking
                </Button>
                {submitted && (
                    <div className="text-small text-default-500">
                        You submitted: <code>{JSON.stringify(submitted)}</code>
                    </div>
                )}
            </Form>
        </section>
    );
}
