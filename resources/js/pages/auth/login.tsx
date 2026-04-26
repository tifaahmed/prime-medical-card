import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';

type Props = {
    status?: string;
};

export default function Login({ status }: Props) {
    return (
        <>
            <Head title="تسجيل الدخول" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-2">
                            <Label
                                htmlFor="email"
                                className="text-sm font-semibold text-[#0b2e2c]"
                            >
                                البريد الإلكتروني
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                placeholder="you@example.com"
                                dir="ltr"
                                className="h-12 rounded-full border-[rgba(11,46,44,0.15)] bg-[#f7f2ea] px-5 text-sm text-[#0a1a19] placeholder:text-[#3d4948]/60 focus-visible:border-[#236b64] focus-visible:ring-[#7fb3ad]"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label
                                htmlFor="password"
                                className="text-sm font-semibold text-[#0b2e2c]"
                            >
                                كلمة المرور
                            </Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                placeholder="••••••••"
                                dir="ltr"
                                className="h-12 rounded-full border-[rgba(11,46,44,0.15)] bg-[#f7f2ea] px-5 text-sm text-[#0a1a19] placeholder:text-[#3d4948]/60 focus-visible:border-[#236b64] focus-visible:ring-[#7fb3ad]"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="remember"
                                name="remember"
                                tabIndex={3}
                                className="border-[rgba(11,46,44,0.3)] data-[state=checked]:border-[#0b2e2c] data-[state=checked]:bg-[#0b2e2c]"
                            />
                            <Label
                                htmlFor="remember"
                                className="text-sm text-[#3d4948]"
                            >
                                تذكرني
                            </Label>
                        </div>

                        <button
                            type="submit"
                            tabIndex={4}
                            disabled={processing}
                            data-test="login-button"
                            className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0b2e2c] px-6 text-sm font-semibold text-white transition hover:bg-[#12403d] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {processing && <Spinner />}
                            تسجيل الدخول
                        </button>

                        {status && (
                            <div className="rounded-2xl bg-[#d7e8e5] px-4 py-3 text-center text-sm font-medium text-[#0b2e2c]">
                                {status}
                            </div>
                        )}
                    </>
                )}
            </Form>
        </>
    );
}

Login.layout = {
    title: 'تسجيل الدخول إلى حسابك',
    description: 'أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى حسابك',
};
