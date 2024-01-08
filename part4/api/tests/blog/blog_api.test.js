import mongoose from 'mongoose'
mongoose.set("bufferTimeoutMS", 30000)
import supertest from 'supertest'
import {app} from "../../app.js";
import {Blog} from "../../models/blog.js";
import {
    mock_blog_missing_likes,
    mock_blog_missing_title,
    mock_initial_blogs,
    mock_new_blog
} from "../../utils/mock_data.js";
import {blogsInDb, nonExistingBlogId} from "./blog_test_helper.js";

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = mock_initial_blogs.map(blog => new Blog(blog) )
    await Promise.all(blogs.map(blog => blog.save()))
})

describe("blog api tests", () => {
    describe("blog get tests", () => {

        test('blogs are returned as json', async () => {
            await api
                .get('/api/blog')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test("verify unique id verifier exists", async () => {
            const initialBlogs = await blogsInDb()

            const blogToView = initialBlogs[0]

            const resultBlog = await api
                .get(`/api/blog/${blogToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            expect(resultBlog.body.id).toBeDefined()
        })

        test('all blog posts are returned', async () => {
            const response = await api.get('/api/blog')
            expect(response.body).toHaveLength(mock_initial_blogs.length)
        })

        test('a specific blog can be viewed', async () => {
            const initialBlogs = await blogsInDb()

            const blogToView = initialBlogs[0]

            const resultBlog = await api
                .get(`/api/blog/${blogToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(resultBlog.body).toEqual(blogToView)
        })

        test('specific blog is within the returned blogs', async () => {
            const response = await api.get('/api/blog')
            const contents = response.body.map(r => r.title)
            expect(contents).toContain(
                'OTWS updated'
            )
        })

        test('fails with statuscode 404 if blog does not exist', async () => {
            const validNonExistingId = await nonExistingBlogId()

            await api
                .get(`/api/blog/${validNonExistingId}`)
                .expect(404)
        })

        test('fails with statuscode 400 if id is invalid', async () => {
            const invalidId = '5a3d5da59070081a82a3445'

            await api
                .get(`/api/blog/${invalidId}`)
                .expect(400)
        })
    })

    describe("blog post tests", () => {
        test('a valid blog can be added', async () => {
            const res = await api
                .post('/api/blog')
                .send({blog: mock_new_blog})
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const response = await blogsInDb()

            expect(response).toHaveLength(mock_initial_blogs.length + 1)
            expect(res.body).toMatchObject(
                mock_new_blog
            )
        })

        test('blog without title is not added', async () => {
            await api
                .post('/api/blog')
                .send({blog: mock_blog_missing_title})
                .expect(400)

            const response = await blogsInDb()

            expect(response).toHaveLength(mock_initial_blogs.length)
        })

        test('blog without likes is added with 0 likes', async () => {
            const res = await api
                .post('/api/blog')
                .send({blog: mock_blog_missing_likes})
                .expect(201)

            const response = await blogsInDb()

            expect(response).toHaveLength(mock_initial_blogs.length + 1)
            expect(res.body.likes).toEqual(0)
        })
    })


    describe("blog delete tests", () => {
        test('a blog can be deleted', async () => {
            const initialBlogs = await blogsInDb()
            const blogToDelete = initialBlogs[0]

            await api
                .delete(`/api/blog/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await blogsInDb()

            expect(blogsAtEnd).toHaveLength(
                initialBlogs.length - 1
            )

            const contents = blogsAtEnd.map(r => r.title)

            expect(contents).not.toContain(blogToDelete.title)
        })
    })

    describe("blog patch tests", () => {
        test('a blog can be partially updated', async () => {
            const initialBlogs = await blogsInDb()
            const blogToUpdate = initialBlogs[0]

           const res = await api
                .patch(`/api/blog/${blogToUpdate.id}`)
               .send({blog: {...blogToUpdate, likes: 99}})
                .expect(200)

            expect(res.body.likes).toEqual(99)
        })
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
