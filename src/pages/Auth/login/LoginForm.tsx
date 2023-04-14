// imports
import { FormEvent, useEffect, useState } from 'react'

// context
import UseAuth from '@context/Auth/UseAuth'

// components
import ErrorAlert from '@components/_partials/ErrorAlert'

// style
import style from '../auth.module.scss'

const Form = () => {
  //Context
  const auth = UseAuth()
  //Form Inputs
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    auth?.login({ username, password })
  }

  useEffect(() => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input) => {
      input.addEventListener('change', () => {
        setErrorMsg('')
      })
    })
    return () => {}
  }, [])
  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className='mb-3 d-flex justify-content-center flex-column'>
        <label htmlFor='' className='d-block fw-light'>
          Username
        </label>
        <input
          type='text'
          name='username'
          id='userID'
          autoComplete='off'
          className='rounded'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
      </div>
      <div className='mb-4 d-flex justify-content-center flex-column'>
        <label htmlFor='' className='d-block fw-light'>
          Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          className='rounded'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </div>
      {errorMsg && <ErrorAlert msg={errorMsg} type={'danger'} />}

      <button className={style.buttonPrimary}>Entrar</button>
    </form>
  )
}

export default Form
