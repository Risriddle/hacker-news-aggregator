import { useState,useEffect } from 'react'
import axios from "axios"
import type {Story}  from '../interfaces/Story';



function Stories() {
const [data,setData]=useState<Story[]>([]);

useEffect(()=>{
    axios.get("http://localhost:8000/api/stories")
    .then((res)=>
        {console.log(res.data,"data from backend")
        setData(res.data.result)
    })
    .catch((err)=>{
        console.log("eror fetching data",err)
    })
})

  return (
    <>
      <section id="center">
        <div className="hero">
         
        </div>
        <div>
         <ul>
          {
            data.map((story)=>(
                <li key={story._id}>{story.title}</li>
            ))
          }

         </ul>
          
        </div>
        
      </section>

      <div className="ticks"></div>

      

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default Stories
