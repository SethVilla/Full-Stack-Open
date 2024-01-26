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
import {blogsInDb, generateUser, nonExistingBlogId} from "./blog_test_helper.js";
import {User} from "../../models/users.js";
import {login} from "../../services/auth/auth.js";

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    const user = await generateUser()
    const blogs = mock_initial_blogs.map(blog => {
        blog.user = user._id
        return new Blog(blog)
    })
    await Promise.all(blogs.map(blog => blog.save()))
})

describe("blog api tests", () => {
    describe("blog get tests", () => {
        test('blogs are returned as json', async () => {
            const {token} = await login({
                username: "Test",
                password: "Test"
            })
            await api
                .get('/api/blog')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test("verify unique id verifier exists", async () => {
            const initialBlogs = await blogsInDb()
            const blogToView = initialBlogs[0]
            const {token} = await login({
                username: "Test",
                password: "Test"
            })

            const resultBlog = await api
                .get(`/api/blog/${blogToView.id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            expect(resultBlog.body.id).toBeDefined()
        })

        test('all blog posts are returned', async () => {
            const {token} = await login({
                username: "Test",
                password: "Test"
            })
            const response = await api.get('/api/blog')
                .set('Authorization', `Bearer ${token}`)

            expect(response.body).toHaveLength(mock_initial_blogs.length)
        })

        test('a specific blog can be viewed', async () => {
            const {token} = await login({
                username: "Test",
                password: "Test"
            })

            const initialBlogs = await blogsInDb()
            const blogToView = initialBlogs[0]

            const resultBlog = await api
                .get(`/api/blog/${blogToView.id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            expect({...resultBlog.body, user: resultBlog.body.user.toString().toString()}).toEqual({...blogToView, user: blogToView.user.toString() })
        })

        test('specific blog is within the returned blogs', async () => {
            const {token} = await login({
                username: "Test",
                password: "Test"
            })
            const response = await api.get('/api/blog')
                .set('Authorization', `Bearer ${token}`)

            const contents = response.body.map(r => r.title)
            expect(contents).toContain(
                'OTWS updated'
            )
        })

        test('fails with statuscode 404 if blog does not exist', async () => {
            const {token} = await login({
                username: "Test",
                password: "Test"
            })

            const validNonExistingId = await nonExistingBlogId()

            await api
                .get(`/api/blog/${validNonExistingId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404)
        })

        test('fails with statuscode 400 if id is invalid', async () => {
            const {token} = await login({
                username: "Test",
                password: "Test"
            })
            const invalidId = '5a3d5da59070081a82a3445'

            await api
                .get(`/api/blog/${invalidId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(400)
        })
    })

    describe("blog post tests", () => {
        test('a valid blog can be added', async () => {
            const {token} = await login({
                username: "Test",
                password: "Test"
            })
            const res = await api
                .post('/api/blog')
                .set('Authorization', `Bearer ${token}`)
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
            const {token} = await login({
                username: "Test",
                password: "Test"
            })
            await api
                .post('/api/blog')
                .set('Authorization', `Bearer ${token}`)
                .send({blog: mock_blog_missing_title})
                .expect(400)

            const response = await blogsInDb()

            expect(response).toHaveLength(mock_initial_blogs.length)
        })

        test('blog without likes is added with 0 likes', async () => {
            const {token} = await login({
                username: "Test",
                password: "Test"
            })

            const res = await api
                .post('/api/blog')
                .set('Authorization', `Bearer ${token}`)
                .send({blog: mock_blog_missing_likes})
                .expect(201)

            const response = await blogsInDb()

            expect(response).toHaveLength(mock_initial_blogs.length + 1)
            expect(res.body.likes).toEqual(0)
        })
    })


    describe("blog delete tests", () => {
        test('a blog can be deleted', async () => {
            const {token} = await login({
                username: "Test",
                password: "Test"
            })

            const initialBlogs = await blogsInDb()
            const blogToDelete = initialBlogs[0]

            await api
                .delete(`/api/blog/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)

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
            const {token} = await login({
                username: "Test",
                password: "Test"
            })

            const initialBlogs = await blogsInDb()
            const blogToUpdate = initialBlogs[0]

           const res = await api
                .patch(`/api/blog/${blogToUpdate.id}`)
               .set('Authorization', `Bearer ${token}`)
               .send({blog: {...blogToUpdate, likes: 99}})
                .expect(200)

            expect(res.body.likes).toEqual(99)
        })
    })
})

afterAll(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    await mongoose.connection.close()
})
