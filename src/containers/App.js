import {Route, Switch} from 'react-router-dom';
import HomePage from "../pages/HomePage";

import {UserSignupPage} from "../pages/UserSignupPage";
import UserPage from "../pages/UserPage";
import TopBar from "../components/TopBar";
import {LoginPage} from "../pages/LoginPage";


function App() {
    return (
        <div>
            <div className="container">
                <TopBar/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/signup" component={UserSignupPage}/>
                    <Route path="/:username" component={UserPage}/>
                </Switch>
            </div>

        </div>
    );
}

export default App;
