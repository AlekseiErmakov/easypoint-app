import React from 'react';
import {Route, Routes} from "react-router-dom";
import EmployeePage from "./employees/EmployeePage";
import TimetablePage from "./timetable/TimetablePage";
import MiniDrawer, {DrawerHeader} from "./navigation/MainPageNavigation";
import {Box} from "@mui/material";
import EmployeeShiftPage from "./shift/EmployeeShiftPage";

function App() {
    console.log("I am loading App")
    return <>
        <Box sx={{ display: 'flex' }}>
        <MiniDrawer/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader/>
                <Routes>
                    <Route path="/" element={<EmployeePage/>}/>
                    <Route path="/timetable" element={<TimetablePage/>}/>
                    <Route path="/employee-shift-types" element={<EmployeeShiftPage/>}/>
                </Routes>
            </Box>
        </Box>
    </>
}

export default App;
