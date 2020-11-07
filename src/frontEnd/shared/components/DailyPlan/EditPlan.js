import React, { useState, useEffect, useContext } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import './editplan.css';
import { AuthContext } from '../../context/auth-context';


export default function EditPlan() {
    const currentUser = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    // const [timeslots, setTimeslots] = useState([]);
    // const [currentUser, setCurrentUser] = useState(null);
    const [newEvent, setNewEvent] = useState({
        title: '',
        starts: 0,
        ends: 0,
    });

    const getTitle = (e) => setNewEvent({...newEvent, title: e.target.value.trim()})
    const getStarts = (e) => setNewEvent({...newEvent, starts: e.target.value})
    const getEnds = (e) => setNewEvent({...newEvent, ends: e.target.value})
    
    // function replace() {
    //     return timeslots
    //         .map((timeslot, index) => {
    //             if(index >= newEvent.starts && index <= newEvent.ends){
    //                 return {...timeslot, title: newEvent.title};
    //             }
    //         return timeslot;
    //     });
    // }
    console.log(currentUser.userId);

    function submitHandler(e) {
        e.preventDefault();
        // postingTitle(replace());
        try {
            // console.log(currentUser.id);
            sendRequest(
                'http://localhost:5000/api/dailyplan/addplan', 
                'POST', 
                JSON.stringify({
                    title: newEvent.title, 
                    starts: newEvent.starts, 
                    ends: newEvent.ends,
                    id: currentUser.userId
                }),
                {
                    'Content-Type': 'application/json'
                }
            )
        } catch (err) {}

    }

    // function eventUpdate() {
    //     if (!filtering) {
    //         setApiData(apiData.filter((timeslots,index) => {
    //             const timeRange = index >= parseInt(newEvent.start) && index <= parseInt(newEvent.end)
    //             timeRange.map(timeslot => timeslot.title = newEvent.title)
    //         }))
    //     }
    // }

    //     changeTimeSlot(newEvent);
                    // for (let i = parseInt(newEvent.starts); i <= parseInt(newEvent.ends); i++) {
                    //     const timeslot = timeslots[i];
                    //     if (timeslot.time >= newEvent.starts && timeslot.time <= newEvent.ends) {
                    //         timeslot.title = newEvent.title;
                    //         // setNewEvent({title: '', starts: 0, ends: 0});
                    //     }
                    // }
    // }

    const timeOptions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

    return (
        <form >
            <div  id="edit-form">
                <div className="input-wrapper">
                    <input 
                        id="new-event-input"
                        type="text" 
                        placeholder="New Event" 
                        onChange={getTitle} 
                        value={newEvent.title}
                    />
                </div>
                <div className="input-wrapper">
                    <label>Starts </label>
                    <select 
                        className="edit-plan-time"
                        onChange={getStarts}
                        value={newEvent.starts}
                    >
                        {
                            timeOptions.map((hour, index) => {
                                return <option key={index}>{index < 10 ? `0${index}` : index}</option>
                            })
                        }
                    </select>
                </div>
                <div className="input-wrapper">
                    <label>Ends </label>
                    <select 
                        className="edit-plan-time"
                        onChange={getEnds}
                        value={newEvent.ends}
                    >     
                        {
                            timeOptions.map((hour, index) => {
                                return <option key={index}>{index < 10 ? `0${index}` : index}</option>
                            })
                        }
                    </select>
                </div>
                {/* <div className="input-wrapper">
                    Repeat
                </div> */}
                <div className="input-wrapper">
                    <span>Alert</span><span>></span>
                </div>
                {/* <div className="input-wrapper">
                    <h3 style={{margin: 0}}>BOLD</h3>
                    <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                    </label>
                </div> 
                <div>
                    <textarea placeholder="Notes" rows="4" onChange={getMemo}>
                    </textarea>
                </div> */}
            </div>
            <button className="submit-btn" onClick={submitHandler}>Submit</button>
        </form>
    )
}

