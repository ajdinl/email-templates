'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const { email, password } = formData

  const router = useRouter()

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (res.error) {
        setError('Invalid email or password')
      } else {
        router.push('/')
      }
    } catch (error) {
      setError(error)
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
              name='email'
              placeholder='Enter Email'
              className='app-login__form-group__form-control'
              required
              minLength='5'
              onChange={onChange}
            />
          </div>
          <div className='app-login__form-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              name='password'
              placeholder='Enter Password'
              className='app-login__form-group__form-control'
              autoComplete='off'
              required
              minLength='3'
              onChange={onChange}
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
