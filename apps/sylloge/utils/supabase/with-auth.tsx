import { UserResponse } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import React from 'react';

import { getSupabaseServerClient } from '@/utils/supabase/server';

export type WithAuthProps = {
    user: UserResponse;
};

export function withAuth<P extends WithAuthProps>(WrappedComponent: React.ComponentType<P>) {
    return async function AuthenticatedComponent(props: Omit<P, keyof WithAuthProps>) {
        const supabase = await getSupabaseServerClient();

        const { data, error } = await supabase.auth.getUser();

        if (error || !data?.user) {
            redirect('/login');
        }

        return <WrappedComponent {...(props as P)} user={data.user} />;
    };
}
