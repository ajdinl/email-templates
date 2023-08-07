const API_URL = 'http://localhost:4200/api/templates'
const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWM3NTg3MDAwNTRkNmQxZTMzMTNkMiIsImlhdCI6MTY5MDc5MDA1NCwiZXhwIjoxNjkwODc2NDU0fQ.v1mHtZDY_Sj2BEh0ZPZHVrGCONiRc8jTmYZsIxjGe4M'

export const getAllTemplates = async () => {
  const response = await fetch(process.env.API_URL, { cache: 'no-store' })
  const templates = await response.json()
  if (response.status !== 200) throw Error(templates.message)
  return templates
}

export const addTemplate = async (template) => {
  const response = await fetch(API_URL, {
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
  const response = await fetch(`${API_URL}/${template._id}`, {
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
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
  const template = await response.json()
  if (response.status !== 200) throw Error(template.message)
  return template
}
