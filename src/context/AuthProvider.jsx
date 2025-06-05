import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase.init';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  // Create user with email/password
  const createUser = async (email, password, fullName = '', photoURL = '') => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (fullName || photoURL) {
      await updateProfile(userCredential.user, {
        displayName: fullName,
        photoURL: photoURL,
      });
      setUser({ ...userCredential.user, displayName: fullName, photoURL }); 
    } else {
      setUser(userCredential.user);
    }
    return userCredential;
  };

  // Sign in user with email/password
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign In
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Sign out
  const signOutUser = () => {
    return signOut(auth);
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    createUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
  };

  // Only show loading screen while user === undefined (not yet checked)
  if (user === undefined) {
    return (
      <div className="text-center text-white text-xl py-10">
        <h2 className="my-16">Checking authentication...</h2>
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
