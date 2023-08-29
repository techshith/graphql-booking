import React, { useRef, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailEl = useRef();
  const passwordEl = useRef();
  const authContext = useContext(AuthContext);

  const switchModeHandler = () => {
    setIsLogin(prevMode => !prevMode);
  };

  const submitHandler = event => {
    event.preventDefault();
    const email = emailEl.current.value;
    const password = passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    console.log(`${isLogin ? 'Logging in' : 'Signing up'} with:`, email, password);

    // We'll connect this to the backend in a future step
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="email">E-Mail</label>
        <input type="email" id="email" ref={emailEl} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordEl} />
      </div>
      <div>
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        <button type="button" onClick={switchModeHandler}>
          Switch to {isLogin ? 'Signup' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default AuthPage;