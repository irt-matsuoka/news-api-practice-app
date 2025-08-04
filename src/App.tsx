import React, { useEffect, useState } from 'react';

type Article = {
  title: string;
  description: string;
  link: string;
  image_url: string;
};

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://newsdata.io/api/1/news?country=us&language=en&apikey=${process.env.REACT_APP_NEWSDATA_API_KEY}`
        );
        const data = await res.json();

        if (data.status === 'success') {
          setArticles(data.results || []);
        } else {
          console.error('Newsdata API returned error:', data);
        }
      } catch (error) {
        console.error('ニュース取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📰 Newsdata.io US News</h1>
      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {articles.map((article, i) => (
            <li key={i} style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.title}
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
              <h2 style={{ fontSize: '1.2rem', margin: '1rem 0 0.5rem' }}>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                Read more →
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
