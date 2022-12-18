import React from "react";
import "./Login.css";

const Login = ({ loginName, loginPass, login, setLoginName, setLoginPass }) => {
  return (
    <>
      <h1 className='login'>Login</h1>
      <div className='d-flex justify-center d-block-md '>
        <input
          type='text'
          placeholder='Enter Id...'
          onChange={(e) => setLoginName(e.target.value)}
          value={loginName}
        />
        <input
          type='password'
          placeholder='Enter password...'
          onChange={(e) => setLoginPass(e.target.value)}
          value={loginPass}
        />
      </div>
      <button onClick={login}>Login</button>
    </>
  );
};

export default Login;
