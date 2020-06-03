import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase';
import Login from '../Login';
import Home from '../Home/Home'
import More from '../More/More'
import Navbar from '../Navbar';
import './landing.css';

export default function Landing() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user)
            console.log("user", user)
        })
    }, [])

    return (
        <div className="Landing">
            {isSignedIn !== false ? (
                <>
                    <Router>
                        <Switch>
                            <div id="content">
                                <Route exact path="/" component={Home} />
                                <Route exact path="/schedule" component={Home} />
                                <Route exact path="/calendar" component={Home} />
                                <Route exact path="/more" component={More} />
                                {/* <Route exact path="/" component={} /> */}
                            </div>
                        </Switch>
                        <Navbar />
                    </Router>
                </>
            ) : (
                <>
                    <Login />
                </>
            )}
        </div>
    )
    // async function login() {
    //     try {
    //         await firebase.login(email, password)
    //         props.history.replace('/')
    //     } catch(error) {
    //         alert(error.message)
    //     }
    // }

}
