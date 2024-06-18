import React from 'react'
import SignUp from '../../components/signUp/SignUp'
import SignIn from '../../components/signIn/SignIn'
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
