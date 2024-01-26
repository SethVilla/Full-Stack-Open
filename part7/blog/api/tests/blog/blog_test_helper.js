import {Blog} from "../../models/blog.js";
import {mock_new_blog} from "../../utils/mock_data.js";
import {createUser} from "../../services/user/user.js";
import {login} from "../../services/auth/auth.js";

export const nonExistingBlogId = async () => {
    const user = await login({
        username: "Test",
        password: "Test"
    })

    const blog = new Blog(mock_new_blog)
    blog.user = user.id.toString()
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

export const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

export const generateUser = async () => {
    return createUser({
        username: "Test",
        name: "Test",
        password: "Test"
    })
}