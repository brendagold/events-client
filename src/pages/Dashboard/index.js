import React, { useState, useEffect } from 'react';
import {Button, ButtonGroup} from "reactstrap";
import api from '../../services/api';
import moment from 'moment';
import "./dashboard.css";

const Dashboard = ({history}) => {
  const [events, setEvents] = useState([]);
  const [rSelected, setRSelected] = useState(null);
  const [cSelected, setCSelected] = useState([]);
  const user_id = localStorage.getItem('user');

  useEffect(() => {
    getEvents() 
  }, [])

  const filterHandler = (query) => {
    setRSelected(query);
    getEvents(query);
   
  }

  const getEvents = async (filter) => {

    const url = filter ? `/dashboard/${filter}` : '/dashboard';
    const response = await api.get(url, {headers: {user_id}});

    setEvents(response.data)
  }
 
  return ( 
    <>
    <div className="mb-5 mb-sm-3 filter-panel">
       
      <ButtonGroup>
        <Button color="primary" onClick={() => filterHandler(null)} active={rSelected === null}>All Events</Button>
        <Button color="primary" onClick={() => filterHandler("myevents")} active={rSelected === "myevents"}>My Events</Button>
        <Button color="primary" onClick={() => filterHandler("running")} active={rSelected === "running"}>Running</Button>
        <Button color="primary" onClick={() => filterHandler("cycling")} active={rSelected === "cycling"}>Cycling</Button>
        <Button color="primary" onClick={() => filterHandler("swimming")} active={rSelected === "swimming"}>Swimming</Button>
        
      </ButtonGroup>

      <Button color="secondary" className="" onClick={() => history.push("events")}>Add Event</Button>
    </div>
  
  <ul className="events-list"> 
    {
      events.map(event => (
        <li key={event._id}> 
          {/* <header style={{backgroundImage: `url(${event.thumbnail_url})`}} /> */}
          <img src={event.thumbnail_url} alt={event.title}/>
      <strong>{event.title}</strong>
      <span>Event Date: {moment(event.date).format("l")}</span>
      <span>Event Price: ₦{parseFloat(event.price).toFixed(2)}</span>
      <span>Event Description: {event.description}</span>
      <Button color="primary">Subscribe</Button>
        </li>
      ))
    }
  </ul>
  </>
   );
};

export default Dashboard;
