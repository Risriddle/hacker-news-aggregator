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


const toggleBookmark=(id)=>{
   
    const token=localStorage.getItem('token')

    setData((prev)=>
    prev.map((story)=>
    story._id===id?
  {...story,bookmarked:!story.bookmarked}:
story))

    axios.post(`http://localhost:8000/api/stories/${id}/bookmark`,{},
     {headers:{Authorization:`Bearer ${token}`}} 
    )
    .then((res)=>
        {console.log(res.data,"bookmark")
        if(!res.data.sucess){
        setData((prev)=>
          prev.map((story)=>
          story._id===id?
        {...story,bookmarked:!story.bookmarked}:
      story))
    }
     
    })
    .catch((err)=>{
          setData((prev)=>
        prev.map((story)=>
        story._id===id?
      {...story,bookmarked:!story.bookmarked}:
    story))
        console.log("eror bookmarking",err)
    })
    
}

  return (
    <>
    <div className="stories">
      <StoryCard story={data} onToggleBookmark={toggleBookmark} />
    </div>
      
    </>
  )
}

export default Stories
