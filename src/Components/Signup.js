import React,{useState} from 'react'
import { useNavigate } from "react-router";

const Signup = (props) => {
  const [cred, setCred] = useState({name:"",email:"",password:""})
  let navigate = useNavigate();
  const handleClick=async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",       
      },
  
      body: JSON.stringify({name:cred.name,email:cred.email,password:cred.password}),
    });
    const json =await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    if(json.success){
      localStorage.setItem('token',json.auth);
      props.showAlert("Your account created Successfully","success")
      navigate('/login')
    }
    else{
      props.showAlert("Invalid","danger");
    }
  }

  const onChange =(e)=>{
    setCred({...cred,[e.target.name]:e.target.value}) //[...notes]-initial value of notes be stay 
    // [e.target.name]:e.target.value -- add new value
}
  return (
    <div>
    <form onSubmit={handleClick}>
      <h1>Create an account</h1>
    <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" style={{width:'50%'}} onChange={onChange} className="form-control" name='name' id="name" aria-describedby="emailHelp"/>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" style={{width:'50%'}} onChange={onChange} className="form-control" name='email' id="email" aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" style={{width:'50%'}} onChange={onChange} className="form-control" id="password" minLength={4} required name='password'/>
      </div>
      
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" style={{width:'50%'}} onChange={onChange} className="form-control" id="cpassword" minLength={4} required name='cpassword'/>
      </div>

      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
    </div>
  )
}

export default Signup
