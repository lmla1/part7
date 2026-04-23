import { create } from 'zustand'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import persistentUserService from './services/persistentUser'

const useBlogStore = create((set, get) => ({
  blogs: [],
  users: [],
  comments: [],
  user: null,
  notification: null,
  actions: {
    login: async ({ username, password }) => {
      const user = await loginService.login({ username, password })
      persistentUserService.saveUser(user)
      blogService.setToken(user.token)
      set({ user })
    },
    logout: () => {
      persistentUserService.removeUser()
      blogService.setToken(null)
      set({ user: null })
    },
    initializeUser: () => {
      const loggedUserJSON = persistentUserService.getUser()
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        set({ user })
      }
    },
    setNotification: message => set(() => ({ notification: message })),
    initialize: async () => {
      const blogs = await blogService.getAll()
      set(() => ({ blogs }))
    },
    initializeUsers: async () => {
      const users = await userService.getAll()
      set(() => ({ users }))
    },
    add: async (content) => {
      const newBlog = await blogService.create(content)
      set(state => ({ blogs: state.blogs.concat(newBlog) }))
    },
    deleteById: async (id) => {
      await blogService.remove(id)
      set(state => ({ blogs: state.blogs.filter(blog =>
        blog.id !== id) }))
    },
    incrementLikesById: async (id) => {
      const blog = get().blogs.find(b => b.id === id)
      set(state => ({ blogs: state.blogs.map(b =>
        b.id === id ? { ...b, likes: b.likes + 1 } : b
      ) }))

      try {
        await blogService.update(id, { ...blog, likes: blog.likes + 1 })
      } catch {
        set(state => ({ blogs: state.blogs.map(b =>
          b.id === id ? { ...b, likes: b.likes - 1 } : b
        ) }))
      }
    },
    addComment: async (blogId, comment) => {
      const updatedBlog = await blogService.addComment(blogId, comment)
      set(state => ({
        blogs: state.blogs.map(b => b.id === blogId ? updatedBlog : b)
      }))
    },

    fetchComments: async (blogId) => {
      const comments = await blogService.getComments(blogId)
      set(state => ({
        blogs: state.blogs.map(b => b.id === blogId ? { ...b, comments } : b)
      }))
    },
  },
}))

export const useUser = () => useBlogStore((state) => state.user)
export const useBlogs = () => useBlogStore((state) => state.blogs)
export const useUsers = () => useBlogStore((state) => state.users)
export const useBlogById = (id) => useBlogStore((state) =>
  state.blogs.find(blog => blog.id === id)
)
export const useUserById = (id) => useBlogStore((state) =>
  state.users.find(user => user.id === id)
)
export const useNotification = () => useBlogStore((state) => state.notification)
export const useBlogActions = () => useBlogStore((state) => state.actions)

export default useBlogStore
