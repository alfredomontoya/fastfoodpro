import ForcePasswordChangeForm from '@/Components/auth/ForcePasswordChangeForm';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function ForcePasswordChange() {
    return (
        <GuestLayout>
            <Head title="Cambio obligatorio de contrasena" />

            <div className="space-y-8">
                <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-500">
                        FASTFOOD
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
                        Actualiza tu contrasena para continuar
                    </h1>
                    <p className="text-sm leading-7 text-slate-600">
                        Tu cuenta requiere un cambio obligatorio de contrasena
                        antes de acceder al dashboard.
                    </p>
                </div>

                <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
                    Usa tu contrasena actual y define una nueva clave segura.
                </div>

                <ForcePasswordChangeForm />
            </div>
        </GuestLayout>
    );
}
