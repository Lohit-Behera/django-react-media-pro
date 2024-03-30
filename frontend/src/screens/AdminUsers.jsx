import React, { useState } from 'react'; // Import useState hook
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetAllUsers, fetchGiveAdmin } from '@/features/AdminUsers';

import { Check, X } from 'lucide-react';

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

function AdminUsers() {
    const dispatch = useDispatch();

    const allUsers = useSelector((state) => state.adminUsers.allUsers);
    const adminStatus = useSelector((state) => state.adminUsers.adminStatus);

    const users = allUsers ? allUsers.users : [];
    const pages = allUsers ? allUsers.pages : 1;
    const currentPage = allUsers ? allUsers.page : 1;

    useEffect(() => {
        dispatch(fetchGetAllUsers(currentPage));
    }, [dispatch, adminStatus, currentPage]);

    const adminHandler = (id) => {
        dispatch(fetchGiveAdmin({
            id: id,
            is_staff: true
        }));
    };

    const handlePageChange = (page) => {
        dispatch(fetchGetAllUsers(page));
    };

    return (
        <div className='w-[98%] mx-auto border-2 rounded-lg mt-8'>
            <Table>
                <TableCaption className="my-4">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious to="#" onClick={() => handlePageChange(currentPage - 1)} />
                            </PaginationItem>
                            {[...Array(pages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink to="#" onClick={() => handlePageChange(index + 1)}>
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext to="#" onClick={() => handlePageChange(currentPage + 1)} />
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
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.first_name + " " + user.last_name}</TableCell>
                            <TableCell>{user.is_verified ? <Check color="#6d28d9" /> : <X color="#6d28d9" />}</TableCell>
                            <TableCell>{user.is_staff ? <Check color="#6d28d9" /> : <X color="#6d28d9" />}</TableCell>
                            <TableCell><Button onClick={() => adminHandler(user.id)} disabled={user.is_staff}>Admin</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default AdminUsers;
