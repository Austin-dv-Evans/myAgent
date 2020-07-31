import React from 'react'


export default function GigCard ({gig, destroyGig, id}){
    const gigAccepted = gig.accepted ? "Ready to rock!" : "Need a better offer!"
    const gigPaid = gig.paid ? "Paid in full!" : "These guys still owe!"

    return (
        <div className="gig-cards" >
            <h2>Venue: {gig.venue_name}</h2>
            <h4>When? {gig.date_time}</h4>
            <h5>Offer: ${gig.offer}</h5>
            <p>Accepted? {gigAccepted}</p>
            <p>Paid? {gigPaid}</p>
            <button className="myButton2">Accept</button>
            <button className="myButton3">Paid</button>
            <button onClick={destroyGig} id={id} className="myButton4">Delete</button>
            <br></br>
        </div>
    )


}