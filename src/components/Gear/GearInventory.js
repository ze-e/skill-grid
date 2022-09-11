import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { DataContext } from '../../contexts/DataContext'

import { getGearData } from '../../utils/avatar'

export default function GearInventory () {
  const { state } = useContext(DataContext)
  const { user } = useContext(UserContext)

  function inventoryData () {
    return user.inventory.map(item => { return { data: getGearData(state.itemData, item), equipped: Object.values(user.gear).includes(item) } })
  }
  return (
    <ul>
      {inventoryData().map(item => <li key={item.data.id}>{item.data.name} {item.equipped && <em>{' '} -- {' '}equipped</em> }</li>)}
    </ul>
  )
}
