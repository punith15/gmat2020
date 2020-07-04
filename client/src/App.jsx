import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SignUp from './containers/SignUp'
import Login from './containers/Login'
import Container from './containers/Container'

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/signup" exact component={SignUp}/>
                    <Route path="/home" exact component={Container}/>
                </Switch>
            </Router>
            
        </div>
    );
};

export default App;