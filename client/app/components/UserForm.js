'use client'

import { useState } from 'react'

export default function UserForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const createUser = (e) => {
    e.preventDefault()
    // Implement create user logic here
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
            placeholder='Enter Name'
            className='app-login__form-group__form-control'
            required
            minLength='3'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='app-login__form-group'>
          <label htmlFor='identification'>Email</label>
          <input
            id='identification'
            value={email}
            placeholder='Enter Email'
            className='app-login__form-group__form-control'
            required
            minLength='5'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='app-login__form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='create-password'
            value={password}
            placeholder='Enter Password'
            className='app-login__form-group__form-control'
            autoComplete='off'
            type={showPassword ? 'text' : 'password'}
            required
            minLength='3'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            {showPassword ? 'Hide Password' : 'Show Password'}
            <input type='checkbox' onClick={togglePassowrdVisibility} />
          </div>
        </div>
        <button type='submit' className='app-login__btn-secondary'>
          Create
        </button>
      </form>
      {errorMessage && <div className='app-login__error'>{errorMessage}</div>}
    </div>
  )
}
