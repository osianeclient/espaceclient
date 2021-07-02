import React from "react";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router , Route, Switch, Redirect } from "react-router-dom";

function App () {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <Route path="/admin" render={props => <AdminLayout {...props} />} />
                    <Route path="/auth" render={props => <AuthLayout {...props} />} />
                    <Redirect from="/" to="/admin/index" />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;