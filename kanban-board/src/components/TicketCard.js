// components/TicketCard.js
import React from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket }) => {
  // const { id, title, tag, user } = ticket;

  // console.log(ticket)
  // Function to check user availability
  // const isUserAvailable = (userData) => {
  //   // Your logic to determine user availability
  //   // For demonstration purposes, assuming user availability is represented by a boolean value in the user object
  //   return userData.available ? 'Available' : 'Not Available';
  // };
  console.log(ticket,'hi');

  return (
    <div className="ticket-card">
      <div className="card-content">
        <div className='written'>
        <p style={{color:'grey',fontWeight:'bold'}}>{ticket.id}</p>
        <p style={{fontWeight:'bold'}}>{ticket.title}</p>
        <div style={{display:'flex',flexDirection:'row'}}>
        <p><i class="fa-solid fa-exclamation fa-bounce"></i></p>
        <p style={{color:'grey', marginLeft:'5px'}}>{ticket.tag}</p>
        </div>
        </div>
        <div className='pic' style={{marginLeft:'20%'}}>
          <p className='profile'><i class="fa-solid fa-user fa-2x fa-align-right"></i></p>
        </div>
        {/* <p>User Name: {ticket.name}</p> */}
        {/* <p>User Availability: {ticket.available ? 'Available' : "Unavailable"}</p> */}
        {/* <p>User Availability: {isUserAvailable(user)}</p> */}
      </div>
    </div>
  );
};

export default TicketCard;
