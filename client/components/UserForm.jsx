'use client'

import { useState } from 'react'
import { registerUser } from '../api'
import { useRouter } from 'next/navigation'

export default function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  const { name, email, password } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const createUser = async (e) => {
    e.preventDefault()

    try {
      await registerUser({ name, email, password })
    } catch (error) {
      setErrorMessage('An error occurred')
    } finally {
      router.push('/login')
    }
  }

  const togglePassowrdVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='app-login'>
      <h1 className='app-login__title'>Create new account</h1>
      <form onSubmit={createUser}>
        <div className='app-login__form-group'>
          <label htmlFor='identification'>Name</label>
          <input
            id='identification'
            value={name}
            name='name'
            placeholder='Enter Name'
            className='app-login__form-group__form-control'
            required
            minLength='3'
            onChange={onChange}
          />
        </div>
        <div className='app-login__form-group'>
          <label htmlFor='identification'>Email</label>
          <input
            id='identification'
            value={email}
            name='email'
            placeholder='Enter Email'
            className='app-login__form-group__form-control'
            required
            minLength='5'
            onChange={onChange}
          />
        </div>
        <div className='app-login__form-group'>
          <label htmlFor='create-password'>Password</label>
          <input
            id='create-password'
            value={password}
            name='password'
            placeholder='Enter Password'
            className='app-login__form-group__form-control'
            autoComplete='off'
            type={showPassword ? 'text' : 'password'}
            required
            minLength='3'
            onChange={onChange}
          />
          <div>
            {showPassword ? 'Hide Password' : 'Show Password'}
            <input type='checkbox' onClick={togglePassowrdVisibility} />
          </div>
        </div>
        <button
          type='submit'
          role='button'
          className='app-login__btn-secondary'
        >
          Create Account
        </button>
      </form>
      {errorMessage && <div className='app-login__error'>{errorMessage}</div>}
    </div>
  )
}
