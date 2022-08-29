import React, { useContext } from 'react'

import { DataContext } from '../contexts/DataContext'

export default function UserListView () {
  const { state } = useContext(DataContext)

  // useEffect(() => {
  //   const debug = state?.userData.length > 0 && state.userData.map(item => item.data).map()
  //   // const debug = state?.userData.length > 0 && state.userData.map(item => item.data).map(value => value !== 'img' && value)
  //   console.log(JSON.stringify(debug, null, 2))
  // }, [state])

  return (
    <ul className='userListView'>
      <ul className='m-flex'>
        {state?.userData.length > 0 && Object.keys(state.userData[0].data).map(label => label !== 'img' && <li className='userListView__label' key={label} ><em>{label}</em></li>)}
      </ul>
      {state?.userData.length > 0 && state?.userData.map(userData => {
        return < ul className='m-flex' key={userData.name}>
          {Object.values(userData).map(value => {
            return value !== 'img' && <li className='userListView__value' key={value}>{value}</li>
          })}
        </ul>
      })}
    </ul>
  )
}
