import { useEffect, useState } from 'react'
import {
  Box, Card, CardContent, Typography, Button,
  Link, TextField, Divider, Chip, Avatar
} from '@mui/material'
import { useUser, useBlogActions, useBlogById } from '../store'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = () => {
  const user = useUser()
  const { id } = useParams()
  const blog = useBlogById(id)
  const { deleteById, incrementLikesById, fetchComments, addComment } = useBlogActions()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (id) fetchComments(id)
  }, [id])

  if (!blog) return null

  const blogUserId = blog.user?.id || blog.user

  const remove = async (id) => {
    if (window.confirm(`Remove "${blog.title}"?`)) {
      await deleteById(id)
      navigate('/')
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    await addComment(blog.id, comment)
    setComment('')
  }

  return (
    <Box sx={{ maxWidth: 680, mt: 4, mx: 'auto' }}>
      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
        <CardContent sx={{ p: 4 }}>

          <Typography variant="h4" fontWeight={800} sx={{ mb: 1, letterSpacing: '-0.5px', lineHeight: 1.2, color: 'grey.900' }}>
            {blog.title}
          </Typography>

          <Typography variant="body1" sx={{ color: 'grey.500', mb: 0.5, fontStyle: 'italic' }}>
            by {blog.author}
          </Typography>

          <Link href={blog.url} target="_blank" rel="noreferrer" sx={{ display: 'inline-block', mb: 1.5, fontSize: '0.85rem', wordBreak: 'break-all' }}>
            {blog.url}
          </Link>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <Avatar sx={{ width: 22, height: 22, fontSize: '0.7rem', bgcolor: 'grey.300', color: 'grey.700' }}>
              {(blog.user?.name || user?.name || '?')[0].toUpperCase()}
            </Avatar>
            <Typography variant="caption" sx={{ color: 'grey.500' }}>
              Added by {blog.user?.name || user?.name}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Chip
              label={`♥ ${blog.likes} likes`}
              variant="outlined"
              size="small"
              sx={{ fontWeight: 600, borderColor: '#e57373', color: '#e57373' }}
            />
            {user && (
              <Button
                variant="contained"
                size="small"
                onClick={() => incrementLikesById(blog.id)}
                sx={{ bgcolor: '#e57373', '&:hover': { bgcolor: '#ef5350' }, textTransform: 'none', borderRadius: 2, fontWeight: 600, px: 2 }}
              >
                ♥ Like
              </Button>
            )}
            {blogUserId === user?.userid && (
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={() => remove(blog.id)}
                sx={{ textTransform: 'none', borderRadius: 2, ml: 'auto' }}
              >
                Remove
              </Button>
            )}
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h6" fontWeight={700} sx={{ color: 'grey.800' }}>
              💬 Comments
            </Typography>
            <Chip
              label={blog.comments?.length || 0}
              size="small"
              sx={{ bgcolor: 'grey.100', fontWeight: 600, height: 20, fontSize: '0.7rem' }}
            />
          </Box>

          <Box component="form" onSubmit={handleAddComment} sx={{ display: 'flex', gap: 1, mb: 3, alignItems: 'flex-start' }}>
            <TextField
              size="small"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              sx={{ width: '70%', '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'grey.50' } }}
            />
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600, whiteSpace: 'nowrap', px: 2.5, py: 1 }}
            >
              Add comment
            </Button>
          </Box>

          <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
            {(blog.comments || []).map((c, i) => (
              <Box component="li" key={i} sx={{ px: 2, py: 1.2, mb: 1, borderRadius: 2, bgcolor: 'grey.50', borderLeft: '3px solid', borderColor: 'primary.light' }}>
                <Typography variant="body2" sx={{ color: 'grey.800' }}>{c}</Typography>
              </Box>
            ))}
          </Box>

        </CardContent>
      </Card>
    </Box>
  )
}

export default Blog