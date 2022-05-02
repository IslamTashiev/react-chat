import React from "react";
import googleIcon from "../../assets/icons/google.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import { auth, provider } from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Вы вошли в аккаунт:", result.user.email);
        navigate("/chat");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className='login'>
      <div className='login__content'>
        <h1 className='login__header'>LOGIN</h1>
        <form className='login__form'>
          <div className='login__input'>
            <label className='login__input-label'>Your email adress</label>
            <input
              className='login__input-field'
              type='email'
              placeholder='example@gmail.com'
              required
            />
          </div>
          <div className='login__input'>
            <label className='login__input-label'>Your password</label>
            <input className='login__input-field' type='password' required />
          </div>
          <div className='login__input login__another'>
            <p className='login__input-label center'>Or login with</p>
            <div className='another__ways'>
              <div onClick={loginWithGoogle} className='way google'>
                <img src={googleIcon} />
                <h4>Google</h4>
              </div>
              <div className='way facebook'>
                <img src={facebookIcon} />
                <h4>Facebook</h4>
              </div>
            </div>
          </div>
          <button className='btn'>Log In</button>
        </form>
        <p className='login__footer'>
          Not a member? <span>Sing up now</span>
        </p>
      </div>
    </div>
  );
};
