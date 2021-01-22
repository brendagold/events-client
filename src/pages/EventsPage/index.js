import React, { useState, useMemo } from 'react';
import { Container, Button, Form, FormGroup, Input, Label, Alert, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import CameraIcon from '../../assets/camera.png';
import api from '../../services/api';
import "./events.css"

const EventsPage = ({history}) => {
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [event_type, setEvent_type] = useState('Event');
  const [thumbnail, setThumbnail] = useState(null);
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])


  const handleSubmit = async (evt) => {
    const user_id = localStorage.getItem('user');

    const eventData = new FormData();

    eventData.append("thumbnail", thumbnail)
    eventData.append("type", event_type)
    eventData.append("title", title)
    eventData.append("price", price)
    eventData.append("description", description)
    eventData.append("date", date)

    
      try {
        if( title !== "" && description !== "" && price !== "" && event_type !== "sport" && date !== "" && thumbnail !== null) {
        await api.post("/event", eventData, {headers: {user_id}})
        
        setSuccess(true)
        
        setTimeout(() => {
          setSuccess(false)
          history.push("/")
        }, 2000)
        
        } 
      } catch (error) {
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 2000)

        console.log(error.message)
      }
    

    evt.preventDefault()
    return '';
  };

  return (
    <Container>
      <h2>Create your Event</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Upload Image: </Label>
          <Label id="thumbnail" style={{backgroundImage: `url(${preview}`}} className={thumbnail ? "has-thumbnail" : ""}>
          <Input
            type="file"
            onChange={(evt) => setThumbnail(evt.target.files[0])}
          />
          <img
            src={CameraIcon}
            style={{ maxWidth: '50px' }}
            alt="upload icon"
          />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>Title: </Label>
          <Input
            type="text"
            id="title"
            onChange={(evt) => setTitle(evt.target.value)}
            value={title} placeholder={"Event Title"}
          />
            
        </FormGroup>
        <FormGroup>
          <Label>Event Description: </Label>
          <Input
            type="text"
            id="description"
            onChange={(evt) => setDescription(evt.target.value)}
            value={description} placeholder={"Event Description "}
          />
            
        </FormGroup>
        <FormGroup>
          <Label>Event Price: </Label>
          <Input
            type="text"
            id="price"
            onChange={(evt) => setPrice(evt.target.value)}
            value={price} placeholder={"Event Price #500.00"}
          />
            
        </FormGroup>
        <FormGroup>
          <Label>Event Date: </Label>
          <Input
            type="date"
            id="date"
            onChange={(evt) => setDate(evt.target.value)}
            value={date} placeholder={""}
          />
            
        </FormGroup>
        <FormGroup>
          
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        {event_type}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => setEvent_type("running")}>Running</DropdownItem>
        <DropdownItem onClick={() => setEvent_type("cycling")}>Cycling</DropdownItem>
        <DropdownItem onClick={() => setEvent_type("swimming")}>Swimming</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
        </FormGroup>

        <FormGroup>
          <Button type="submit" className="submit-btn">
          Create Event
        </Button>
        </FormGroup>
        <FormGroup>
          <Button className="secondary-btn" onClick={() => {
            history.push("/")
          }}>Cancel</Button>
        </FormGroup>
        
      </Form>

      {error ? (
        <Alert className="event-validation" color="danger">Missing Required Information</Alert>
      ) : "" }
 
      {success ? (
        <Alert className="event-validation" color="success">Event Successfully Created</Alert>
      ) : "" }
    </Container>
  );
};

export default EventsPage;
