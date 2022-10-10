import React, { useContext, useEffect } from 'react'
import { ModalLogin } from '../Modal/ModalTypes'
import { ModalContext } from '../../contexts/ModalContext'
import { UserContext } from '../../contexts/UserContext'
import { DataContext } from '../../contexts/DataContext'
import { useNavigate } from 'react-router-dom'

import MainNav from '../../components/MainNav/MainNav'

export default function Header () {
  const { setModalOpen, setModalContent } = useContext(ModalContext)
  const { user, setUser } = useContext(UserContext)
  const { state } = useContext(DataContext)
  const navigate = useNavigate()

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(savedUser)
      navigate('/profile')
    }
  }, [])

  function login (e) {
    const userInput = e.target[0]
    const passwordInput = e.target[1]
    const userVal = userInput.value
    const passwordVal = passwordInput.value
    const userData = state.userData.find(i => i.admin.userName.toLowerCase() === userVal.toLowerCase())
    if (userData && userData.admin.password === passwordVal) {
      setUser(userData)
      localStorage.setItem('user', userData)
      navigate('/profile')
    }
  }

  return (
    <div className='header'>
      <div className='header__signIn'>
        <a className='m-link' href='#'>
          <div className='m-logo'>Logo</div>
        </a>
        <nav className='header__nav'>
          <ul className='header__nav-links'>
            <li className='header__nav-link'>
              {!user.data
                ? <button
                  className='m-button'
                onClick={() => {
                  setModalOpen(true)
                  setModalContent(<ModalLogin handleSubmit= {(e) => { e.preventDefault(); login(e); setModalOpen(false) }} />)
                }}
              >Login</button>
                : <><p>{user.data.name}</p><button
                  className='m-button'
                onClick={() => {
                  setUser({})
                }}
              >Logout</button></>
            }
            </li>
          </ul>
          </nav>
        </div>
      <MainNav/>
    </div>
  )
}
