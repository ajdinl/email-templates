'use client'

import { useState } from 'react'
import Link from 'next/link'
import { loginUser } from '../api'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await loginUser({ email, password })

      router.push('/')
    } catch (error) {
      setError('Invalid email or password')
    }
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
          <button type='submit' role='button' className='app-login__btn'>
            Login
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
