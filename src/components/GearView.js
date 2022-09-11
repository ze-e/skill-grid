import React, { useContext } from 'react'
import Avatar from './Avatar/Avatar'

import GearNav from './Gear/GearNav'
import GearInventory from './Gear/GearInventory'
// import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'

import GearInfo from './Gear/GearInfo'
// import { Route } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

export default function GearView () {
  const { user } = useContext(UserContext)

  return (
    <div className='gearView'>
      <div className='gearView__top'>
        {user.data && <div className='gearView__img'><Avatar avatar={user.avatar} gear={user.gear} edit={true} /></div>}
        <div className='gearView__info'>
        {user.data && <div className='gearView__info'><GearInfo data={ user.data } /></div>}
        </div>
      </div>
      <GearNav />
      <GearInventory/>
      {/* <Route path="/inventory" element={<ProtectedRoute Component={<GearInventory/>} />} /> */}
    </div>
  )
}
