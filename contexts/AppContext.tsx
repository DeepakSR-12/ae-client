// context/MyContext.js
"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSignInUser } from "@/hooks/signin"

// Create the context
const GlobalContext = createContext();

// Initial state (adjust as needed)
const initialState = {
	user: null,
	onboarded: false,
	authenticated: false,
};

// Create the provider component
export const GlobalContextProvider = ({ children }) => {
	const { data: session, status } = useSession();
	const [state, setState] = useState(initialState);
	const signInMutation = useSignInUser();

	useEffect(() => {
		console.log("status:::", session)
    if (status === 'authenticated') {
      setState((prevState) => ({
        ...prevState,
        user: session.user,
      }));
      const alohaToken = localStorage.getItem('alohaToken');
			console.log("alohaToken::::", alohaToken)
      // if (!alohaToken && session.user) {
			if (session.user) {
				console.log("CALLED")
        signInMutation.mutate(session);
      }
    }
  }, [session, status]);

	return (
		<GlobalContext.Provider value={{ state, setState }}>
			{children}
		</GlobalContext.Provider>
	);
};

// Custom hook for easy access to the context
export const useGlobalContext = () => {
	return useContext(GlobalContext);
};
