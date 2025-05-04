import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type AdminFormType = {
    first_name: string;
    last_name: string;
    email: string;
    birthdate: string;
    gender: 'F' | 'M';
    password?: string;
    password_confirmation?: string;
};

export default function AdminForm({ user }: { user: User | null }) {
    const { data, setData, post, put, processing, errors, reset, recentlySuccessful } = useForm<Required<AdminFormType>>({
        first_name: user ? user.first_name : '',
        last_name: user ? user.last_name : '',
        email: user ? user.email : '',
        birthdate: user ? user.birthdate : '',
        gender: user ? user.gender : 'M',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (user) {
            put(route('admins.update', { id: user.id }));
        } else {
            post(route('admins.store'), {
                onFinish: () => reset('password', 'password_confirmation'),
            });
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: user ? 'Edit Admin' : 'Create Admin',
            href: user ? `/admins/${user.id}/edit` : '/admins/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={user ? 'Edit Admin' : 'Create Admin'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        <form className="space-y-6" onSubmit={submit}>
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
                                    className="mt-1 block w-full"
                                    required
                                    tabIndex={3}
                                    autoComplete="username"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={user ? true : processing}
                                    placeholder="Email address"
                                />

                                <InputError className="mt-2" message={errors.email} />
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

                            {!user && (
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>

                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="mt-1 block w-full"
                                        required
                                        tabIndex={6}
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        disabled={processing}
                                        placeholder="New password"
                                        hidden={user ? true : false}
                                    />

                                    <InputError className="mt-2" message={errors.password} />
                                </div>
                            )}

                            {!user && (
                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirm password</Label>

                                    <Input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        className="mt-1 block w-full"
                                        required
                                        tabIndex={7}
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        disabled={processing}
                                        placeholder="Confirm password"
                                    />

                                    <InputError className="mt-2" message={errors.password_confirmation} />
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <Link href={route('admins')}>
                                    <Button variant={'secondary'} className="cursor-pointer" disabled={processing}>
                                        Back
                                    </Button>
                                </Link>
                                <Button className="cursor-pointer" disabled={processing}>
                                    Save
                                </Button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">Saved</p>
                                </Transition>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
