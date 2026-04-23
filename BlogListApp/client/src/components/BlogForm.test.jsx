import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const input1 = screen.getByLabelText('title:')
  const input2 = screen.getByLabelText('author:')
  const input3 = screen.getByLabelText('url:')
  const createButton = screen.getByText('create')

  await user.type(input1, 'test form title')
  await user.type(input2, 'test form author')
  await user.type(input3, 'test form url')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test form title')
  expect(createBlog.mock.calls[0][0].author).toBe('test form author')
  expect(createBlog.mock.calls[0][0].url).toBe('test form url')
})