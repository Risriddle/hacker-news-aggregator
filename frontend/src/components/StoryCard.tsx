import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {useState} from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';




export default function StoryCard({story,onToggleBookmark}) {



  return (
    
    <Card sx={{ maxWidth: 345 }}>
      
      {story.map((st)=>(
        
        <>
<CardContent key={st._id}>
        <Typography gutterBottom variant="h5" component="div">
          {st.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         by {st.author}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         {st.score} points| {st.postedAt}
        </Typography>
      </CardContent>
      <CardActions>
        
        <Button size="small" onClick={()=>onToggleBookmark(st._id)}>
          
            {(st.bookmarked)?(<BookmarkIcon></BookmarkIcon>):(<BookmarkBorderIcon></BookmarkBorderIcon>) }</Button>
          

        <a href={st.url} target="_blank" rel="noopener noreferrer">
           Read More</a>
      </CardActions>
      </>
      ))}
    </Card>
  );
}

