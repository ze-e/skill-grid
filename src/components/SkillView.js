import React, { useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { UserContext } from '../contexts/UserContext'

import SkillTreeColumn from './SkillTree/SkillTreeColumn'
import SkillList from './SkillList/SkillList'

import { getAllQuests, getParentsWithId } from '../utils/quest'
import { drawLine } from '../utils/visualEffect'

function SkillView () {
  const { state, dispatch, ACTIONS } = useContext(DataContext)
  const { user } = useContext(UserContext)

  const skillTreeRef = useRef(null)

  const [teacherView, setTeacherView] = useState(false)
  const [scrollX, setScrollX] = useState(0)

  function drawGridLines () {
    if (user.admin) {
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
          if (parentNode) drawLine(parentNode.node, node, line, scrollX)
        }
      })
    }
  }

  // creates the gridlines that connect nodes
  useEffect(() => {
    drawGridLines()
  }, [state, user])

  useEffect(() => {
    window.addEventListener('resize', drawGridLines, false)

    return () => {
      window.removeEventListener('resize', drawGridLines, false)
    }
  }, [])

  useEffect(() => {
    function handleScroll () {
      const pos = skillTreeRef.current.scrollLeft
      if (pos !== scrollX) {
        setScrollX(pos)
      }
    }
    skillTreeRef.current.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      skillTreeRef.current.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    drawGridLines()
  }, [scrollX])

  return (
    <>
      {user.admin.currentQuest && <h2 className='skillView__current'>Current Quest: {' '} {getAllQuests(state.data?.levels).find(q => q.id === user.admin.currentQuest).name}
      </h2>}
      {user.admin.submittedQuest ? <h2 className='skillView__current'>Submitted✔️</h2> : user.admin.currentQuest && <button type='button' onClick={() => { dispatch({ type: ACTIONS.SUBMIT_QUEST, payload: { userName: user.admin.userName, questId: user.admin.currentQuest } }) }}>Submit Quest</button>}
        <section className='skillView__tree' ref={skillTreeRef}>
            {state.data.levels.length > 0 && state.data.levels.map(level => {
              return <SkillTreeColumn
                key={level.id}
                color={level.color}
                quests={level.quests}
              />
            })}
        </section>
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
