import React, {ChangeEvent, useState} from "react";
import {useBackEnd} from "../hooks/EmployeeHooks";
import EmployeeTable from "./component/EmployeeTable";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {IEmployee} from "./interface/Employee";


export interface EmployeeCreateRequest {
    firstname: string;
    surname: string;
    lastname: string;
}

function EmployeePage() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [lastname, setLastname] = useState('');
    console.log("I am loading Employee page")
    const {data, addData} = useBackEnd<IEmployee, EmployeeCreateRequest>('/employee');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        addData({firstname: name, surname: surname, lastname: lastname})
        handleClose();
    }


    return <>
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Add employee</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="surname"
                    label="Surname"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="lastname"
                    label="Middle name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLastname(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        <EmployeeTable employees={data}/>
        <Fab color="primary" aria-label="add" sx={{
            position: 'fixed',
            bottom: '25px',
            right: '25px'
        }} onClick={handleClickOpen}>
            <AddIcon/>
        </Fab>

    </>
}

export default EmployeePage;