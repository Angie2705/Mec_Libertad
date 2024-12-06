import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        })

        return () => unsubscribe();
    }, []);

    if (loading) return <div></div>

    return user ? children : <Navigate to="/loginad" />;

}

export default PrivateRoute