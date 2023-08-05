const request = require('supertest')
const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Template = require('../models/templateModel')

const loginCredentials = {
  email: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
}
app.use(express.json())

app.use((req, res, next) => {
  req.user = { id: process.env.USER_ID }
  next()
})

const templateController = require('../controllers/templateController')

app.get('/templates', templateController.getEmailTemplates)
app.get('/templates/:id', templateController.getEmailTemplate)
app.post('/templates', templateController.createEmailTemplate)
app.put('/templates/:id', templateController.updateEmailTemplate)
app.delete('/templates/:id', templateController.deleteEmailTemplate)

describe('Template Routes', () => {
  let token
  let userId
  let templateId

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    await User.deleteMany()
    await Template.deleteMany()

    const user = await User.create({
      name: 'Test User',
      email: loginCredentials.email,
      password: loginCredentials.password,
    })

    userId = user._id

    token = generateToken(userId)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  it('should create a new template', async () => {
    const templateData = {
      name: 'test template',
      subject: 'testiram',
      body: 'testiram',
      user: userId,
    }

    const response = await request(app)
      .post('/templates')
      .set('Authorization', `Bearer ${token}`)
      .send(templateData)
      .expect(200)

    expect(response.body).toHaveProperty('_id')
    expect(response.body.name).toBe(templateData.name)
    expect(response.body.subject).toBe(templateData.subject)
    expect(response.body.body).toBe(templateData.body)

    templateId = response.body._id
  })

  it('should get a template by ID', async () => {
    const response = await request(app)
      .get(`/templates/${templateId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(response.body).toHaveProperty('_id')
    expect(response.body._id).toBe(templateId)
  })

  it('should update a template', async () => {
    const updatedTemplateData = {
      name: 'updated template',
      subject: 'updated subject',
      body: 'updated body',
    }

    const response = await request(app)
      .put(`/templates/${templateId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedTemplateData)
      .expect(200)

    expect(response.body).toHaveProperty('_id')
    expect(response.body._id).toBe(templateId)
    expect(response.body.name).toBe(updatedTemplateData.name)
    expect(response.body.subject).toBe(updatedTemplateData.subject)
    expect(response.body.body).toBe(updatedTemplateData.body)
  })

  it('should delete a template', async () => {
    await request(app)
      .delete(`/templates/${templateId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const deletedTemplate = await Template.findById(templateId)
    expect(deletedTemplate).toBeNull()
  })
})

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}
