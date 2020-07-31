import React from 'react'

export default function Documents (props){
    return(
        <div>
            <h1>Documents</h1><br></br><br></br>
            <a href='./Files/band-performance-contract.pdf' download className="myButton">Performance Agreement</a>
            <br></br><br></br>
            <a href='./Files/BandPartnershipContractTemplate.doc' download className="myButton">Band Agreement</a>
            <br></br><br></br>
            <a href='./Files/Contract-Rider.pdf' download className="myButton">Rider</a>
           
        </div>
    )
}