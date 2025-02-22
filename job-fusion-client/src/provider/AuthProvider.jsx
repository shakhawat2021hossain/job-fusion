import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { app } from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})


    const register = (email, pass) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const login = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass)

    }

    const googleLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = async() =>{
        setLoading(true)
        const {data} = await axiosPublic.get('/logout', {withCredentials: true})
        console.log(data);
        return signOut(auth)
    }

    const updateUserProfile = (name, photo, user) =>{
        return updateProfile(user, {
            displayName: name,
            photoURL: photo
        })
    }

    useEffect(() =>{
        const unSubscribe = onAuthStateChanged(auth, currUser =>{
            setUser(currUser)
            // console.log("current user", currUser);
            setLoading(false)
        })
        return () =>{
            unSubscribe()
        }
    }, []) 

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        register,
        updateUserProfile,
        googleLogin,
        login,
        logOut
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;