import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../data/firebase";
import { getUserByUid } from "../services/userService";
import { Redirect } from "expo-router";

type AppUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoUrl?: string | null;
  role: string;
};

type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  // verificar el estado del usuario logueado en firebase
  useEffect(() => {
    let isMounted = true;
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!isMounted) return;
      setLoading(true);
      

      if (!firebaseUser) {
        console.info("[Auth] Sesión cerrada.");
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const profile = await getUserByUid(firebaseUser.uid);
        const role = profile?.role ?? "client";
        const resolvedUser: AppUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoUrl: profile?.photoUrl ?? firebaseUser.photoURL ?? undefined,
          role,
        };
        console.info(
          `[Auth] Usuario ${resolvedUser.email ?? resolvedUser.uid} autenticado como ${role}.`
        );
        if (isMounted) {
          setUser(resolvedUser);
        }
      } catch (error) {
        console.error("[Auth] Error cargando perfil de usuario", error);
        const fallbackUser: AppUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL ?? undefined,
          role: "client",
        };
        if (isMounted) {
          setUser(fallbackUser);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
      unsub();
    };
  }, []);
  // getUser uid 

  const logout = async () => {
    console.info("[Auth] Cerrando sesión solicitada por el usuario.");
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
