import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {IEmployee} from "../interface/Employee";

interface EmployeeTableProp {
    employees: IEmployee[]
}


interface Column {
    id: 'fullName' | 'created' | 'updated';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: Date) => string;
}

const columns: readonly Column[] = [
    { id: 'fullName', label: 'Full name', minWidth: 170 },
    { id: 'created', label: 'Created', minWidth: 100,
        format: (value: Date) => value.toLocaleString('en-US') },
    {
        id: 'updated',
        label: 'Updated',
        minWidth: 170,
        align: 'right',
        format: (value: Date) => value.toLocaleString('en-US')
    }
];

interface Data {
    id: number;
    fullName: string;
    created: Date;
    updated: Date;
}

export default function EmployeeTable(prop: EmployeeTableProp) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prop.employees
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(employee => {
                                const data: Data = {
                                    id: employee.id,
                                    fullName: employee.surname + ' ' + employee.firstname,
                                    created: employee.created,
                                    updated: employee.updated
                                }
                                return data;
                            })
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value === undefined ? 'Undefined' : value.toString()}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={prop.employees.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}



