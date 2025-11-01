import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './greeting.css'
import { useParams } from 'react-router-dom';
export default function Greeting() {
    const navigate = useNavigate();
    const params = useParams();
    const guest = params.guest || 'Guest';

    useEffect(function(){
        setTimeout(function(){
            navigate('/venue')
        },5000)
    },[])

    return (
        <div id='greeting'>
            <div className="intro mt-2">
                <h1 className='text-center p-2 pb-1 fw-bolder'>Wedding <br /> Invitation</h1>
                <h3 className='fs-1 text-center fw-bolder text-white'>Dear {guest},<br />You're Invited to Celebrate Our Special Day</h3>
                <div className="couple-names mt-5">
                    <div className="name asim">Asim</div>
                    <div className="and">&</div>
                    <div className="name ifra">Ifra</div>
                </div>
                <img style={{width:"100%"}} src="https://static.vecteezy.com/system/resources/previews/035/286/318/non_2x/faceless-cartoon-couple-muslim-bride-and-groom-free-png.png" alt="" />
                {/* <button className="continue-button">Venue</button> */}
            </div>
        </div>
    )
}
