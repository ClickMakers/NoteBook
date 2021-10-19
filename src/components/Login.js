import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: '', password: ''})

    let history = useHistory();

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})

    }


const handleSubmit = async (e) => {

        e.preventDefault();
        fetch("")
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email , password: credentials.password}) 
        }); 

        const Json = await response.json(); 
            console.log(Json);
            if(Json.success) {
                //save the user to the database
                localStorage.setItem('token', Json.authtoken);
                history.push("/");
                props.showAlert("Login Successfully", "success");

            }else{
                props.showAlert("Invalid Credentials", "danger");
            }

}

    return (
        <div className="my-3">
<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" onChange={onChange}  value={credentials.email} name="email"  aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name="password"/>
  </div>
 
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
        </div>
    )
}

export default Login
