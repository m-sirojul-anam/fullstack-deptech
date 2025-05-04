import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admins',
        href: '/admins',
    },
];

const genderMap: Record<'M' | 'F', string> = {
    M: 'Male',
    F: 'Female',
};

export default function Admins({ users }: { users: User[] }) {
    const { delete: destroy, get } = useForm();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admins" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form className="flex flex-col gap-4 md:flex-row md:justify-between">
                    <div>
                        <Link href={route('admins.create')} className="w-full md:w-auto">
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
                                    Birthdate
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Gender
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.length === 0 ? (
                                <tr>
                                    <td className="px-6 py-4 text-center" colSpan={7}>
                                        No data users.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className="border-b border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
                                    >
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">{user.first_name}</td>
                                        <td className="px-6 py-4">{user.last_name}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">{user.birthdate}</td>
                                        <td className="px-6 py-4">{user.gender ? genderMap[user.gender as 'M' | 'F'] : '-'}</td>
                                        <td className="flex gap-2 px-6 py-4">
                                            <Button
                                                variant={'secondary'}
                                                onClick={() => get(route('admins.edit', { id: user.id }))}
                                                className="cursor-pointer"
                                            >
                                                <Pencil className="size-4" />
                                            </Button>
                                            <Button
                                                variant={'secondary'}
                                                onClick={() => destroy(route('admins.destroy', { id: user.id }))}
                                                className="cursor-pointer"
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
