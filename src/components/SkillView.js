// import React, { useReducer } from 'react'
import React from 'react'

// import LevelColumn from './LevelColumn'
import SkillList from './SkillList/SkillList'

// import DataReducer, { initialState } from '../reducers/DataReducer'

function SkillView () {
  // const [state] = useReducer(DataReducer, initialState)

  return (
        <>
          {/* <section className='skillView__tree'>
          {state?.data.length > 0 && state.data.map(column => {
            return <LevelColumn
              key={column.key}
              id={column.id}
              color={column.color}
              levels={column.contents}
            />
          })}
          </section> */}
          <SkillList/>
        </>
  )
}

export default SkillView
