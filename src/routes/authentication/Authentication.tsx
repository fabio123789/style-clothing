import React from 'react'
import SignUp from '../../components/signUp/SignUp.tsx'
import SignIn from '../../components/signIn/SignIn.tsx'
import './Authentication.scss'

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignIn />
      <SignUp />
    </div>
  )
}

export default Authentication
