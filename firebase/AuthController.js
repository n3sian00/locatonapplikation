import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './FirebaseConfig';

// Hallitsee sisäänkirjautumistilaa ja päivittää Firebase Authenticationin avulla

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => { // Tarkistaa onko käyttäjä kirjautunut sisään ja päivittää käyttäjän tilan kirjautumisen mukaan
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>; // Jakaa käyttäjätiedon koko sovellukselle
};