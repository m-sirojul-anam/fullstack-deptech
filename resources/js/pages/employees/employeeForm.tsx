import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Employee } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type EmployeeFormType = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    gender: 'F' | 'M';
    address?: string;
};

export default function EmployeeForm({ employee }: { employee: Employee | null }) {
    const { data, setData, post, put, processing, errors } = useForm<Required<EmployeeFormType>>({
        first_name: employee ? employee.first_name : '',
        last_name: employee ? employee.last_name : '',
        email: employee ? employee.email : '',
        phone: employee ? employee.phone : '',
        gender: employee ? employee.gender : 'M',
        address: employee ? employee.address : '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (employee) {
            put(route('employees.update', { id: employee.id }));
        } else {
            post(route('employees.store'));
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: employee ? 'Edit Employee' : 'Create Employee',
            href: employee ? `/employees/${employee.id}/edit` : '/employees/create',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Employee" />
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
                                    disabled={employee ? true : processing}
                                    placeholder="Email address"
                                />

                                <InputError className="mt-2" message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone</Label>

                                <Input
                                    id="phone"
                                    type="phone"
                                    className="mt-1 block w-full"
                                    required
                                    tabIndex={4}
                                    autoComplete="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="Phone"
                                />

                                <InputError className="mt-2" message={errors.phone} />
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
                                <Label htmlFor="address">Address</Label>

                                <Textarea
                                    id="address"
                                    className="mt-1 block w-full"
                                    required
                                    tabIndex={6}
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    autoComplete="address"
                                    placeholder="Address"
                                />

                                <InputError className="mt-2" message={errors.address} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Link href={route('employees')}>
                                    <Button variant={'secondary'} className="cursor-pointer">
                                        Back
                                    </Button>
                                </Link>
                                <Button className="cursor-pointer">Save</Button>

                                {/* <Transition
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Saved</p>
                        </Transition> */}
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
