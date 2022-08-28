import React from 'react'
import PropTypes from 'prop-types'

export default function ProfileInfo ({ data }) {
  return (
    <div className='profileInfo'>
      <div className='m-flex'>
        <div>
          <h2 className='profileInfo__title'>{`${data.name} ${data.epiphet}`}</h2>
          <h3 className='profileInfo__subtitle'>{`(Lv. ${data.level} ${data.type} ${data.job})`}</h3>
        </div>
        <div>
          <button className='m-button' type="button">Edit Profile</button>
        </div>
      </div>
      <div className="profileInfo__data">
        <ul className='profileInfo__list'>
          <li className='profileInfo__listItem'>{data.name}</li>
          <li className='profileInfo__listItem'>{data.epiphet}</li>
          <li className='profileInfo__listItem'>{data.type}</li>
          <li className='profileInfo__listItem'>{data.job}</li>
          <li className='profileInfo__listItem'>{data.hometown}</li>
          <li className='profileInfo__listItem'>{data.birthday}</li>
          <li className='profileInfo__listItem'>{data.color}</li>
          <li className='profileInfo__listItem'>{data.food}</li>
        </ul>
        <p className="profileInfo__listItem profileInfo__description">{data.description}</p>
      </div>
    </div>
  )
}

ProfileInfo.propTypes = {
  data: PropTypes.object
}
