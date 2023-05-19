import React from 'react'

const ProfileItem = (props) => {
    const {info} = props;
  return (
    <div>
      <b>Name: </b>{info.name}<br></br>
      <b>Email: </b> {info.email}
    </div>
  )
}

export default ProfileItem
