import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom';
// import EditPlan from './EditPlan';
// import Review from './Review/Review';
import Productivity from '../Productivity/Productivity';
// import {MyContext} from '../../context/timeSlotsContext';
import './dailyPlan.css';
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../context/auth-context';
import EditPlan from './EditPlan';


const databaseURL = 'https://dailyreview-7e684.firebaseio.com/';
export default function DailyPlan() {
  const auth = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [timeslots, setTimeslots] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient;
  

  let currentFuid;
  
  // setCurrentUser(useContext(AuthContext.fuid));
  // console.log(currentFuid);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log(`before setCurrentUser ${currentUser}`)
        const responseData = await sendRequest('http://localhost:5000/api/users');
        await setCurrentUser(responseData.users.find(user => user.fuid === auth.fuid));
        console.log(`after setCurrentUser ${currentUser}`)
      } catch (err) {}
    };
    
    fetchUsers();
  }, [sendRequest]);



  let newDate = new Date();
  let hour = newDate.getHours();
  let minute = newDate.getMinutes();
  function current() {
    return `${hour} : ${minute < 10 ? `0${minute}` : minute}`;
    //the slot time passed, alert for reveiwing
  }
  
  // let { path, url } = useRouteMatch();
  
            // function totalProductivity() {
            //   console.log(timeslots)
            //   const reviews = timeslots.map(timeslot => timeslot.review)
            //   const reviewSet = new Set(reviews)
            //   reviewSet.delete("")
            //   return Array.from(reviewSet);
            // }
            // function changeTimeSlot(newTimeSlot) {
            //   dispatch({
            //     type: "CHANGE_TIMESLOT",
            //     newTimeSlot: newTimeSlot
            //   })
            // }


  function timeTable() {
    return timeslots ? timeslots.map((timeslot, index) => (
      <div 
        key={index} 
        className="timeslot-row"
        style={{
          backgroundColor: 
            index < hour ? 'lightgrey' : 'none'
          
        }}
      >
        {
          <>
            <div className="timeslot">{
              index < 10 ? `0${index}` : index
            } : 00</div>
            <div className="plan-wrapper">
              <Link className="event-slot" to="/editplan" >{timeslot.title}</Link>
              {/* display positive percentage */}
              <Link className="review-slot" to="/review">{timeslot.review}</Link>
            </div>
          </>
        }
      </div>
    )): <></>;
  }        

  return auth ? (
    <div>
      <h1>
        Daily Review <br /> {current()}
      </h1>
      <br />
      <EditPlan currentUser={currentUser}/>
      {/* <Productivity /> */}
      <Link className="submit-btn">Add Plan</Link>
      <div className="timeslot-wrapper">
        <div className="timeslot-row">
          <div className="timeslot"></div>
          <div className="plan-wrapper">
            <div className="event-slot">Plan</div>
            <div className="review-slot">Review</div>
          </div>
        </div>
        <div>{timeTable()}</div>
      </div>
    </div>
  ) : <></>;
}
