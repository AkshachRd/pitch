'use client';

import { Button } from '@heroui/react';
import { FC } from 'react';
import { signout } from './actions';

export const SignOutButton: FC = () => {
    return <Button onPress={signout}>Sign out</Button>;
};
