import React, { useContext, useState } from "react";
import {Link} from 'react-router-dom'
import { AuthContext } from "../../providers/AuthProvider";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { sendEmailVerification, updateProfile } from "firebase/auth";

const SignIn = () => {
    const {user, createUser} = useContext(AuthContext)
   const [showPassword, setShowPassword] = useState(false);
   const [success, setSuccess] = useState('');
   const [error, setError] = useState('');

   const handleTogglePassword = () => {
        setShowPassword(!showPassword);
   }

    const handleSingin = event => {
        event.preventDefault();
        setSuccess('');
        const form = event.target
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        if(password !== confirm){
            alert('Password did not match!')
            return;
        }
        else if(password.length < 6){
          setError("ERROR: Password should be at least 6 characters");
          return;
        }
        else if(!/(?=.*[A-Z])/.test(password)){
          setError('Please add al least One UPPERCASE')
          return;
        }
        else if(!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(password)){
            setError('Add One Special Character')
            return;
        }
        console.log(name, email, password, confirm);
        createUser(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset()
            setError('')
            setSuccess("User has been succesfuly logged in")
            updateUserData(result.user, name);
            verifyUserEmail(result.user)
        })
        .catch(error => {
            console.error(error.message)
            console.log(error);
           
        })
    }
// to see user name
    const updateUserData = (user, name) => {
        updateProfile(user, {
          displayName: name
        })
        .then( () => {
          console.log('User name updated');
        })
        .catch(error => {
          console.log(error);
        })
    }
// verify user email
      const verifyUserEmail = (user) => {
        sendEmailVerification(user)
        .then(()=> {
          alert('Please Verify Your Email')
        })
        .catch(error => {
          console.log(error);
        })
      }

  return (
    <div className="w-25 mx-auto position-relative">
        <h2 className="text-center p-3">Sign In Here</h2>
       <form onSubmit={handleSingin} >
       <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
         Name
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          id=" "
          rows="3"
          placeholder="Your Name"
          required
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput2" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          id=" "
          placeholder="name@example.com"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput3" className="form-label">
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
        <span onClick={handleTogglePassword} className="position-absolute top-50 end-0" > {showPassword ? <FaRegEye/> : <FaRegEyeSlash/> } </span>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput4" className="form-label">
          Confirm password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="confirm"
          className="form-control"
          id=" "
          placeholder="confirm password"
          required
        />
         

      </div>
      <p><small>Already have Account? <Link to='/login'> Login</Link> </small></p>
      <input type="submit" value="SignUp" className="btn btn-primary px-5" />
      
       </form>
       <p className="text-danger text-center">{error}</p>
       <p className="text-success text-center">{success}</p>
       
    </div>
  );
};

export default SignIn;
