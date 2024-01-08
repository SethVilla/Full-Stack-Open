import {Blog} from "../../models/blog.js";

export const getAllBlogs = async () => {
    try {
        return await Blog.find({})
    } catch (error) {
        throw error
    }
}

export const getBlogById = async (id) => {
    try {
        return await Blog.findById(id)
    } catch (error) {
        throw error
    }
}

export const saveBlog = async (newBlog) => {
    const blog = new Blog(newBlog)
    try {
        return await blog.save()
    } catch (error) {
        throw error;
    }
}

export const deleteBlog = async (id) => {
    try {
        return await Blog.findByIdAndDelete(id, { returnDocument: 'before' })
    } catch (error) {
        throw error
    }
}

export const updateBlog = async (id, blog) => {
    try {
        return await Blog.findByIdAndUpdate(id, blog, { new: true })
    } catch (error) {
        throw error
    }
}
