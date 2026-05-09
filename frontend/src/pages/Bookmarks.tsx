import { useState,useEffect } from 'react'
import axios from "axios"
import type {Story}  from '../interfaces/Story';
import StoryCard from '../components/StoryCard';


function Bookmarks() {
const [data,setData]=useState<Story[]>([]);

const token=localStorage.getItem("token")
useEffect(()=>{
    axios.get(`http://localhost:8000/api/stories/bookmarked`,
     {headers:{Authorization:`Bearer ${token}`}} 
    )
    .then((res)=>
        {console.log(res.data,"data from bookmarks")
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

export default Bookmarks
