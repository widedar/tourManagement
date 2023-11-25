import React, {useState} from "react";
import './booking.css'
import {Form, FormGroup, ListGroup,ListGroupItemHeading,Button} from 'reactstrap'
import { useNavigate } from "react-router-dom";
const Booking = ({tour, avgRating}) =>{
    const {price} = tour
    const navigate = useNavigate()
    const [credentials,setCredentials]= useState({
        userId:'01',
        userEmail:'user@gmail0com',
        fullname:'',
        phone:'',
        cin:'',
        arriver:'',
        aller:''

    })
    const handelChange = e=>{
        setCredentials(prev=>({...prev,
        [e.target.id]:e.target.value}))
    };
    const handleClick = e=>{
        e.preventDefault();
        console.log(credentials);
        navigate('/thank-you');
    }
    return <div className="booking-container">
    <div className="booking__top d-felx
    align-items-center justify-content-between">
        <h3>
       $ {price} <span>/ per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center gap-1">
            <i class="ri-star-s-fill" style={{color:"var(--secondary-color)"}}>

            </i>
            {avgRating ===0 ? null : avgRating}

        </span>
    </div>
    <div className="booking__form">
        <h5>Informations</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
            <FormGroup>
                <input type="text" placeholder="Full Name" id="fullName" required onChange={handelChange}/>
            </FormGroup>
            <FormGroup>
                <input type="number" placeholder="Phone" id="phone" required onChange={handelChange}/>
            </FormGroup>
            <FormGroup>
                <input type="text" placeholder="CIN" id="cin" required onChange={handelChange}/>
            </FormGroup>
            <FormGroup className="d-felx align-items-center gap-3">
            From : <input type="date" placeholder="" id="aller" required onChange={handelChange}/><br/>
             To : <input type="date" placeholder="" id="arriver" required onChange={handelChange}/>
                

            </FormGroup>
           <Button className="btn primary__btn" onClick={handleClick}>Book Now</Button>
        </Form>

    </div>
    </div>
};
export default Booking;

