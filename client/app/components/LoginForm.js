'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    // Implement your login logic here
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  return (
    <>
      <div className='app-login'>
        <h1 className='app-login__title'>Please Login</h1>
        <form onSubmit={handleLogin}>
          <div className='app-login__form-group'>
            <label htmlFor='identification'>Email</label>
            <input
              id='identification'
              type='email'
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
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder='Enter Password'
              className='app-login__form-group__form-control'
              autoComplete='off'
              required
              minLength='3'
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              {showPassword ? 'Hide Password' : 'Show Password'}
              <input type='checkbox' onClick={togglePasswordVisibility} />
            </div>
          </div>
          <button type='submit' className='app-login__btn'>
            Log in
          </button>
        </form>
        <Link href='user/new' className='app-login__btn-secondary'>
          Create new Account
        </Link>
        {error && <div className='app-login__error'>{error}</div>}
      </div>
    </>
  )
}
