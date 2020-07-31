const gigsUrl = 'http://localhost:3000/gigs/'


export function patchGig(gig){
    fetch(gigsUrl + gig.id, {
        method: "PATCH",
        headers: {
            "Content-Type": "applicaiton/json"
        },
        body: JSON.stringify({ gig })
    })
}

export function deleteGig(id){
    fetch(gigsUrl + id, {method: "DELETE"})
}



export function postGig(gig){
    console.log(gig);
    fetch(gigsUrl, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({gig})
      })
}