import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Employee } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employees',
        href: '/employees',
    },
];

const genderMap: Record<'M' | 'F', string> = {
    M: 'Male',
    F: 'Female',
};

export default function Employees({ employees }: { employees: Employee[] }) {
    const { delete: destroy, get } = useForm();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form className="flex flex-col gap-4 md:flex-row md:justify-between">
                    <div>
                        <Link href={route('employees.create')} className="w-full md:w-auto">
                            <Button className="w-full cursor-pointer md:w-auto">Add New</Button>
                        </Link>
                    </div>
                    <div className="flex hidden flex-col gap-2 md:flex-row md:items-center">
                        <Input type="text" placeholder="Search..." className="w-full md:w-auto" />
                        <Button className="w-full cursor-pointer md:w-auto">Search</Button>
                    </div>
                </form>
                <div className="sm:rounder-lg relative overflow-x-auto shadow-md">
                    <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    First Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Last Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Gender
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees && employees.length === 0 ? (
                                <tr>
                                    <td className="px-6 py-4 text-center" colSpan={8}>
                                        No data employees.
                                    </td>
                                </tr>
                            ) : employees.map((employee, index) => (
                                <tr
                                    key={employee.id}
                                    className="border-b border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
                                >
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{employee.first_name}</td>
                                    <td className="px-6 py-4">{employee.last_name}</td>
                                    <td className="px-6 py-4">{employee.email}</td>
                                    <td className="px-6 py-4">{employee.phone}</td>
                                    <td className="px-6 py-4">{employee.gender ? genderMap[employee.gender as 'M' | 'F'] : '-'}</td>
                                    <td className="px-6 py-4">{employee.address ? `${employee.address.substring(0, 20)}...` : '-'}</td>
                                    <td className="flex gap-2 px-6 py-4">
                                        <Button
                                            variant={'secondary'}
                                            onClick={() => get(route('employees.edit', { id: employee.id }))}
                                            className="cursor-pointer"
                                        >
                                            <Pencil className="size-4" />
                                        </Button>
                                        <Button
                                            variant={'secondary'}
                                            onClick={() => destroy(route('employees.destroy', { id: employee.id }))}
                                            className="cursor-pointer"
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
