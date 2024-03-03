import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NotFound404 from '../pages/NotFound404';
import ResponsiveAppBar from '../layout/ResponsiveAppBar';
import { currentUser } from '../functions/auth';

const UserRoute = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [pass, setpass] = useState(false);

    useEffect(() => {
        if (user && user.user.token) {
            currentUser(user.user.token)
                .then((res) => {
                    setpass(true);
                    // Perform actions with the response if needed
                })
                .catch((err) => {
                    console.log(err);
                    setpass(false);
                });
        }
    }, [user]);

    return pass ? (
        <>
            <ResponsiveAppBar />
            {children}
        </>
    ) : (
        <NotFound404 />
    );
};

export default UserRoute;
