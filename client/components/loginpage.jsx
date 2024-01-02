import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleLoginActionCreator } from "../actions/actions.js";

const LoginPage = () => {
  const [signUp, setSignUp] = useState(false);
  const [createProj, setCreateProj] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [regProjectId, setRegProjectId] = useState("")
  const [projectName, setProjectName] = useState("")
  const dispatch = useDispatch();

  // path is passed in as arg (either "/login" or "/register") when it is called by onClick, 
  // Also we now pass projectsID on body for both login and register despite only needing it for register
  // We can do this because, even though the login middleware doesn't use it, the login middleware doesn't care that its there either.

  const handleAuth = async (path) => {
    
    // leads to creating a project if not inputed during signup or existing in db
    if (signUp && !regProjectId && !projectName) {
      setCreateProj(true)
      return;
    }

    //post request for existing username/pw
    try{
      const requestOptions = {
        method: "POST",
        headers:  { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, projectsId: regProjectId, projectName })
      };
      const response = await fetch(path, requestOptions)
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Error from server');

      console.log(data);
      dispatch(toggleLoginActionCreator(true, data.projectsId, data.userId));
    } catch (error) {
      console.log("error accessing database");
    }
  }


  //renders loginform if signup state is false. Browser will always start with this since setSignup is initialized as false
  const renderLoginForm = () => {
    return (
      <div className="login">
        <p className ='title'>Resume Adventure</p>
        <input onChange={(e) => setUsername(e.target.value)} placeholder="username"></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        ></input>
        <button className = "sign-in-btn" onClick={() => handleAuth("/login")}>Continue</button>
        <p className = 'no-account-text'>Don't have an account?</p>
        <button className = "sign-up-btn"onClick={() => setSignUp(true)}>New Game</button>
      </div>
    );
  };

  // pressing "New Game" button on login screen will set signup state to true which will render this form
  const renderSignUpForm = () => {
    if (signUp) {
      return (
        <div className="login">
          <input onChange={(e) => setUsername(e.target.value)} placeholder="username"></input>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          ></input>
          <input onChange={(e) => setRegProjectId(e.target.value)} placeholder="project ID (optional)"></input>
          <button onClick={() => handleAuth("/register")}>Create Account</button>
          <p>If already have an account</p>
          <button onClick={() => setSignUp(false)}>Login</button>
        </div>
      );
    }
  };

  const renderCreateProjForm = () => {
      return (
        <div className="login">
          <input 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project Name"
                name="projectName" // Unique name attribute
                id="projectName"   // Unique id attribute
            ></input>
          <button className = 'create-project' onClick={() => handleAuth("/register")}>Create Project</button>
          <button onClick={() =>  setCreateProj(false)} >Go Back</button>
        </div>
      );
  };

  
  return (
    <div className="login-container">
      {(signUp && createProj) ? renderCreateProjForm() : (signUp) ? renderSignUpForm() : renderLoginForm()}
    </div>
  );
};

export default LoginPage;
