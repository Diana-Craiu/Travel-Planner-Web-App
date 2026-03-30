import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

// interfata pentru proprietatile contextului de autentificare
interface AuthContextProps {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
}

// creare context de autentificare cu valori initiale
const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  userLoggedIn: false,
  loading: true,
});

// hook pentru utilizarea contextului de autentificare
export function useAuth() {
  return useContext(AuthContext);
}

// furnizor de context de autentificare
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // se executa la montarea componentei pentru a verifica starea de autentificare
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return () => unsubscribe();
  }, []);

  // functia pentru initializarea utilizatorului
  async function initializeUser(user: User | null) {
    if (user) {
      if (user.emailVerified) {
        setCurrentUser(user);
        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const value: AuthContextProps = {
    currentUser,
    userLoggedIn,
    loading,
  };
  // se furnizeaza contextul de autentificare si se afiseaza copiii doar daca nu este inca in starea de incarcare
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
