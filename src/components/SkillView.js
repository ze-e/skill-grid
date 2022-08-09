import React, { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'

import SkillTreeColumn from './SkillTree/SkillTreeColumn'
import SkillList from './SkillList/SkillList'

function SkillView () {
  const { state } = useContext(DataContext)
  const levels = state.data.levels

  return (
        <>
          <section className='skillView__tree'>
            {levels.length > 0 && levels.map(level => {
              return <SkillTreeColumn
                key={level.id}
                color={level.color}
                quests={level.quests}
              />
            })}
          </section>
          <SkillList/>
        </>
  )
}

export default SkillView
