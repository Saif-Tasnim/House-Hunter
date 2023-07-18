import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const logIn = (email, password) => {
        fetch(`http://localhost:5000/users?email=${email}&&pasword=${password}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                Swal.fire(
                    'Good job!',
                    'Successfully logged in',
                    'success'
                )
                setLoading(false);
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`,
                })
                setLoading(false);
            })
    }

    useEffect(() => {
        if (user) {
            axios.post('http://localhost:5000/jwt', {
                email: user?.email
            })
                .then(data => {
                    localStorage.setItem('access-token', data.data.token)
                })
        }

        else {
            localStorage.removeItem('access-token');
        }


    }, [user])

    const authInfo = {
        user,
        loading,
        logIn,
        setLoading,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;