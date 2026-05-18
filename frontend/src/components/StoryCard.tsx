import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


import type { Story } from '../interfaces/Story';

import '../css/StoryCard.css';

interface StoryCardProps {
  story: Story[];
  onToggleBookmark: (id: string) => void;
  isAuthenticated: boolean;
  bookmarks: string[];
  showBookmarkButton?: boolean;
}

export default function StoryCard({
  story,
  onToggleBookmark,
  isAuthenticated,
  bookmarks,
  showBookmarkButton
}: StoryCardProps) {

  return (
    <div className="story-grid">

      {story.map((st) => {

        const isBookmarked = bookmarks.includes(st._id);

        return (
          <Card key={st._id} className="story-card" elevation={0}>

            <CardContent className="story-card__content">

              <div className="story-card__meta-top">
                <span className="story-card__score">
                  {st.score} pts
                </span>

                <span className="story-card__date">
                  {st.postedAt}
                </span>
              </div>

              <Typography
                className="story-card__title"
                variant="h6"
                component="h2"
              >
                {st.title}
              </Typography>

              <Typography
                className="story-card__author"
                variant="body2"
              >
                by {st.author}
              </Typography>

            </CardContent>

            <CardActions className="story-card__actions">
{isAuthenticated && showBookmarkButton &&(
  <button
    className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
    onClick={() => onToggleBookmark(st._id)}
    aria-label={
      isBookmarked
        ? 'Remove bookmark'
        : 'Add bookmark'
    }
  >
    {isBookmarked
      ? <BookmarkIcon fontSize="small" />
      : <BookmarkBorderIcon fontSize="small" />
    }

    <span>
      {isBookmarked ? 'Saved' : 'Save'}
    </span>
  </button>
)}

              <a
                href={st.url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more-link"
              >
                Read
                <OpenInNewIcon fontSize="inherit" />
              </a>

            </CardActions>

          </Card>
        );
      })}
    </div>
  );
}