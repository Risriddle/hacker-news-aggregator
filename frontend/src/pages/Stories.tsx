import { useState,useEffect } from 'react'
import axios from "axios"
import type {Story}  from '../interfaces/Story';
import StoryCard from '../components/StoryCard';


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
},[])

  return (
    <>
    <div className="stories">
      <StoryCard story={data} />
    </div>
      
    </>
  )
}

export default Stories
