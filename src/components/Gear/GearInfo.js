import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { DataContext } from '../../contexts/DataContext'

import { getGearData } from '../../utils/avatar'

export default function GearInfo () {
  const { user } = useContext(UserContext)
  const { state } = useContext(DataContext)

  function equippedData () {
    return Object.entries(user.gear)
      .map(i => { return { key: i[0], value: i[1] } })
      .map(j => <li className='profileInfo__listItem' key={j.key}><em>{j.key[0].toUpperCase() + j.key.substring(1)}</em> : { getGearData(state.itemData, j.value)?.name }</li>)
  }

  return (
    <div className='profileInfo'>
      <div className='m-flex profileInfo__intro'>
        <div>
          <h2 className='profileInfo__title'>Equipped</h2>
        </div>
      </div>
      <div className='profileInfo__data m-flex'>
        <ul className='profileInfo__list'>
          {equippedData()}
        </ul>
      </div>
    </div>
  )
}
