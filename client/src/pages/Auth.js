import React, { useRef, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const AuthPage = () => {
  const emailEl = useRef();
  const passwordEl = useRef();
  const authContext = useContext(AuthContext);

  const submitHandler = event => {
    event.preventDefault();
    const email = emailEl.current.value;
    const password = passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    // GraphQL login or signup logic here (we'll wire this later)
    console.log(email, password);
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
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AuthPage;
