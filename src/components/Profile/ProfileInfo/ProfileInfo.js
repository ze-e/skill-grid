import React from 'react'
import PropTypes from 'prop-types'

export default function ProfileInfo ({ data }) {
  function formattedDate (rawDate) {
    const date = new Date(rawDate)
    return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
  }

  function profiledata () {
    const exclude = ['img', 'level', 'xp', 'gold', 'description']
    return Object.entries(data)
      .map(i => { return { key: i[0], value: i[1] } })
      .filter(i => !exclude.includes(i.key))
      .map(j => <li className='profileInfo__listItem' key={j.key}><em>{j.key[0].toUpperCase() + j.key.substring(1)}</em> : {j.key === 'birthday' ? formattedDate(j.value) : j.value}</li>)
  }

  return (
    <div className='profileInfo'>
      <div className='m-flex profileInfo__intro'>
        <div>
          <h2 className='profileInfo__title'>{`${data.name} ${data.epiphet}`}</h2>
          <h3 className='profileInfo__subtitle'>{`(Lv. ${data.level} ${data.type} ${data.job})`}</h3>
        </div>
      </div>
      <div className="profileInfo__data m-flex">
        <ul className='profileInfo__list'>
          {profiledata()}
        </ul>
        <p className="profileInfo__listItem profileInfo__description"><em>Description:  </em>{data.description}</p>
      </div>
    </div>
  )
}

ProfileInfo.propTypes = {
  data: PropTypes.object
}
