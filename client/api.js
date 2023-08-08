const API_URL = 'http://localhost:4200'
const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWM3NTg3MDAwNTRkNmQxZTMzMTNkMiIsImlhdCI6MTY5MDc5MDA1NCwiZXhwIjoxNjkwODc2NDU0fQ.v1mHtZDY_Sj2BEh0ZPZHVrGCONiRc8jTmYZsIxjGe4M'

export const getAllTemplates = async () => {
  const response = await fetch(process.env.API_URL, { cache: 'no-store' })
  const templates = await response.json()
  if (response.status !== 200) throw Error(templates.message)
  return templates
}

export const addTemplate = async (template) => {
  const response = await fetch(`${API_URL}/api/templates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(template),
  })
  const newTemplate = await response.json()
  if (response.status !== 200) throw Error(newTemplate.message)
  return newTemplate
}

export const editTemplate = async (template) => {
  const response = await fetch(`${API_URL}/api/templates/${template._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(template),
  })
  const updatedTemplate = await response.json()
  if (response.status !== 200) throw Error(updatedTemplate.message)
  return updatedTemplate
}

export const deleteTemplate = async (id) => {
  const response = await fetch(`${API_URL}/api/templates/${id}`, {
    method: 'DELETE',
  })
  const template = await response.json()
  if (response.status !== 200) throw Error(template.message)
  return template
}

export const loginUser = async (user) => {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  const loggedInUser = await response.json()
  if (response.status !== 200) throw Error(loggedInUser.message)
  return loggedInUser
}

export const registerUser = async (user) => {
  const response = await fetch(`${API_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  const newUser = await response.json()
  if (response.status !== 200) throw Error(newUser.message)
  return newUser
}
