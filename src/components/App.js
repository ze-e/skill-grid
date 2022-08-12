import React, { useReducer } from 'react'

import { DataContext } from '../contexts/DataContext'
import DataReducer, { initialState, ACTIONS } from '../reducers/DataReducer'
import SkillView from './SkillView'
import Modal from './Modal/ModalContainer'

function App () {
  const [state, dispatch] = useReducer(DataReducer, initialState)

  return (
      <DataContext.Provider value={{ state, dispatch, ACTIONS }}>
        <div className='main'>
          <SkillView />
          <Modal />
        </div>
      </DataContext.Provider>
  )
}

export default App
