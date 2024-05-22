import  { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import getInstagramPosts from '../services/api'; // Importa el servicio de API

const InstagramPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getInstagramPosts();
        // Limitar a las últimas 3 publicaciones
        const latestPosts = data.slice(0, 3);
        setPosts(latestPosts);
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h5" component="div" textAlign="center" sx={{ fontFamily: 'cursive' }}>
        Últimas publicaciones
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {posts.map(post => (
          <Card key={post.id} sx={{ maxWidth: 345, margin: '1rem' }}>
            <a href={post.link} target="_blank" rel="noopener noreferrer"> {/* Enlace a la publicación en Instagram */}
              <CardMedia
                component="img"
                height="140"
                image={post.media_url}
                alt={post.caption}
              />
            </a>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.caption}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(post.timestamp).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InstagramPosts;
