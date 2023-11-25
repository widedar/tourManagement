import React from "react";
import {Container,Row,Col,Form,FormGroup,Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import '../styles/login.css'
import { useState } from "react";
import registerImg from '../assets/images/register.png'
import userIcon from '../assets/images/user.png'

const Register =()=>{
    const [credentials , setCredentials]=useState({
        userName:undefined,
        email:undefined,
        password:undefined
    })

    const handleChnge = e =>{
        setCredentials(prev =>({
            ...prev,[e.target.id]: e.target.value}));
        };
    const handleClick = e =>{
        e.preventDefault();
    }
    return  <section>
        <Container>
            <Row>
                <Col lg='8' className="m-auto">
                    <div className="login__container d-flex justify-content-between">
                        <div className="login__img">
                            <img src={registerImg} alt=""/>
                        </div>
                        <div className="login__form">
                            <div className="user">
                                <img src={userIcon}/>
                            </div>
                            <h2>Register</h2>
                            <Form onSubmit={handleClick}>
                            <FormGroup>
                                    <input type="Text" placeholder="userName" required
                                    id="username" onChange={handleChnge}/>
                                </FormGroup>
                                <FormGroup>
                                    <input type="email" placeholder="Email" required
                                    id="email" onChange={handleChnge}/>
                                </FormGroup>
                                <FormGroup>
                                    <input type="password" placeholder="password" required
                                    id="password" onChange={handleChnge}/>
                                </FormGroup>
                                <Button className="btn secondary__btn auth__btn"
                                type="submit">
                                    Create
                                </Button>
                            </Form>
                            <p> Already  have an account ? <Link to="/login">Login</Link></p>
                        </div>
                    </div>

                </Col>
            </Row>
        </Container>

    </section>
};
export default Register;
