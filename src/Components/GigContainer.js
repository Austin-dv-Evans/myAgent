import React from 'react'
import GigCard from './GigCard'


export default function GigContainer({gigs, destroyGig, id}) {

    const gigList = () => {
        return gigs.map(gig => {
            return (
            <GigCard key={id} gig={gig} destroyGig={destroyGig}/>
            ) 
        })
       
    }

    return (
        <section className="all-gigs">
            <h1>Upcoming Gigs...</h1>
            { gigList() }
        </section>
    )

}