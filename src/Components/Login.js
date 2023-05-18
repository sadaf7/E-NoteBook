import React,{useState} from 'react'
import { useNavigate } from "react-router";

const Login = (props) => {
  const [cred, setCred] = useState({email:"",password:""})
  let navigate = useNavigate();
  
  const handleAdd =async (e)=>{
    
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/auth/loginUser", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },    
      body: JSON.stringify({email:cred.email,password:cred.password}), // body data type must match "Content-Type" header

    });
    const json =await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    if(json.success){
      localStorage.setItem("token",json.auth);
      props.showAlert("Successfully loggedin","success")
      navigate('/');
    }
    else{
      props.showAlert("Invalid Password or Email","danger")
    }
  }
  
  const onChange =(e)=>{
    setCred({...cred,[e.target.name]:e.target.value}) //[...notes]-initial value of notes be stay 
    // [e.target.name]:e.target.value -- add new value
}
  return (
    <div>
      <form onSubmit={handleAdd}>
        <h1>Login to continue</h1>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" style={{width:'50%'}} value={cred.email} onChange={onChange} className="form-control" id="email" name='email' aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" style={{width:'50%'}} value={cred.password} onChange={onChange} className="form-control" id="password" name='password'/>
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
    </div>
  )
}

export default Login
