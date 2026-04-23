import useField from '../hooks/useField'
import { TextField, Button, Box, Typography, Card, CardContent, Divider } from '@mui/material'
import { useBlogActions } from '../store'
import { useNavigate } from 'react-router-dom'

const BlogForm = () => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const { add, setNotification } = useBlogActions()
  const navigate = useNavigate()

  const addBlog = async (event) => {
    event.preventDefault()
    await add({ title: title.value, author: author.value, url: url.value })
    setNotification({ text: `"${title.value}" by ${author.value} added`, type: 'success' })
    setTimeout(() => setNotification(null), 5000)
    title.reset()
    author.reset()
    url.reset()
    navigate('/')
  }

  return (
    <Box sx={{ maxWidth: 560, mt: 4, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.5px', color: 'grey.900', mb: 3 }}>
        ✏️ New Blog
      </Typography>

      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={addBlog} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Title"
              value={title.value}
              onChange={title.onChange}
              fullWidth
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              label="Author"
              value={author.value}
              onChange={author.onChange}
              fullWidth
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              label="URL"
              value={url.value}
              onChange={url.onChange}
              fullWidth
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <Divider sx={{ my: 0.5 }} />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, fontSize: '1rem', py: 1.2 }}
            >
              Publish Blog
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default BlogForm