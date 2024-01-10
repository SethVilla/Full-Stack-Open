import express from 'express'
import {deleteBlog, getAllBlogs, getBlogById, saveBlog, updateBlog} from "../../services/blog/blog.js";
export const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
    res.json(await getAllBlogs())
})

blogsRouter.get("/:id", async (req, res, next) => {
    const blog = await getBlogById(req.params.id)
    if (blog) {
        res.json(blog)
    } else {
        res.status(404).end()
    }
})

blogsRouter.post('/', async (req, res) => {
    const {blog} = req.body
    const id = req.user.id
    res.status(201).json(await saveBlog(id, blog))
})

blogsRouter.delete('/:id', async (req, res, next) => {
    res.status(200).json(await deleteBlog(req.params.id, req.user.id))
})

blogsRouter.patch('/:id', async (req, res, next) => {
    const {blog} = req.body
    res.json(await updateBlog(req.params.id, blog))
})