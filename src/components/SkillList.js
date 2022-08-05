import React, { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import ListItem from './ListItem'

export default function SkillList () {
  const { state } = useContext(DataContext)
  return (
    <div className='skillList'>
      <h2 className='skillList__title'>Skill List</h2>
      {state?.data.length > 0 && state.data.map(level => {
        return <ListItem
          key={level.id}
          id={level.id}
          level={level}
          color={level.color}
        />
      })}
    </div>
  )
}
