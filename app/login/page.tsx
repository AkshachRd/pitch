'use client';

import { Button, Form, Input, Link } from '@heroui/react';
import { login } from './actions';

export default function LoginPage() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <Form className="w-full max-w-xs" action={login}>
                <Input
                    isRequired
                    errorMessage="Please enter a valid email"
                    label="Email"
                    labelPlacement="outside"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                />
                <Input
                    isRequired
                    errorMessage="Please enter a valid password"
                    label="Password"
                    labelPlacement="outside"
                    id="password"
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
