import { useState, useEffect,useContext } from 'react'
import api from "../api/axios"
import type { Story } from '../interfaces/Story';
import StoryCard from '../components/StoryCard';
import { AuthContext } from '../context/AuthContext'; 
import '../css/Bookmarks.css';

function Bookmarks() {
  const [data, setData] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);  

  useEffect(() => {
    api.get(`/stories/bookmarked`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        console.log(res.data, "data from bookmarks");
        setData(res.data.result.bookmarks);
      })
      .catch((err) => {
        console.log("error fetching data", err);
      })
      .finally(() => setLoading(false));
  }, []);


  const toggleBookmark = (id: string) => {
        setData((prev) => prev.filter((story) => story._id !== id));

    api.post(`/stories/${id}/bookmark`, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        console.log(res.data, "bookmark toggled");
        if (!res.data.success) {
          api.get(`/stories/bookmarked`,
            { headers: { Authorization: `Bearer ${token}` } }
          ).then((res) => setData(res.data.result));
        }
      })
      .catch((err) => {
        console.log("error removing bookmark", err);
        
        api.get(`/stories/bookmarked`,
          { headers: { Authorization: `Bearer ${token}` } }
        ).then((res) => setData(res.data.result));
      });
  };

  return (
    <div className="bookmarks-page">
      <header className="bookmarks-header">
        <p className="bookmarks-header__label">Your Collection</p>
        <h1 className="bookmarks-header__title">Bookmarks</h1>
        <p className="bookmarks-header__count">
          {loading ? 'Loading…' : `${data.length} saved ${data.length === 1 ? 'story' : 'stories'}`}
        </p>
      </header>

      <main className="bookmarks-main">
        {loading ? (
          <div className="bookmarks-skeleton">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="bookmarks-empty">
            <span className="bookmarks-empty__icon">🔖</span>
            <p className="bookmarks-empty__title">Nothing saved yet</p>
            <p className="bookmarks-empty__sub">Stories you bookmark will appear here.</p>
          </div>
        ) : (
          <StoryCard
            story={data}
            onToggleBookmark={toggleBookmark}
            isAuthenticated={true}
            bookmarks={data}
          />
        )}
      </main>
    </div>
  );
}

export default Bookmarks;