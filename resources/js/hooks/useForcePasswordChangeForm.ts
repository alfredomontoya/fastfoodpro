import type { ForcePasswordChangeFormData } from '@/types/auth';
import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

export function useForcePasswordChangeForm() {
    const form = useForm<ForcePasswordChangeFormData>({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.put(route('force-password.update'), {
            onFinish: () =>
                form.reset('current_password', 'password', 'password_confirmation'),
        });
    };

    return {
        ...form,
        submit,
    };
}
