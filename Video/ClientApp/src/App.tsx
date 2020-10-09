import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import SignIn from './components/auth/signIn/SignIn';
import PersonalLibraryDashboard from 'components/personalLibrary/PersonalLibrary';
import GuardRoute from 'components/auth/guardRoute/guardRoutes';
import SignUp from 'components/auth/signUp/SignUp';
import ActivateUser from 'components/auth/activateUser/ActivateUser';
import 'bootstrap';
import './main.css';

export default () => (
    <Layout>
        <GuardRoute exact path='/' component={PersonalLibraryDashboard} />
        <Route path='/signIn' component={SignIn} />
        <Route path='/signUp' component={SignUp} />
        <Route path='/activate_user' component={ActivateUser} />

        {/* <Route path='/fetch-data/:startDateIndex?' component={FetchData} /> */}
    </Layout>
);
