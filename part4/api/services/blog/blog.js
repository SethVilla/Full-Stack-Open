import {Blog} from "../../models/blog.js";

export const getAllBlogs = async () => {
    return Blog.find({})
}

export const getBlogById = async (id) => {
    return Blog.findById(id)
}

export const saveBlog = async (newBlog) => {
    const blog = new Blog(newBlog)
    return blog.save()
}

export const deleteBlog = async (id) => {
    return Blog.findByIdAndDelete(id, { returnDocument: 'before' })
}

export const updateBlog = async (id, blog) => {
    return Blog.findByIdAndUpdate(id, blog, { new: true })
}
