import {Blog} from "../../models/blog.js";
import {User} from "../../models/users.js";
import {CustomError} from "../../utils/CustomError.js";

export const getAllBlogs = async () => {
    return Blog.find({}).populate('user', { username: 1, name: 1 }).sort({ likes: -1 })
}

export const getBlogById = async (id) => {
    return Blog.findById(id)
}

/*
    To do update blog to support user and blogs + tests
 */
export const saveBlog = async (id, newBlog) => {
    const user = await User.findById(id)
    const blog = new Blog(
        {...newBlog, user: id}
    )

    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    return blog.save()
}

export const deleteBlog = async (id, userId) => {
    const blog = await Blog.findById(id).populate('user', {id: 1})

    if (!blog) {
        throw new CustomError("BlogForDeletionNotFound", "blog for deletion not found")
    }

    if (userId === blog.user.id.toString()) {
        return Blog.findByIdAndDelete(id)
    }
    throw new CustomError("DeletionRefused", "Not authorized to delete blog")
}

export const updateBlog = async (id, blog) => {
    return Blog.findByIdAndUpdate(id, {
        $set: blog
    }, { new: true })
}
