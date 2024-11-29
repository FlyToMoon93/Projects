import React from 'react';
import LoginForm from "@/components/login/LoginForm";

interface Props {
    email: string;
    password: string;
}

const HandlerLoginForm = async (props : Props) => {

    return (
        <div>
            <LoginForm  />
        </div>
    );
};

export default HandlerLoginForm;
