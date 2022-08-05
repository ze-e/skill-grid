import React, { useReducer } from 'react'

import { DataContext } from '../contexts/DataContext'
import DataReducer, { initialState, ACTIONS } from '../reducers/DataReducer'
import SkillView from './SkillView'

function App () {
  const [state, dispatch] = useReducer(DataReducer, initialState)

  return (
      <DataContext.Provider value={{ state, dispatch, ACTIONS }}>
        <div className='main'>
          <SkillView />
        </div>
      </DataContext.Provider>
  )
}

export default App
