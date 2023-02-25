import React from 'react';
import LoginForm from "./view/login/LoginForm";
import {useCookies} from "react-cookie";
import MainLayout from "./view/layout";


export default function MainPage() {
    const [cookies] = useCookies(['Authorization'])
    console.log(cookies.Authorization)
    return (
        <div>
            {cookies.Authorization ? <MainLayout/> : <LoginForm/>}
        </div>
    );
}

