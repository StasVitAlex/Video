import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import SignIn from './components/auth/signIn/SignIn';

import './main.css';

export default () => (
    <Layout>
        <Route exact path='/' component={SignIn} />
        {/* <Route path='/fetch-data/:startDateIndex?' component={FetchData} /> */}
    </Layout>
);
