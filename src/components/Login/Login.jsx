import React, { useContext, useRef, useState } from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../../firebse/firebase.config";

const auth = getAuth(app)

const Login = () => {

  const [success, setSuccess] = useState('');
   const [error, setError] = useState('');
    
    const {loginUser} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);
    const  from = location.state?.from?.pathname || "/";

    const emailRef = useRef();
   
    const handleLogin = event => {
        event.preventDefault();
        setSuccess('');
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        loginUser(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset();
            setError('');
            setSuccess("User has been succesfuly logged in");
            navigate(from, {replace : true});
        })
        .catch(error => {
            console.log(error);
            setError('Password did not match')
        })
    }

    const handleTogglePassword = () => {
      setShowPassword(!showPassword)
    }

    const handleResetPassword =()=> {
        const email = emailRef.current.value;
        if(!email){
          alert('Please Provide your email to reset password')
          return;
        }
       sendPasswordResetEmail(auth, email)
       .then(() => {
          alert('Please Check Your Email')
       })
       .catch(error => {
          console.log(error);
       })
    }
    
    return (
        <div >
             <div className="w-25 mx-auto position-relative">
        <h2 className="text-center p-3">Login Here</h2>
       <form onSubmit={handleLogin} >
    
      <div className="mb-3">
        <label for="exampleFormControlInput2" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          ref={emailRef}
          className="form-control"
          id=" "
          placeholder="name@example.com"
          required
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput3" className="form-label">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          className="form-control"
          id=" "
          placeholder="password"
          required
        />
        <span onClick={handleTogglePassword} className="position-absolute top-50 end-0"> {showPassword ? <FaRegEye/> : <FaRegEyeSlash/> } </span>

      </div>
       <p><small>New here? <Link to='/signin'> Create New Account</Link> </small></p>
       <p><small>Forget password? <button onClick={handleResetPassword} className="btn btn-link">Reset Password</button> </small></p>
      <input type="submit" value="login" className="btn btn-primary px-5" />
      
       </form>
       <p className="text-danger text-center">{error}</p>
       <p className="text-success text-center">{success}</p>
    </div>
        </div>
    );
};

export default Login;