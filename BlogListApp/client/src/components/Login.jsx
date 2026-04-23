import { useNavigate } from 'react-router-dom'
import Notification from './Notification'
import { TextField, Button, Box, Typography, Card, CardContent, Divider } from '@mui/material'
import { useBlogActions } from '../store'
import useField from '../hooks/useField'

const Login = () => {
  const { login, setNotification } = useBlogActions()
  const username = useField('text')
  const password = useField('password')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await login({ username: username.value, password: password.value })
      navigate('/')
    } catch {
      setNotification({ text: 'wrong username or password', type: 'error' })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  return (
    <Box sx={{ maxWidth: 400, mt: 8, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.5px', color: 'grey.900', mb: 1 }}>
        Welcome back 👋
      </Typography>
      <Typography variant="body2" sx={{ color: 'grey.500', mb: 3 }}>
        Log in to your Blog App account
      </Typography>

      <Notification />

      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Username"
              placeholder="Enter username"
              value={username.value}
              onChange={username.onChange}
              fullWidth
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              label="Password"
              placeholder="Enter password"
              value={password.value}
              onChange={password.onChange}
              type={password.type}
              fullWidth
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <Divider sx={{ my: 0.5 }} />

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, fontSize: '1rem', py: 1.2 }}
            >
              Log in
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Login