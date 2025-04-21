'use client';

import { Button, Form, Input, Link } from '@heroui/react';

import { login } from './actions';

export default function LoginPage() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <Form action={login} className="w-full max-w-xs">
                <Input
                    isRequired
                    errorMessage="Please enter a valid email"
                    id="email"
                    label="Email"
                    labelPlacement="outside"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                />
                <Input
                    isRequired
                    errorMessage="Please enter a valid password"
                    id="password"
                    label="Password"
                    labelPlacement="outside"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                />
                <Button type="submit" variant="bordered">
                    Log in
                </Button>
                <Link href="/signup">Sign up</Link>
            </Form>
        </div>
    );
}
