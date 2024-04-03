import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetAllUsers, fetchGiveAdmin, fetchRemoveAdmin, fetchDeleteUser, reset } from '@/features/AdminUsers';

import { Check, X } from 'lucide-react';
import CustomAlert from '@/components/CustomAlert';

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


function AdminUsers() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector((state) => state.user.userInfo);
    const allUsers = useSelector((state) => state.adminUsers.allUsers);
    const admin = useSelector((state) => state.adminUsers.admin);
    const adminStatus = useSelector((state) => state.adminUsers.adminStatus);
    const adminSuccess = adminStatus === 'succeeded'
    const removeAdmin = useSelector((state) => state.adminUsers.removeAdmin);
    const removeAdminStatus = useSelector((state) => state.adminUsers.removeAdminStatus);
    const removeAdminSuccess = removeAdminStatus === 'succeeded'
    const deleteUserStatus = useSelector((state) => state.adminUsers.deleteUserStatus);
    const deleteUserSuccess = deleteUserStatus === 'succeeded'

    const users = allUsers ? allUsers.users : [];
    const pages = allUsers ? allUsers.pages : 1;
    const adminEmail = admin ? admin.email : '';
    const removeAdminEmail = removeAdmin ? removeAdmin.email : '';
    const is_staff = userInfo ? userInfo.is_staff : false


    const [currentPage, setCurrentPage] = useState(allUsers ? allUsers.page : 1);

    useEffect(() => {
        if (!is_staff) {
            navigate('/')
        }
    }, [is_staff]);

    useEffect(() => {
        dispatch(fetchGetAllUsers(currentPage));
    }, [dispatch, adminSuccess, currentPage, deleteUserSuccess, removeAdminSuccess]);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(reset());
        }, 3700)
        return () => clearTimeout(timer)
    }, [dispatch, adminSuccess, deleteUserSuccess, removeAdminSuccess]);

    const adminHandler = (id) => {
        dispatch(fetchGiveAdmin({
            id: id,
            is_staff: true
        }));
    };

    const removeAdminHandler = (id) => {
        dispatch(fetchRemoveAdmin({
            id: id,
            is_staff: false
        }));
    };

    const deleteUserHadler = (id) => {
        dispatch(fetchDeleteUser(id));
    };

    const handlePageChange = (page) => {
        dispatch(fetchGetAllUsers(page));
    };

    const previousHandler = (page) => {
        if (page > 1) {
            dispatch(fetchGetAllUsers(page - 1));
            setCurrentPage(page - 1);
        }
    };

    const nextHandler = (page) => {
        if (page < pages) {
            dispatch(fetchGetAllUsers(page + 1));
            setCurrentPage(page + 1);
        }
    };
    return (
        <>
            {adminStatus === 'succeeded' &&
                <CustomAlert variant='success' title='Success' description={`${adminEmail} is Admin now`} setOpenProp />}

            {adminStatus === 'failed' &&
                <CustomAlert variant='destructive' title='Error' description='Something went wrong' setOpenProp />}

            {removeAdminStatus === 'succeeded' &&
                <CustomAlert variant='success' title='Success' description={`${removeAdminEmail} is not Admin now`} setOpenProp />}

            {removeAdminStatus === 'failed' &&
                <CustomAlert variant='destructive' title='Error' description='Something went wrong' setOpenProp />}

            {deleteUserStatus === 'succeeded' &&
                <CustomAlert variant='success' title='Success' description={`User deleted successfully`} setOpenProp />}

            {deleteUserStatus === 'failed' &&
                <CustomAlert variant='destructive' title='Error' description='Something went wrong' setOpenProp />}

            <div className='w-[98%] mx-auto border-2 rounded-lg mt-8'>
                <Table>
                    <TableCaption className="my-4">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <Button
                                        onClick={() => previousHandler(currentPage - 1)}
                                        variant="ghost"
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </Button>
                                </PaginationItem>
                                {[...Array(pages)].map((_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink onClick={() => handlePageChange(index + 1)}>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <Button
                                        disabled={currentPage === pages}
                                        onClick={() => nextHandler(currentPage + 1)}
                                        variant="ghost"
                                    >
                                        Next
                                    </Button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Verified</TableHead>
                            <TableHead>Admin</TableHead>
                            <TableHead>Change to Admin</TableHead>
                            <TableHead>Remove Admin</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.first_name + " " + user.last_name}</TableCell>
                                <TableCell>{user.is_verified ? <Check color="#6d28d9" /> : <X color="#6d28d9" />}</TableCell>
                                <TableCell>{user.is_staff ? <Check color="#6d28d9" /> : <X color="#6d28d9" />}</TableCell>
                                <TableCell>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button disabled={user.is_staff}>Admin</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you want to make {user.email} him admin?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => adminHandler(user.id)} >Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </TableCell>
                                <TableCell>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button disabled={!user.is_staff}>Remove Admin</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you want to remove {user.email} him from admin?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => removeAdminHandler(user.id)}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </TableCell>
                                <TableCell>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button>Delete</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete {user.email} account and remove your data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => deleteUserHadler(user.id)}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

export default AdminUsers;
