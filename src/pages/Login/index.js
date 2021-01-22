import React, { useState } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Input, Alert } from 'reactstrap';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
   

    const response = await api.post('/login', { email, password });
    const userId = response.data._id || false;

    try {
      if (userId) {
        localStorage.setItem('user', userId);
        setSuccess(true)
        history.push('/');
      } else {
        const { message } = response.data;
        setError(true)
        setErrorMessage(message)
        setTimeout(() => {
          setError(false)
          setErrorMessage('')
        }, 2000);
      }
    } catch (error) {
      setError(true)
      setErrorMessage("Error, the server Returned an Error")
    }
  };

  return (
    <Container>
      <h2>Login:</h2>
      <p>
        Please <strong>Login</strong> to your account
      </p>
      <Form onSubmit={handleSubmit}>
      <FormGroup className=""> 
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Your Email"
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Your Password"
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </FormGroup>
        </FormGroup>
        <FormGroup> 
          <Button className="submit-btn">Submit</Button>
        </FormGroup>
        <FormGroup>
          <Button className="secondary-btn" onClick={() => {
            history.push("/register")
          }}>Create Account</Button>
        </FormGroup>
        
      </Form>
      {error ? (
        <Alert className="event-validation" color="danger">{errorMessage}</Alert>
      ) : "" }
      {success ? (
        <Alert className="event-validation" color="success">Event successfully added</Alert>
      ) : "" }
    </Container>
  );
};

export default Login;
