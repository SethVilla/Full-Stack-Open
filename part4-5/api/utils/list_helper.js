export const dummy = (blogs) => {
    return 1
}

export const totalLikes = (blogList) => {
    return blogList.reduce((count, current) => {
        return count + current.likes
    }, 0)
}

export const favoriteBlog = (blogList) => {
    return blogList.reduce((favoriteBlog, current) => {
        if (!favoriteBlog) {
            return current
        }

        return current.likes > favoriteBlog.likes ? current : favoriteBlog
    }, null)
}

export const mostBlogs = (blogList) => {

    if (blogList.length === 0) {
        return null
    }

    const authorBlogCountMap = blogList.reduce((authorBlogCounts, blog) => {
        // authorBlogCounts[blog.author] = authorBlogCounts[blog.author] ? ++authorBlogCounts[blog.author] : 1
        authorBlogCounts[blog.author] = (authorBlogCounts[blog.author] || 0 ) + 1
        return authorBlogCounts
    }, {})

    const authorEntry = Object.entries(authorBlogCountMap).reduce(([maxAuthor, currentMax], [author, count]) => {
        return count > currentMax ? [author, count] : [maxAuthor, currentMax]
    })

    return {author: authorEntry[0], blogs: authorEntry[1]}

}

export const mostLikes = (blogList) => {

    if (blogList.length === 0) {
        return null
    }

    const authorTotalLikesMap = blogList.reduce((authorTotalLikes, blog) => {
        // authorTotalLikes[blog.author] = authorTotalLikes[blog.author] ? authorTotalLikes[blog.author] + blog.likes : blog.likes
        authorTotalLikes[blog.author] = (authorTotalLikes[blog.author] || 0) + blog.likes;
        return authorTotalLikes
    }, {})

    const authorEntry = Object.entries(authorTotalLikesMap).reduce(([maxAuthor, currentMax], [author, count]) => {
        return count > currentMax ? [author, count] : [maxAuthor, currentMax]
    })

    return {author: authorEntry[0], likes: authorEntry[1]}
}