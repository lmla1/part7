const blog = require('../models/blog')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, order) => sum + order.likes, 0)
  return total
}

const noLikes = (blogs) => {
  const blogsWithNoLikes = blogs.filter(b => b.likes === 0)
  return blogsWithNoLikes.length
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(b => b.likes)
  const idx = likes.indexOf(Math.max(...likes))
  return blogs[idx]
}

const mostBlogs = (_blogs) => {
  const res = _blogs.map(b => b.author)
    .reduce((sum, author) => {
      sum[author] = (sum[author] || 0) + 1
      return sum
    }, {})

  const [author, blogs] = Object.entries(res)
    .reduce((author1, author2) => author2[1] > author1[1] ? author2 : author1)

  return { author, blogs }
}

const mostLikes = (_blogs) => {
  const res = _blogs.reduce((sum, blog) => {
    sum[blog.author] = (sum[blog.author] || 0) + blog.likes
    return sum
  }, {})

  const [author, likes] = Object.entries(res)
    .reduce((author1, author2) => author2[1] > author1[1] ? author2 : author1)

  return { author, likes }
}

module.exports = {
  dummy,
  totalLikes,
  noLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}