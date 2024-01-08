import {Blog} from "../../models/blog.js";
import {mock_new_blog} from "../../utils/mock_data.js";

export const nonExistingBlogId = async () => {
    const blog = new Blog(mock_new_blog)
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

export const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}