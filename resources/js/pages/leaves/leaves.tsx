import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Leave } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Leaves',
        href: '/leaves',
    },
];

export default function Leaves({ leaves }: { leaves: Leave[] }) {
    console.log(leaves);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leaves" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form className="flex flex-col gap-4 md:flex-row md:justify-between">
                    <div className="flex">
                        <Link href={route('leaves.create')} className="w-full md:w-auto">
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
                                    Reason
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Start Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    End Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {leaves && leaves.length === 0 ? (
                                <tr>
                                    <td className="px-6 py-4 text-center" colSpan={8}>
                                        No data leaves.
                                    </td>
                                </tr>
                            ) : (leaves.map((leave, index) => (<tr key={leave.id} className="border-b border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{leave.employee?.first_name}</td>
                                <td className="px-6 py-4">{leave.employee?.last_name}</td>
                                <td className="px-6 py-4">{leave.employee?.email}</td>
                                <td className="px-6 py-4">{leave.reason}</td>
                                <td className="px-6 py-4">19 February 2025</td>
                                <td className="px-6 py-4">19 February 2025</td>
                                <td className="flex gap-2 px-6 py-4">
                                    <Pencil className="size-4 hover:cursor-pointer" />
                                    <Trash2 className="size-4 hover:cursor-pointer" />
                                    <Eye className="size-4 hover:cursor-pointer" />
                                </td>
                            </tr>)))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
