import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    phone: '',
    location: '',
    role: 'CITIZEN'
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/register', formData);
      setMessage('Signup successful! Please login.');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setMessage('Signup failed. Try again.');
    }
  };

  return (
 
    <Container className="mt-5" style={{ maxWidth: '500px', border: '3px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h3 style={{ textAlign: 'center' ,color: 'blue'}}>Signup</h3>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" value={formData.username} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control name="phone" value={formData.phone} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control name="location" value={formData.location} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Check type="radio"  label="🧑 Citizen" value="CITIZEN" name="role" onChange={handleChange} checked={formData.role === 'CITIZEN'} />
          <Form.Check type="radio" label="👮 Officer" value="OFFICER" name="role" onChange={handleChange} checked={formData.role === 'OFFICER'} />
        </Form.Group>

        <Button type="submit" className="w-100" style={{ backgroundColor: 'blue', color: 'white',borderRadius:'3px', }}>Signup</Button>
      </Form>
      <p className="mt-3">Already have an account? <Link to="/">Login</Link></p>
    </Container>
  );
}

export default Register;