const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, current) => (accumulator += current.likes), 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, current) => {
    return (current.likes > max.likes) ? current : max
  }, blogs[0]
  )
}

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, 'author')
  const maxKey = _.maxBy(_.keys(counts), (key) => counts[key])
  return {
    author: maxKey,
    blogs: counts[maxKey]
  }
}

const mostLikes = (blogs) => {
  // group by author
  const groupedAuthors = _.groupBy(blogs, 'author')
  // sum of 'likes' field for every segment
  const sumLikes = _.map(groupedAuthors, (blogs, author) => (
    {
      author,
      likes: _.sumBy(blogs, 'likes')
    }
  ))
  return _.maxBy(sumLikes, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
