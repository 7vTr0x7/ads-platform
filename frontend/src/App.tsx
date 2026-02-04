import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import type { JSX } from "react";

import { ApolloProvider } from "@apollo/client/react";
import { AuthProvider } from "./provider/auth";
import { client } from "./apollo/client";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<></>} />
            <Route path="/register" element={<></>} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <></>
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}
