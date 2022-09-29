import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { DataContext } from '../../contexts/DataContext'

export default function GearStore () {
  const { state } = useContext(DataContext)
  const { user } = useContext(UserContext)

  return (
    <ul>
      {state.itemData.map(item => <li key={item.id}>{item.name} {user.inventory.includes(item.id) && <em>{' '} -- {' '}owned</em> }</li>)}
    </ul>
  )
}
