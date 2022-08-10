import React, { useContext, useEffect, useRef } from 'react'
import { DataContext } from '../contexts/DataContext'

import SkillTreeColumn from './SkillTree/SkillTreeColumn'
import SkillList from './SkillList/SkillList'

// import { debug } from '../utils/debug'
import { getParentsWithId } from '../utils/quest'
import { drawLine } from '../utils/visualEffect'

function SkillView () {
  const { state } = useContext(DataContext)
  const levels = state.data.levels

  const skillTreeRef = useRef(null)

  useEffect(() => {
    const tree = skillTreeRef.current.querySelectorAll('.skillTreeColumn')
    const nodes = []
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
        if (parentNode) drawLine(parentNode.node, node, nodes[i].line)
      }
    })
  }, [skillTreeRef])

  return (
        <>
          <section className='skillView__tree' ref={skillTreeRef}>
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
