import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForcePasswordChangeForm } from '@/hooks/useForcePasswordChangeForm';

export default function ForcePasswordChangeForm() {
    const { data, errors, processing, setData, submit } =
        useForcePasswordChangeForm();

    return (
        <form
            onSubmit={submit}
            className="space-y-6 rounded-[2rem] border border-white/60 bg-white/85 p-8 shadow-[0_24px_50px_-32px_rgba(15,23,42,0.55)] backdrop-blur"
        >
            <div>
                <InputLabel htmlFor="current_password" value="Contrasena actual" />
                <TextInput
                    id="current_password"
                    type="password"
                    name="current_password"
                    value={data.current_password}
                    className="mt-2 block w-full rounded-2xl border-slate-200 px-4 py-3 shadow-none focus:border-orange-400 focus:ring-orange-400"
                    autoComplete="current-password"
                    isFocused
                    onChange={(event) =>
                        setData('current_password', event.target.value)
                    }
                />
                <InputError message={errors.current_password} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="password" value="Nueva contrasena" />
                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-2 block w-full rounded-2xl border-slate-200 px-4 py-3 shadow-none focus:border-orange-400 focus:ring-orange-400"
                    autoComplete="new-password"
                    onChange={(event) => setData('password', event.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
            </div>

            <div>
                <InputLabel
                    htmlFor="password_confirmation"
                    value="Confirmar nueva contrasena"
                />
                <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-2 block w-full rounded-2xl border-slate-200 px-4 py-3 shadow-none focus:border-orange-400 focus:ring-orange-400"
                    autoComplete="new-password"
                    onChange={(event) =>
                        setData('password_confirmation', event.target.value)
                    }
                />
                <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                />
            </div>

            <PrimaryButton
                className="w-full justify-center rounded-full bg-slate-950 px-6 py-3 text-sm normal-case tracking-normal hover:bg-slate-800 focus:bg-slate-800"
                disabled={processing}
            >
                Actualizar contrasena
            </PrimaryButton>
        </form>
    );
}
