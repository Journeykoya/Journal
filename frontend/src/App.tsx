import React, { useEffect, useState } from "react";
import useGoogleAuthToken from "./hooks/useGoogleAuthToken";
import useGoogleAuthLink from "./hooks/useGoogleAuthLink";
import useProfile from "./hooks/useProfile";
import axios from "axios";
import { signOut } from "./api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  const { data: profile, refetch: fetchProfile } = useProfile();
  const { data: googleAuth, refetch: fetchGoogleAuth } = useGoogleAuthLink();
  const { mutate, isSuccess } = useGoogleAuthToken();
  const [isAuthenticated, setIsAuthenticated] = useState(false)



  useEffect(() => {
    if (googleAuth) {
      window.location.replace(googleAuth.authorizationUrl);
    }
  }, [googleAuth]);

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code && state) {
      mutate({ code, state });
    }
  }, [mutate]);

  useEffect(() => {
    if (isSuccess) {
      fetchProfile();
    }
  }, [isSuccess, fetchProfile]);



  const handleGoogleLogin = () => {
    fetchGoogleAuth();
  };

  useEffect(() => {
    if (profile)
      setIsAuthenticated(true)
    else
      setIsAuthenticated(false)
  }, [profile]);

  return (
    <Routes>
      <Route path="/" element={<Layout
        isAuthenticated={isAuthenticated}
        profile={profile}
        signOutButton={
          <button onClick={signOut}>Sign Out</button>}
        signInButton={
          <button className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl" onClick={handleGoogleLogin}>Login with Google</button>
        } />}>
        <Route
          path="/contact"
          element={
            isAuthenticated ? <Contact profile={profile} /> : <Navigate to="/login" />
          }

        />
        <Route path="" index element={<Home />} />
        {/* <Route path="contact" element={<Contact />} /> */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>

  );
}

export default App;
