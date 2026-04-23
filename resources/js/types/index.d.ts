export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role: 'ADMIN' | 'OPERADOR';
    force_password_change: boolean;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: {
        status?: string;
    };
};
