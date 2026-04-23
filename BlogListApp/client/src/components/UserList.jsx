import { Link } from 'react-router-dom'
import { useUsers } from '../store'
import {
  Box, Typography, Avatar, Card, Chip,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow
} from '@mui/material'

const UserList = () => {
  const users = useUsers()

  return (
    <Box sx={{ mt: 4, maxWidth: 680, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.5px', color: 'grey.900', mb: 3 }}>
        👥 Users
      </Typography>

      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 700, color: 'grey.600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'grey.600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1 }}>Username</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'grey.600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1 }}>Blogs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...users]
                .sort((a, b) => b.blogs.length - a.blogs.length)
                .map(user => (
                  <TableRow key={user.id} sx={{ '&:hover': { bgcolor: 'grey.50' }, transition: 'background 0.15s' }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', bgcolor: 'primary.light' }}>
                          {user.name[0].toUpperCase()}
                        </Avatar>
                        <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>
                          {user.name}
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: 'grey.500', fontFamily: 'monospace' }}>{user.username}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={user.blogs.length}
                        size="small"
                        sx={{ fontWeight: 700, bgcolor: user.blogs.length > 0 ? 'primary.50' : 'grey.100', color: user.blogs.length > 0 ? 'primary.main' : 'grey.400', minWidth: 36 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}

export default UserList