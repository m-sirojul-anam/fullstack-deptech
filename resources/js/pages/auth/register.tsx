import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    first_name: string;
    last_name: string;
    email: string;
    birthdate: string;
    gender: 'F' | 'M';
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        first_name: '',
        last_name: '',
        email: '',
        birthdate: '',
        gender: 'M',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="first_name">First name</Label>

                        <Input
                            id="first_name"
                            type="text"
                            className="mt-1 block w-full"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="first_name"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            disabled={processing}
                            placeholder="First name"
                        />

                        <InputError className="mt-2" message={errors.first_name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="last_name">Last name</Label>

                        <Input
                            id="last_name"
                            type="text"
                            className="mt-1 block w-full"
                            required
                            tabIndex={2}
                            autoComplete="last_name"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            disabled={processing}
                            placeholder="Last name"
                        />

                        <InputError className="mt-2" message={errors.last_name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="birthdate">Birthdate</Label>

                        <Input
                            id="birthdate"
                            type="date"
                            className="mt-1 block w-full"
                            required
                            tabIndex={4}
                            autoComplete="birthdate"
                            value={data.birthdate}
                            onChange={(e) => setData('birthdate', e.target.value)}
                            disabled={processing}
                        />

                        <InputError className="mt-2" message={errors.birthdate} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                            name="gender"
                            required
                            autoComplete="gender"
                            value={data.gender}
                            onValueChange={(value) => setData('gender', value as 'F' | 'M')}
                            disabled={processing}
                        >
                            <SelectTrigger className="mt-1 w-full">
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Gender</SelectLabel>
                                    <SelectItem value="M">Male</SelectItem>
                                    <SelectItem value="F">Female</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <InputError className="mt-2" message={errors.gender} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create account
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
