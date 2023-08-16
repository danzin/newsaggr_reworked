import React, { useEffect, useRef, useState } from 'react';
import './register.css';
import { register } from '../../services/register';
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState('');

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  //Focus every time component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
    console.log(matchPwd);
    console.log(validMatch);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //prevent button from being being manually enabled from client through inspect element
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry');
      return;
    }
    console.log(user, pwd);
    try {
      await register({ username: user, password: pwd, email: email });
      setSuccess(true);

      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (e) {
      console.log(e);
      if (!e?.response) {
        setErrMsg('No Server Response');
        console.log('No Server Response');
      } else if (e.response?.status === 409) {
        setErrMsg('Username Taken');
        console.log('Username Taken');
      } else {
        setErrMsg('Registration Failed');
        console.log('Registration Failed');
      }
      errRef.current.focus();
    }
  };
  return (
    <section className="register-container">
      <div className="register-container__form">
        {success ? (
          <section>
            <h1>Success!</h1>
            <p>
              <a href="/login">Sign In</a>
            </p>
          </section>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="data-form">
              <h2 className="data-form__header">Register</h2>
              <p
                ref={errRef}
                className={errMsg ? 'err-msg' : 'offscreen'}
                aria-live="assertlive"
              >
                {errMsg}
              </p>
              <div className="data-form__input">
                <input
                  type="text"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  // aria-invalid={validName ? 'false' : 'true'}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  placeholder="Email"
                />
                <i className="fi-xtluxl-envelope-thin icon"></i>
              </div>
              <div className="data-form__input">
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  required
                  aria-invalid={validName ? 'false' : 'true'}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  placeholder="Username"
                />
                <i className="fi-xtluxl-user-thin icon"></i>

                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? 'instructions'
                      : 'offscreen'
                  }
                >
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
                <i className="fi-xtluxl-user-thin icon"></i>
              </div>

              <div className="data-form__input">
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? 'false' : 'true'}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  placeholder="Password"
                />
                <div className="instructions-container">
                  <p
                    id="pwdnote"
                    className={
                      pwdFocus && !validPwd ? 'instructions' : 'offscreen'
                    }
                  >
                    8 to 24 characters. Must include uppercase and lowercase
                    letters, a number and a special character. Allowed special
                    characters: <span aria-label="exclamation mark">!</span>{' '}
                    <span aria-label="at symbol">@</span>{' '}
                    <span aria-label="hashtag">#</span>{' '}
                    <span aria-label="dollar sign">$</span>{' '}
                    <span aria-label="percent">%</span>
                  </p>
                </div>

                <i className="fi-xtluxl-key-thin icon"></i>
                <i className="fi-xtpuxl-eye-thin hide"></i>
              </div>
              <div className="data-form__input">
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validPwd ? 'false' : 'true'}
                  aria-describedby="pwdnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  placeholder="Confirm password"
                />
                <div className="instructions-container">
                  <p
                    id="confirmnote"
                    className={
                      matchFocus && !validMatch ? 'instructions' : 'offscreen'
                    }
                  >
                    Must match the first password input field.
                  </p>
                </div>

                <i className="fi-xtluxl-key-thin icon"></i>
                <i className="fi-xtpuxl-eye-thin hide"></i>
              </div>

              <div className="data-form__btn">
                <button
                  className="register-btn"
                  disabled={
                    !validName || !validPwd || !validMatch ? true : false
                  }
                >
                  Sign Up
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default Register;
