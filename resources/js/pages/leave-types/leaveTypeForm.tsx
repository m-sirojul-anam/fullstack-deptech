import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Employee, LeaveType } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type LeaveTypeFormType = {
    name: string;
    max_days_per_year: number;
    carry_forward: boolean;
};

export default function LeaveTypeForm({ leaveType }: { leaveType: LeaveType | null }) {
    console.log(leaveType);
    const { data, setData, post, put, processing, errors } = useForm<Required<LeaveTypeFormType>>({
        name: leaveType ? leaveType.name : '',
        max_days_per_year: leaveType ? leaveType.max_days_per_year : 12,
        carry_forward: leaveType ? leaveType.carry_forward : false
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (leaveType) {
            put(route('leave-types.update', { id: leaveType.id }));
        } else {
            post(route('leave-types.store'));
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: leaveType ? 'Edit Leave Type' : 'Create Leave Type',
            href: leaveType ? `/leave-types/${leaveType.id}/edit` : '/leave-types/create',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={leaveType ? 'Edit Leave Type' : 'Create Leave Type'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        <form className="space-y-6" onSubmit={submit}>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>

                                <Input
                                    id="name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                    placeholder="Name"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="max_days_per_year">Max days per year</Label>

                                <Input
                                    id="max_days_per_year"
                                    type="number"
                                    className="mt-1 block w-full"
                                    required
                                    tabIndex={2}
                                    autoComplete="max_days_per_year"
                                    value={data.max_days_per_year}
                                    onChange={(e) => setData('max_days_per_year', +e.target.value)}
                                    disabled={processing}
                                    placeholder="Max days per year"
                                />

                                <InputError className="mt-2" message={errors.max_days_per_year} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="carry_forward">Carry forward</Label>

                                <Switch
                                    id="carry_forward"
                                    className="mt-1"
                                    tabIndex={3}
                                    checked={data.carry_forward}
                                    onCheckedChange={(checked) => setData('carry_forward', checked)}
                                    disabled={leaveType ? true : processing}
                                />

                                <InputError className="mt-2" message={errors.carry_forward} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Link href={route('leave-types')}>
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
