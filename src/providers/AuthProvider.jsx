import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebse/firebase.config';

export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoding] = useState(true);

    const createUser = (email, password) => {
        setLoding(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const loginUser = (email, password) => {
        setLoding(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = ()=> {
        return signOut(auth);
    }

    // observe auth state change (currently signed-in user)
    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // console.log('OnAuthStateChange', currentUser);
            setUser(currentUser);
            setLoding(false);
        })
        return ()=> {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;