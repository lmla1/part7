import { Link } from 'react-router-dom'
import { useBlogs } from '../store'
import { Box, Typography, Card, CardContent, Chip } from '@mui/material'

const BlogList = () => {
  const blogs = useBlogs()

  return (
    <Box sx={{ mt: 4, maxWidth: 680, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.5px', color: 'grey.900', mb: 3 }}>
        📝 Blogs
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Card
              key={blog.id}
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 3,
                transition: 'all 0.15s',
                '&:hover': { borderColor: 'primary.main', bgcolor: 'grey.50' }
              }}
            >
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>
                    <Typography fontWeight={700} sx={{ color: 'grey.900', '&:hover': { color: 'primary.main' } }}>
                      {blog.title}
                    </Typography>
                  </Link>
                  <Typography variant="caption" sx={{ color: 'grey.500', fontStyle: 'italic' }}>
                    by {blog.author}
                  </Typography>
                </Box>

                <Chip
                  label={`♥ ${blog.likes}`}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: '#e57373', color: '#e57373', fontWeight: 600 }}
                />
              </CardContent>
            </Card>
          ))}
      </Box>
    </Box>
  )
}

export default BlogList