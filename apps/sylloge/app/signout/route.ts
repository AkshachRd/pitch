import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { getSupabaseServerClient } from '@/utils/supabase/server';

export async function GET() {
    const supabase = await getSupabaseServerClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/');
}
