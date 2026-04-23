import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar sesion" />

            <div className="space-y-8">
                <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-500">
                        Acceso seguro
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
                        Inicia sesion en FASTFOOD
                    </h1>
                    <p className="max-w-lg text-sm leading-7 text-slate-600">
                        Entra al panel para gestionar categorias, productos y la
                        operacion comercial desde una interfaz limpia y visual.
                    </p>
                </div>

                {status && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {status}
                    </div>
                )}

                <form
                    onSubmit={submit}
                    className="rounded-[2rem] border border-white/60 bg-white/85 p-8 shadow-[0_24px_50px_-32px_rgba(15,23,42,0.55)] backdrop-blur"
                >
                    <div>
                        <InputLabel htmlFor="email" value="Correo electronico" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-2 block w-full rounded-2xl border-slate-200 px-4 py-3 shadow-none focus:border-orange-400 focus:ring-orange-400"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-5">
                        <InputLabel htmlFor="password" value="Contrasena" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-2 block w-full rounded-2xl border-slate-200 px-4 py-3 shadow-none focus:border-orange-400 focus:ring-orange-400"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData(
                                        'remember',
                                        (e.target.checked || false) as false,
                                    )
                                }
                            />
                            <span className="ms-2 text-sm text-slate-600">
                                Recordarme
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-slate-500 underline decoration-orange-300 underline-offset-4 transition hover:text-orange-600"
                            >
                                Olvide mi contrasena
                            </Link>
                        )}
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                            Acceso solo para personal autorizado
                        </p>
                        <PrimaryButton
                            className="justify-center rounded-full bg-slate-950 px-6 py-3 text-sm normal-case tracking-normal hover:bg-slate-800 focus:bg-slate-800"
                            disabled={processing}
                        >
                            Entrar al sistema
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
