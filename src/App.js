import React from "react";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import { BrowserRouter as Router , Route, Switch, Redirect } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo';

function App () {
    return (
        <Router>
            <ApolloProvider client={apolloClient}>
                <AuthProvider>
                    <Switch>
                        <PrivateRoute path="/admin" component={AdminLayout} />
                        <Route path="/auth" render={props => <AuthLayout {...props} />} />
                        <Redirect from="/" to="/auth" />
                    </Switch>
                </AuthProvider>
            </ApolloProvider>
        </Router>
    );
}

export default App;