import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Test Title',
  author: 'Test Author',
  likes: 2,
  url: 'TestUrl.com',
  user: { id: 'owner123', name: 'Owner User' }
}

const ownerUser = { userid: 'owner123', name: 'Owner User' }
const otherUser = { userid: 'other456', name: 'Other User' }

test('unauthenticated users see blog info and likes but no buttons', () => {
  render(<Blog blog={blog} />)

  expect(screen.getByText('Test Title', { exact: false })).toBeDefined()
  expect(screen.getByText('Test Author', { exact: false })).toBeDefined()
  expect(screen.getByText('2', { exact: false })).toBeDefined()
  expect(screen.getByText('TestUrl.com', { exact: false })).toBeDefined()

  expect(screen.queryByText('like')).toBeNull()
  expect(screen.queryByText('remove')).toBeNull()
})

test('authenticated non-owner sees only the like button', () => {
  render(<Blog blog={blog} user={otherUser} />)

  expect(screen.getByText('like')).toBeDefined()
  expect(screen.queryByText('remove')).toBeNull()
})

test('blog creator sees both like and remove buttons', () => {
  render(<Blog blog={blog} user={ownerUser} />)

  expect(screen.getByText('like')).toBeDefined()
  expect(screen.getByText('remove')).toBeDefined()
})

test('clicking the like button calls updateBlog twice', async () => {
  const mockUpdate = vi.fn()

  render(<Blog blog={blog} user={otherUser} updateBlog={mockUpdate} />)

  const userAction = userEvent.setup()
  const likeButton = screen.getByText('like')
  await userAction.click(likeButton)
  await userAction.click(likeButton)

  expect(mockUpdate).toHaveBeenCalledTimes(2)
})

/*test('renders content', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    likes: 2,
    url: 'TestUrl.com'
  }

  render(<Blog blog={blog} />)

  const element1 = screen.getByText('Test Title', { exact: false })
  const element2 = screen.getByText('Test Author', { exact: false })
  const element3 = screen.queryByText(2)
  const element4 = screen.queryByText('TestUrl.com')
  expect(element1).toBeDefined()
  expect(element2).toBeDefined()
  expect(element3).toBeNull()
  expect(element4).toBeNull()
})

test('renders content when the view button is cliked', async () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    likes: 2,
    url: 'TestUrl.com'
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element1 = screen.getByText('Test Title', { exact: false })
  const element2 = screen.getByText('Test Author', { exact: false })
  const element3 = screen.getByText(2, { exact: false })
  const element4 = screen.getByText('TestUrl.com', { exact: false })
  expect(element1).toBeDefined()
  expect(element2).toBeDefined()
  expect(element3).toBeDefined()
  expect(element4).toBeDefined()
})

test('clicking the like button calls updateBlog twice', async () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    likes: 2,
    url: 'TestUrl.com'
  }

  const mockUpdate = vi.fn()

  render(
    <Blog blog={blog} updateBlog={mockUpdate} />
  )

  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockUpdate).toHaveBeenCalledTimes(2)
})*/

