import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const bookmark=()=>{
    
}

const read=()=>{
      
}

export default function StoryCard({story}) {
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
        <Button size="small" onClick={bookmark}>Bookmark</Button>
        <Button size="small" onClick={read}>Read More</Button>
      </CardActions>
      </>
      ))}
    </Card>
  );
}

