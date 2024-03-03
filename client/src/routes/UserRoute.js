import React from 'react'
import { useSelector } from 'react-redux'
import NotFound404 from '../pages/NotFound404'
import ResponsiveAppBar from '../components/layout/ResponsiveAppBar';
const UserRoute = ({ chidren }) => {
    const { user } = useSelector((state) => ({ ...state }))
    console.log('UserRoute', user)

    return user && user.user.token
        ? <>
            <ResponsiveAppBar />
            {chidren}
        </>
        : <NotFound404 />
};

export default UserRoute