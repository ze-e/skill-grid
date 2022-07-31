import React, { useReducer } from 'react'
import SkillColumn from './SkillColumn'

import { DataContext } from '../contexts/DataContext'
import DataReducer, { initialState, ACTIONS } from '../reducers/DataReducer'

function App () {
  const [state, dispatch] = useReducer(DataReducer, initialState)

  return (
      <DataContext.Provider value={{ state, dispatch, ACTIONS }}>
        { <div className='main'>
            {state?.data.length > 0 && state.data.map(column => {
              return <SkillColumn
                key={column.id}
                id={column.id}
                skills={column.contents}
              />
            })}
        </div>
        }
        <code>{JSON.stringify(state)}</code>
      </DataContext.Provider>
  )
}

export default App
