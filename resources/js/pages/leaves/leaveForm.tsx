import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Employee, Leave, LeaveType } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type LeaveFormType = {
    employee_id?: string;
    leave_type_id?: string;
    start_date: string;
    end_date: string;
    reason: string;
};

export default function LeaveForm({ leave, employees, leaveTypes }: { leave: Leave | null; employees: Employee[]; leaveTypes: LeaveType[] }) {
    const { data, setData, post, put, processing, errors, reset, recentlySuccessful } = useForm<Required<LeaveFormType>>({
        employee_id: leave ? String(leave.employee_id ?? '') : '',
        leave_type_id: leave ? String(leave.leave_type_id ?? '') : '',
        start_date: leave ? leave.start_date : '',
        end_date: leave ? leave.end_date : '',
        reason: leave ? leave.reason : '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (leave) {
            put(route('leaves.update', { id: leave.id }));
        } else {
            post(route('leaves.store'));
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: leave ? 'Edit Leaves' : 'Create Leaves',
            href: leave ? `/leaves/${leave.id}/edit` : '/leaves/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={leave ? 'Edit Leaves' : 'Create Leaves'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        <form className="space-y-6" onSubmit={submit}>
                            <div className="grid gap-2">
                                <Label htmlFor="employee_id">Employee</Label>
                                <Select
                                    name="employee_id"
                                    required
                                    autoComplete="employee_id"
                                    value={data.employee_id}
                                    onValueChange={(value) => setData('employee_id', value)}
                                    disabled={processing}
                                >
                                    <SelectTrigger className="mt-1 w-full">
                                        <SelectValue placeholder="Select employee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Employee</SelectLabel>
                                            {employees.map((employee) => (
                                                <SelectItem value={`${employee.id}`}>
                                                    {employee.email} ({employee.first_name} {employee.last_name})
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError className="mt-2" message={errors.employee_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="leave_type_id">Leave Type</Label>
                                <Select
                                    name="leave_type_id"
                                    required
                                    autoComplete="leave_type_id"
                                    value={data.leave_type_id}
                                    onValueChange={(value) => setData('leave_type_id', value)}
                                    disabled={processing}
                                >
                                    <SelectTrigger className="mt-1 w-full">
                                        <SelectValue placeholder="Select leave type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Leave Type</SelectLabel>
                                            {leaveTypes.map((leaveType) => (
                                                <SelectItem value={`${leaveType.id}`}>{leaveType.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError className="mt-2" message={errors.leave_type_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="start_date">Start date</Label>

                                <Input
                                    id="start_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    required
                                    tabIndex={3}
                                    autoComplete="start_date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    disabled={processing}
                                />

                                <InputError className="mt-2" message={errors.start_date} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="end_date">End date</Label>

                                <Input
                                    id="end_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    required
                                    tabIndex={4}
                                    autoComplete="end_date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    disabled={processing}
                                />

                                <InputError className="mt-2" message={errors.end_date} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="reason">Reason</Label>

                                <Textarea
                                    id="reason"
                                    className="mt-1 block w-full"
                                    autoComplete="reason"
                                    placeholder="Reason"
                                    required
                                    tabIndex={5}
                                    value={data.reason}
                                    onChange={(e) => setData('reason', e.target.value)}
                                    disabled={processing}
                                />

                                <InputError className="mt-2" message={errors.reason} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Link href={route('leaves')}>
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
