import { useUserById } from '../store'
import { useParams } from 'react-router-dom'

const User = () => {

  const { id } = useParams()
  const userByID = useUserById(id)

  if (!userByID) return null

  return (
    <div>
      <h2>{userByID.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {[...userByID.blogs]
          .map(blog => (
            <li key={blog.id}>
              {blog.title}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default User