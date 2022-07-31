import React, { useReducer } from 'react'
import SkillColumn from './SkillColumn'

import { DataContext } from '../contexts/DataContext'
import DataReducer, { initialState, ACTIONS } from '../reducers/DataReducer'

function App () {
  // add newItem to parent and add new item
  // item.descendants.push(newItem.id)
  // const newVal = skills.map(skill => skill.id === item.id ? item : skill)

  // add item to end of column
  // const columnSkills = newVal.filter(skill => skill.column === item.column)
  // newItem.position = columnSkills.length + 1
  // columnSkills.push(newItem)
  // const nonColumnSkills = newVal.filter(skill => skill.column !== item.column)

  // create new item list
  // const sortFunc = (a, b) => {
  //   if (a.parents.length > 0 && b.parents.length > 0) {
  //     const parent = ('' + a.parents[0].position).localeCompare(b.parents[0].position)
  //     if (parent !== 0) {
  //       return parent
  //     }
  //     return a.parents[0].position - b.parents[0].position
  //   }
  // }
  // setSkills([...nonColumnSkills, ...columnSkills].sort((a, b) => sortFunc))

  // function sortChildren () {
  //   const dict = { null: [] };
  //   [...columnSkills, ...nonColumnSkills].forEach((item) => {
  //     if (!item.parents.length > 0) {
  //       dict.null.push(item)
  //     } else {
  //       if (Object.keys(dict).includes(item.parents[0])) dict[item.parents[0]].push(item)
  //       else dict[item.parents[0]] = [item]
  //     }
  //   })
  //   return [Object.keys(dict).map(key => dict[key].sort((a, b) => a.position - b.position))]
  // }
  // setSkills([sortChildren()])

  // if column does not exist, add new column to column list
  // if (!columns.map(c => c.id).includes(newItem.column)) setColumns([...columns, { id: newItem.column, color: generateColor() }])
  // }

  const [state, dispatch] = useReducer(DataReducer, initialState)

  return (
      <DataContext.Provider value={{ state, dispatch, ACTIONS }}>
        { <div className='main'>
            {state?.data.length > 0 && state.data.map(column => {
              return <SkillColumn
                key={column.id}
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
