import { useState, useEffect ,useContext} from 'react'
import axios from "axios"
import type { Story } from '../interfaces/Story';
import StoryCard from '../components/StoryCard';
import { AuthContext } from '../context/AuthContext'; 
import '../css/Stories.css';

function Stories() {
  const [data, setData] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext); 
  const isAuthenticated=!!token

  useEffect(() => {
    axios.get("http://localhost:8000/api/stories")
      .then((res) => {
        console.log(res.data, "data from backend");
        setData(res.data.result);
      })
      .catch((err) => {
        console.log("error fetching data", err);
      })
      .finally(() => setLoading(false));
  }, []);



  const toggleBookmark = (id: string) => {
    if (!isAuthenticated) return; 

    setData((prev) =>
      prev.map((story) =>
        story._id === id ? { ...story, bookmarked: !story.bookmarked } : story
      )
    );

    axios.post(`http://localhost:8000/api/stories/${id}/bookmark`, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        console.log(res.data, "bookmark");
        if (!res.data.success) {
          setData((prev) =>
            prev.map((story) =>
              story._id === id ? { ...story, bookmarked: !story.bookmarked } : story
            )
          );
        }
      })
      .catch((err) => {
        setData((prev) =>
          prev.map((story) =>
            story._id === id ? { ...story, bookmarked: !story.bookmarked } : story
          )
        );
        console.log("error bookmarking", err);
      });
  };

  return (
    <div className="stories-page">
      <header className="stories-header">
        <p className="stories-header__label">Curated Reads</p>
        <h1 className="stories-header__title">Stories</h1>
        <p className="stories-header__count">
          {loading ? 'Loading…' : `${data.length} stories`}
        </p>
      </header>

      <main className="stories-main">
        {loading ? (
          <div className="stories-skeleton">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : (
          <StoryCard story={data} onToggleBookmark={toggleBookmark} isAuthenticated={isAuthenticated} />
        )}
      </main>
    </div>
  );
}

export default Stories;