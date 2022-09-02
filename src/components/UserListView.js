import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { formattedDate } from '../utils/date'
export default function UserListView () {
  const { state } = useContext(DataContext)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const values = state?.userData.length > 0 && state.userData.map(item => Object.entries(item.data).map(keyVal => keyVal[0] !== 'img' && (keyVal[0] === 'birthday' ? formattedDate(keyVal[1]) : keyVal[1])))
    // values = state?.userData.length > 0 && state.userData.map(item => [...item, Object.entries(item.admin).map(keyVal => keyVal[0] === 'submitted' && keyVal[1])])
    setUsers(values)
  }, [state])

  return (
    <ul className='userListView'>
      <ul className='userListView__labelList'>
        {state?.userData.length > 0 && Object.keys(state.userData[0].data).map(label => label !== 'img' && <li className='userListView__label' key={label} ><em>{label}</em></li>)}
      </ul>
      {users.length > 0 && users.map(user => {
        return <ul key={user[0]} className='userListView__valueList'>
          {/* {user.map(field => { return <li className='userListView__value' key={field} >{ field === 'submitted' ? field[0] : field }</li> })} */}
          {user.map(field => { return <li className='userListView__value' key={field} >{ field }</li> })}
        </ul>
      })
      }
    </ul>
  )
}
