import React, { useContext } from 'react'
import { DataContext } from '../../contexts/DataContext'
import SkillListLevel from './SkillListLevel'
// import { debug } from '../../utils/debug'
export default function SkillList () {
  const { state } = useContext(DataContext)
  const levels = state.data.levels

  return (
    <div className='skillList'>
      {levels.length > 0 && levels.map((level, index) => {
        return <SkillListLevel
          key={level.id}
          index={index}
          level={level}
        />
      })}
    </div>
  )
}
