import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';

export default function MainPage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [plans, setPlans] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient;

    useEffect(() => {
        const getUsersPlan = async () => {
            sendRequest('http://localhost:5000/api/users');
        }

        getUsersPlan();
    },[]);
    return (
        <div>
            
        </div>
    )
}
