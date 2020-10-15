import React, {useState, useEffect, useReducer} from 'react';
import firebase from 'firebase/app';
import firebaseInitializing from './shared/utils/firebase'
import Loading from './Loading';
import Landing from './shared/components/Landing/Landing';
import Login from './shared/components/Login';
import {MyContext} from "./shared/context/timeSlotsContext";
import './App.css';
import { useHttpClient } from './shared/hooks/http-hook';

// const initialState = {timeslots: [
//   {time: '00', title: '', review: '' },
//   {time: '01', title: '', review: '' },
//   {time: '02', title: '', review: 'Sleep' },
//   {time: '03', title: '', review: 'Sleep' },
//   {time: '04', title: '', review: 'Sleep' },
//   {time: '05', title: '', review: '' },
//   {time: '06', title: '', review: '' },
//   {time: '07', title: '', review: '' },
//   {time: '08', title: '', review: 'Yoga' },
//   {time: '09', title: '', review: '' },
//   {time: '10', title: '', review: '' },
//   {time: '11', title: '', review: '' },
//   {time: '12', title: '', review: 'Reading' },
//   {time: '13', title: '', review: '' },
//   {time: '14', title: '', review: '' },
//   {time: '15', title: '', review: '' },
//   {time: '16', title: '', review: '' },
//   {time: '17', title: '', review: '' },
//   {time: '18', title: '', review: '' },
//   {time: '19', title: '', review: '' },
//   {time: '20', title: '', review: '' },
//   {time: '21', title: '', review: '' },
//   {time: '22', title: '', review: '' },
//   {time: '23', title: '', review: '' },
// ]}

// function reducer(state, action) {
//   switch (action.type) {
//     case "CHANGE_TIMESLOT":
//       return {
//         ...state,
//         ["timeslots"]: state.timeslots.map((timeslot) =>
//           (timeslot.time >= action.newTimeSlot.starts && timeslot.time <= action.newTimeSlot.ends) ? {
//             ...timeslot,
//             "title": action.newTimeSlot.title
//           } : timeslot
//         )
//       };
//     default:
//       return state;
//   }
// }

function App(props) {	
  const [currentUser, setCurrentUser] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // const [state, dispatch] = useReducer(reducer, initialState);	 

  useEffect(() => {	 
    function result () {
      firebaseInitializing.isInitialized().then(value => {	    
        setCurrentUser(value);
        console.log(value);
      });
    } 
    result();
  }, []);

  useEffect(() => {
    async function result() {
      if (currentUser) {
        try{
          await sendRequest(
            'http://localhost:5000/api/users/signup', 
            'POST', 
            JSON.stringify({
              name: currentUser.displayName,
              email: currentUser.email,
              password: currentUser.uid
            }),
            {
              'Content-Type': 'application/json'
            },
          );
          return currentUser;
        } catch (err) {

        }
      // } else {
        
      }

    }
    result();
  }, [currentUser]);

  return !!currentUser ? (
    // <MyContext.Provider value={{state, dispatch}}>
      <Landing currentUser={currentUser}/>
    // {/* </MyContext.Provider> */}
  ) : <Login />
}

export default App;
