
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import type { Story } from '../interfaces/Story';
import StoryCard from '../components/StoryCard';
import { AuthContext } from '../context/AuthContext';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import '../css/Stories.css';

function Stories() {
  const [data, setData] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, user,setUser } = useContext(AuthContext);


  const isAuthenticated = !!token;


const fetchCurrentUser=async()=>{
  const user_id=user._id
          axios.get(`http://localhost:8000/api/user/getUser/${user_id}`,
              {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
          )
      .then((res) => {
        setUser(res.data.userData);
      })
      .catch((err) => {
        console.log("error fetching data", err);
      })
      .finally(() => setLoading(false));

  }

 
   if(isAuthenticated)
  {
    fetchCurrentUser()
  }

  useEffect(() => {
    axios.get("http://localhost:8000/api/stories")
      .then((res) => {
        setData(res.data.result);
      })
      .catch((err) => {
        console.log("error fetching data", err);
      })
      .finally(() => setLoading(false));
  }, []);


 const toggleBookmark = async (id: string) => {
  if (!isAuthenticated || !user) return;

  try {

    const res = await axios.post(
      `http://localhost:8000/api/stories/${id}/bookmark`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setUser(res.data.user);

  } catch (err) {
    console.log("error bookmarking", err);
  }
};


  return (
    <div className="stories-page">

      <header className="stories-header">
        <p className="stories-header__label">Curated Reads</p>

        <h1 className="stories-header__title">
          Stories
        </h1>

        <p className="stories-header__count">
          {loading ? 'Loading…' : `${data.length} stories`}
        </p>

        <div className="stories-header__nav">
          {isAuthenticated ? (
            <a href="/bookmarks" className="nav-btn nav-btn--bookmarks">
              <BookmarkIcon fontSize="small" />
              Bookmarks
            </a>
          ) : (
            <a href="/login" className="nav-btn nav-btn--login">
              Log in to save stories
            </a>
          )}
        </div>
      </header>

      <main className="stories-main">
        {loading ? (
          <div className="stories-skeleton">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : (
          <StoryCard
            story={data}
            onToggleBookmark={toggleBookmark}
            isAuthenticated={isAuthenticated}
            bookmarks={user?.bookmarks || []}
          />
        )}
      </main>
    </div>
  );
}

export default Stories;