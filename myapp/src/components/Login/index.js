import { useState} from 'react'
import Cookies from "js-cookie"

import './index.css'

const Login = (props) => {
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    

    const [showErrorMessage,setOrHideErrorMessage] = useState(false)
    const userDetails = {
        username : "Nageena",
        password : "Nageena@123"
    }

    const onChangeUserName = (event) => {
        setUserName(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const onSubmitSuccess = () => {
        const {history} = props
        Cookies.set("user_details",JSON.stringify(userDetails),{expires: 30});
        history.replace("/")

    }

    const validateForm = (event) => {
        event.preventDefault()
        if (userName === "" || password === "" ) {
            setErrorMessage("Please enter both username and password")
            setOrHideErrorMessage(true)
        }
        

        else if(userName === userDetails.username && password === userDetails.password) {
            
            onSubmitSuccess();
            setOrHideErrorMessage(false)
        }
        else {
            setErrorMessage("Invalid user credentials")
            setOrHideErrorMessage(true)
        }
    }
    
    return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
        <div className="col-md-5 cont">
            <h2 className="my-3 text-center heading">Login</h2>
            <form className = "form-container" onSubmit = {validateForm}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text"  id="username" placeholder="Enter username" className = "form-control" value={userName} onChange={onChangeUserName}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"  id="password" placeholder="Enter password" className = "form-control" value={password} onChange={onChangePassword}/>
                </div>
                <button type="submit" className="btn btn-primary form-control my-4">Login</button>
            </form>
            {showErrorMessage && <p className='error-msg'>{`*${errorMessage}`}</p>}
        </div>
    </div>
    
)
    }

export default Login
