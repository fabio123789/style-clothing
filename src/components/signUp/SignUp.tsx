import React, { ChangeEvent, FormEvent, useState } from 'react'
import FormInput from '../formInput/FormInput.tsx'
import Button from '../button/Button.tsx'
import { SignuUpContainer } from './SignUpStyled.tsx'
import { useDispatch } from 'react-redux'
import { emailSignUpStart } from '../../store/user/userAction.ts'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields
  const dispatch = useDispatch()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { password, confirmPassword, email, displayName } = formFields
    if (password !== confirmPassword) {
      return alert('Passwords does not match')
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        email
      )
    ) {
      return alert('invalid Email')
    }
    dispatch(emailSignUpStart(email, password, displayName))
    setFormFields(defaultFormFields)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <SignuUpContainer>
      <h2>Dont have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          minLength={6}
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          minLength={6}
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignuUpContainer>
  )
}

export default SignUp
