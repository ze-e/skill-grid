import React, { useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { UserContext } from '../contexts/UserContext'

import SkillTreeColumn from './SkillTree/SkillTreeColumn'
import SkillList from './SkillList/SkillList'

import { getParentsWithId } from '../utils/quest'
import { drawLine } from '../utils/visualEffect'

function SkillView () {
  const { state } = useContext(DataContext)
  const { user } = useContext(UserContext)

  const levels = state.data.levels

  const skillTreeRef = useRef(null)

  const [teacherView, setTeacherView] = useState(false)

  // creates the gridlines that connect nodes
  useEffect(() => {
    const tree = skillTreeRef.current.querySelectorAll('.skillTreeColumn')
    const nodes = []

    // delete old branches
    Array.from(tree).forEach((e, i) => {
      const lines = tree[i].querySelectorAll('.m-line')
      lines.forEach(line => {
        line.remove()
      })
    })

    // create new branches
    Array.from(tree).forEach((e, i) => {
      const nodeList = tree[i].querySelectorAll('.skillTreeNodeContainer')
      nodeList.forEach(n => {
        const line = document.createElement('div')
        line.classList.add('m-line')
        n.append(line)
        const id = n.getAttribute('data-id')
        nodes.push({ id, node: n, line })
      })
    })
    nodes.forEach((n, i) => {
      const node = nodes[i].node
      const parent = getParentsWithId(state.data.levels, nodes[i].id)
      if (parent?.length > 0) {
        const parentNode = nodes.find(n => n.id === parent[0].id)
        const line = nodes[i].line
        line.style.backgroundColor = parent[0].color
        if (parentNode) drawLine(parentNode.node, node, line)
      }
    })
  }, [state, user])

  return (
        <>
          <h2 className='skillView__title'>Skill Tree</h2>
          <section className='skillView__tree' ref={skillTreeRef}>
            {levels.length > 0 && levels.map(level => {
              return <SkillTreeColumn
                key={level.id}
                color={level.color}
                quests={level.quests}
              />
            })}
          </section>
      <h2 className='skillView__title'>Skill List</h2>
      {user.admin?.userType === 'teacher' && <button
        className="m-skillListButton button"
        type='button'
        onClick={() => { setTeacherView(!teacherView) }}
      >
        {teacherView ? 'Close Teacher View' : 'Teacher View'}
      </button>}
      <SkillList teacherView={teacherView} />
        </>
  )
}

export default SkillView
