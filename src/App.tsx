import React, { useEffect, useState } from 'react';

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
};

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        const data = await res.json();

        if (data.status === 'ok') {
          setArticles(data.articles || []);
        } else {
          console.error('News API returned an error:', data);
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
      <h1>🗞️ Latest News (US)</h1>
      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {articles.map((article, i) => (
            <li key={i} style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
              <h2 style={{ fontSize: '1.2rem', margin: '1rem 0 0.5rem' }}>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
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
