import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import type { Story } from '../interfaces/Story';

import '../css/StoryCard.css';

interface StoryCardProps {
  story: Story[];
  onToggleBookmark: (id: string) => void;
  isAuthenticated: boolean;
  bookmarks: string[];
}

export default function StoryCard({
  story,
  onToggleBookmark,
  isAuthenticated,
  bookmarks
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

              <Tooltip
                title={isAuthenticated ? '' : 'Log in to bookmark stories'}
                arrow
                placement="top"
                disableHoverListener={isAuthenticated}
                disableFocusListener={isAuthenticated}
              >

                <span>
                  <button
                    className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''} ${!isAuthenticated ? 'locked' : ''}`}
                    onClick={() => onToggleBookmark(st._id)}
                    aria-label={
                      isAuthenticated
                        ? (isBookmarked
                          ? 'Remove bookmark'
                          : 'Add bookmark')
                        : 'Log in to bookmark'
                    }
                  >

                    {!isAuthenticated
                      ? <LockOutlinedIcon fontSize="small" />
                      : isBookmarked
                        ? <BookmarkIcon fontSize="small" />
                        : <BookmarkBorderIcon fontSize="small" />
                    }

                    <span>
                      {isAuthenticated
                        ? (isBookmarked ? 'Saved' : 'Save')
                        : 'Save'}
                    </span>

                  </button>
                </span>

              </Tooltip>

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