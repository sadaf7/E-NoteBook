import React from 'react'
import Note from './Note'

const Home = (props) => {

  const {showAlert} = props;
  return (
  <div className='container text-white' >
    <div className="card" style={{backgroundColor:"#5e5c55"}}>
  <div className="card-header bg-dark text-white">
    <h3 className='container'>Add Your Note</h3>
  </div>
  <div className="card-body text-white">
    <h5 className="card-title container">Write Your Valuable Notes.</h5>
    <Note showAlert={showAlert}/>
  </div>
</div>
  </div>
  )
}

export default Home
