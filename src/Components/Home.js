import React from 'react'
import GigContainer from './GigContainer'


export default function Home({gigs, destroyGig, id}){
    return (
        <>
        <GigContainer gigs={gigs} destroyGig={destroyGig} key={id}/>
        </>
    )
}