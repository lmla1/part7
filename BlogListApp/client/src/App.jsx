import { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Typography, Box } from '@mui/material'
import Blog from './components/Blog'
import User from './components/User'
import BlogList from './components/BlogList'
import UserList from './components/userList'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import ErrorBoundary from './components/ErrorBoundary'
import { useUser, useBlogActions } from './store'

const App = () => {
  const { initialize, initializeUser, initializeUsers, logout } = useBlogActions()
  const user = useUser()

  useEffect(() => {
    initialize()
    initializeUser()
    initializeUsers()
  }, [initialize, initializeUser, initializeUsers])

  const linkStyle = {
    '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
  }

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" component={Link} to="/" sx={linkStyle}>
              BLOGS
            </Button>

            <Button color="inherit" component={Link} to="/users" sx={linkStyle}>
              USERS
            </Button>

            {user && (
              <Button color="inherit" component={Link} to="/create" sx={linkStyle}>
                NEW BLOG
              </Button>
            )}

            {user ? (
              <Button color="inherit" onClick={() => handleLogout()} sx={linkStyle}>
                LOGOUT
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login" sx={linkStyle}>
                LOGIN
              </Button>
            )}
          </Box>

        </Toolbar>
      </AppBar>

      <Notification />
      <ErrorBoundary>
        <Routes>
          <Route path="/blogs/:id" element={ <Blog /> } />
          <Route path="/users/:id" element={ <User /> } />
          <Route path="/" element={ <BlogList /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/create" element={ <BlogForm /> } />
          <Route path="/users" element={ <UserList /> }/>
          <Route path="/*" element={<div><h1>404 - Page not found</h1></div>} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App