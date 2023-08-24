export const getAllTemplates = async (token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/templates/`,
    {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const templates = await response.json()
  if (response.status !== 200) throw Error(templates.message)
  return templates
}

export const addTemplate = async (template, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/templates`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(template),
    }
  )
  const newTemplate = await response.json()
  if (response.status !== 200) throw Error(newTemplate.message)
  return newTemplate
}

export const editTemplate = async (template, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/templates/${template._id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(template),
    }
  )
  const updatedTemplate = await response.json()
  if (response.status !== 200) throw Error(updatedTemplate.message)
  return updatedTemplate
}

export const deleteTemplate = async (id, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/templates/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const template = await response.json()
  if (response.status !== 200) throw Error(template.message)
  return template
}

export const loginUser = async (user) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/users/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }
  )
  const loggedInUser = await response.json()
  if (response.status !== 200) throw Error(loggedInUser.message)
  return loggedInUser
}

export const registerUser = async (user) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/users`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }
  )
  const newUser = await response.json()
  if (response.status !== 200) throw Error(newUser.message)
  return newUser
}
