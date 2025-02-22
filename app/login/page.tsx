'use client';

import { Button, Form, Input } from '@heroui/react';
import { login, signup } from './actions';

export default function LoginPage() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <Form className="w-full max-w-xs">
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
                <Button formAction={login} variant="bordered">
                    Log in
                </Button>
                <Button formAction={signup} variant="bordered">
                    Sign up
                </Button>
            </Form>
        </div>
    );
}
