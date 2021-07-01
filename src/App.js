import React from "react";
import AuthLayout from "layouts/Auth.js";
import { AuthProvider } from "./contexts/AuthContext"

function App () {
    return (
        <AuthProvider>
            <AuthLayout />
        </AuthProvider>
    );
}

export default App;