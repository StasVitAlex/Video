import * as React from 'react';
import {connect} from 'react-redux';
import MicrosoftLogin from "react-microsoft-login";
import {WeatherForecast} from "../store/WeatherForecasts";

const authHandler = async (err: any, data: any) => {
    console.log(err, data);
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({accessToken: data.authResponseWithAccessToken.accessToken})
    };
    const response = await fetch(`auth/microsoft`, requestOptions);
};
const Home = () => (
    <div>
        <h1>Hello, world!</h1>
        <MicrosoftLogin clientId='acf2afdb-e91f-476f-a062-078a6a230fe9' authCallback={authHandler} redirectUri='https://localhost:5001/microsoft-auth-response'/>
        <p>Welcome to your new single-page application, built with:</p>
        <ul>
            <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
            <li><a href='https://facebook.github.io/react/'>React</a> and <a href='https://redux.js.org/'>Redux</a> for client-side code</li>
            <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p>To help you get started, we've also set up:</p>
        <ul>
            <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
            <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on
                demand and the page refreshes when you modify any file.
            </li>
            <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
        </ul>
        <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm
            test</code> or <code>npm install</code>.</p>
    </div>
);

export default connect()(Home);
