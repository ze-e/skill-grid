import React, { useReducer } from 'react'
import LevelColumn from './LevelColumn'

import { DataContext } from '../contexts/DataContext'
import DataReducer, { initialState, ACTIONS } from '../reducers/DataReducer'

function App () {
  const [state, dispatch] = useReducer(DataReducer, initialState)

  return (
      <DataContext.Provider value={{ state, dispatch, ACTIONS }}>
        { <div className='main'>
            {state?.data.length > 0 && state.data.map(column => {
              return <LevelColumn
                key={column.id}
                id={column.id}
                color={column.color}
                levels={column.contents}
              />
            })}
        </div>
        }
      </DataContext.Provider>
  )
}

export default App
