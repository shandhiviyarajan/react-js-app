import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';
import { BASE_URL } from "../../src/config";

import { GET_ERRORS, SET_CURRENT_USER } from './types';


// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post( 'api/users/register', userData)
    .then(res =>{if(res.response.status){
    }} )
    // .catch(err =>
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: err.response.data
    //   })
   // );
};


export const addConfirmPassword = (userData, history) => dispatch => {
  axios
    .post( BASE_URL+'/admin/forget-password/confirm', userData)
    .then(res =>{if(res.data.status=="SUCCESS"){
      window.location = "/login"; 
    } else {
      swal("Warning!",res.data.data, "error");
    }} ).catch(err =>{
      if(err.response.data.status == "MISSING_MANDATORY_ATTRIBUTE"){
        swal("Warning!",err.response.data.data[0].message, "error");
      
      }else{
        if(err.response.data.status == "MISSING_MANDATORY_ATTRIBUTE"){
          swal("Warning!",err.response.data.data[0].message, "error");
        
        }else{
          swal("Warning!",err.response.data.data, "error");
        }
      }
    });
      

};


export const loginForgetpassword = (userData, history) => dispatch => {
  axios
    .post( BASE_URL+'/admin/forget-password', userData)
    .then(res =>{
      if(res.data.status == "SUCCESS"){
        window.location = "/confirmPassword/"+userData.email;
      }
     })
    .catch(err =>{
      if(err.response.data.status == "MISSING_MANDATORY_ATTRIBUTE"){
        swal("Warning!",err.response.data.data[0].message, "error");
      
      }else{
        if(err.response.data.status == "MISSING_MANDATORY_ATTRIBUTE"){
          swal("Warning!",err.response.data.data[0].message, "error");
        
        }else{
          swal("Warning!",err.response.data.message, "error");
        }
      }
      
    }
    );
};

export const addAdminAuth = (userData, history) => dispatch => {
  axios
    .post( BASE_URL+'/admin/auth', userData)
    .then(res =>{
      if(res.data.status == "SUCCESS"){
      localStorage.setItem('Session', res.data.data.Session);
      window.location = "/auth-challenge/"+res.data.data.ChallengeParameters.USER_ID_FOR_SRP;
      }
     })
    .catch(err =>{
      if(err.response.data.status == "MISSING_MANDATORY_ATTRIBUTE"){
        swal("Warning!",err.response.data.data[0].message, "error");
      
      }else{
        if(err.response.data.status == "MISSING_MANDATORY_ATTRIBUTE"){
          swal("Warning!",err.response.data.data[0].message, "error");
        
        }else{
          swal("Warning!",err.response.data.data, "error");
        }
      }
    }
    );
};

export const addAuthChallenge = (userData, history) => dispatch => {
  axios
    .post( BASE_URL+'/admin/auth-challenge', userData)
    .then(res =>{
      if(res.data.status == "SUCCESS"){
        window.location = "/login";
      }
     })
    .catch(err =>{
      if(err.response.data.status == "MISSING_MANDATORY_ATTRIBUTE"){
        swal("Warning!",err.response.data.data[0].message, "error");
      
      }else{
        swal("Warning!",err.response.data.data, "error");
      }
    }
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {

  axios
  .post(BASE_URL+"/admin/login", userData)
    .then(res => {
      if(res.data.status == 'FAIL'){
        swal("Warning!",res.data.message, "error");
        dispatch({
          type: GET_ERRORS,
          payload: res.data.status 
        })
      }else{
        // Save to localStorage
      const  token  = res.data.data.jwtToken;
      const  accesstoken  = res.data.data.accessToken;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('accesstoken', accesstoken);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      }
      
    })
    .catch(err =>{
      if(err.response.data.status == "MISSING_MANDATORY_ATTRIBUTE"){
        swal("Warning!",err.response.data.data[0].message, "error");
      
      }else{
        swal("Warning!",err.response.data.data, "error");
      }
    }

      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
