import express from 'express'
import {deleteBlog, getAllBlogs, getBlogById, saveBlog, updateBlog} from "../../services/blog/blog.js";
export const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res, next) => {
    try {
        res.json(await getAllBlogs())
    } catch (e) {
        return next(e)
    }
})

blogsRouter.get("/:id", async (req, res, next) => {
    try {
        const blog = await getBlogById(req.params.id)
        if (blog) {
            res.json(blog)
        } else {
            res.status(404).end()
        }
    } catch (error) {
        return next(error)
    }
})

blogsRouter.post('/', async (req, res, next) => {
    const {blog} = req.body
    try {
        res.json(await saveBlog(blog))
    } catch (e) {
        return next(e)
    }
})

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        res.status(204).json(await deleteBlog(req.params.id))
    } catch (error) {
        next(error)
    }
})

blogsRouter.patch('/:id', async (req, res, next) => {
    try {
        const {blog} = req.body
        res.json(await updateBlog(req.params.id, blog))
    } catch (error) {
        return next(error)
    }
})