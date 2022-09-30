import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { DataContext } from '../../contexts/DataContext'
import { canBuyItem } from '../../utils/item'

export default function GearStore () {
  const { state, dispatch, ACTIONS } = useContext(DataContext)
  const { user } = useContext(UserContext)

  async function buyItem (item) {
    if (canBuyItem(item, user.data.gold)) await dispatch({ type: ACTIONS.BUY_ITEM, payload: { userName: user.admin.userName, item } })
    else alert('Not enough gold to buy!')
  }
  return (
    <>
    <h3>Gold: ${user.data.gold}</h3>
    <ul>
      {state.itemData.map(item => <li key={item.id}><em>${item.cost}</em>{' '}{item.name} {user.inventory.includes(item.id) && <em>{' '} -- {' '}owned</em> }{' '}<button type="button" onClick={() => buyItem(item)}>Buy</button></li>)}
    </ul>
  </>
  )
}
