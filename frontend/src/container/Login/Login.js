import React, { useState, useRef, useEffect } from 'react';
import './login.css';
import useAuth from '../../hooks/useAuth';
import { login } from '../../services/login';
import { useNavigate, Link, useLocation } from 'react-router-dom';
const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  //keeps user's previously visited location
  //used for redirect after loading
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [uname, setUname] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  //focus user input when component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  //clear error massages if user changes input
  useEffect(() => {
    setErrMsg('');
  }, [uname, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username: uname, password: pwd });
      const accessToken = response?.accessToken;
      console.log(response);
      const roles = response?.roles;
      const id = response?.id;
      const categories = response?.categories;
      setAuth({ uname, id, accessToken, roles, categories });
      setPwd('');
      setUname('');
      navigate(from, { replace: true });
    } catch (e) {
      if (!e?.response) {
        setErrMsg(e.message);
      } else if (e.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (e.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="login-container">
      <div className="login-container__form">
        <form onSubmit={handleSubmit} className="login_data-form">
          <h2 className="data-form__header">Login</h2>
          <p
            ref={errRef}
            className={errMsg ? 'err-msg' : 'offscreen'}
            aria-live="assertlive"
          >
            {errMsg}
          </p>
          <div className="data-form__input">
            <input
              onChange={(e) => setUname(e.target.value)}
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              value={uname}
              placeholder="Username"
              required
            />
            <i className="fi-xtluxl-user-thin email"></i>
          </div>

          <div className="data-form__input">
            <input
              onChange={(e) => setPwd(e.target.value)}
              type="password"
              id="password"
              value={pwd}
              required
              placeholder="Password"
            />
            <i className="fi-xtluxl-key-thin pwd"></i>
            <i className="fi-xtpuxl-eye-thin hide"></i>
          </div>
          <div className="data-form__btn">
            <button type="submit" className="login">
              Login
            </button>
          </div>
          <div className="data-form__options">
            <span className="data-form__options-checkbox">
              <input type="checkbox" name="rememberme" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </span>
            <a className="data-form__options-fpwd" href="#">
              Forgot password
            </a>
          </div>
          <div className="register">
            <a href="/register">Don&apos;t have an account?</a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
