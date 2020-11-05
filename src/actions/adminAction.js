import axios from "axios";
import swal from 'sweetalert';
import {
  ADD_ADMIN,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_ADMINS,
  GET_ADMIN,
  ADMIN_LOADING,
  DELETE_ADMIN,
  GET_PROFILE,
  SET_CURRENT_USER
} from "./types";
import setAuthToken from '../utils/setAuthToken';
import { BASE_URL } from "../../src/config";

export const getCurrentProfile = id => dispatch => {
  dispatch(setAdminsLoading());
  axios
    .post(BASE_URL+"/admin/admin/get-user",{"email": id })
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Add user
export const addAdmin = adminData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(BASE_URL+"/admin", adminData)
    .then(res =>{
      dispatch({
        type: ADD_ADMIN,
        payload: res.data.data
      },swal("Success!","Inserted", "success"),window.location.reload(true))
    }
      
    )
    .catch(err =>{
      if(err.response.data.data == "MISSING_MANDATORY_ATTRIBUTE"){
        swal("Warning!",err.response.data.data[0].message, "error");
      }else if(err.response.data.status == "MISSING_MANDATORY_ATTRIBUTE"){
        swal("Warning!",err.response.data.data[0].message, "error");
      }
      else if(err.response.data.status == "FAIL"){
        swal("Warning!",err.response.data.message, "error");
      }else{
        swal("Warning!","An account with the given email address already exists. Please try again with a different email address.", "error");
      }
    }
    );
};


// Get Admins
export const getAdmins = () => dispatch => {
  dispatch(setAdminsLoading());
  axios
    .post(BASE_URL+"/admin/admin/list-users")
    .then(res =>
      dispatch({
        type: GET_ADMINS,
        payload: res.data.data.Users
      }, localStorage.removeItem('page'),localStorage.setItem('page', res.data.data.PaginationToken))
    )
    .catch(err =>
      dispatch({
        type: GET_ADMINS,
        payload: null
      })
    );
};

// Get Admins
export const getAdminPagination = () => dispatch => {
  if(localStorage.getItem('page') == "undefined"){
   
  }else{
    dispatch(setAdminsLoading());
    axios
      .post(BASE_URL+"/admin/admin/list-users",{"page":localStorage.getItem('page')})
      .then(res =>
        dispatch({
          type: GET_ADMINS,
          payload: res.data.data.Users
        }, localStorage.removeItem('page'),localStorage.setItem('page', res.data.data.PaginationToken))
      )
      .catch(err =>
        dispatch({
          type: GET_ADMINS,
          payload: null
        })
      );
  }
};

// Get Admins
export const searchAdmin = (id,history) => dispatch => {
  axios
    .post(BASE_URL+"/admin/admin/get-user",{"email": id })
    .then(res =>{ window.location = '/profile/'+id; }
    )
    .catch(err =>{swal("Warning!","The number of search results are null", "error")}
    );
};



// Get Admin profile

  export const profileAdmin = id => dispatch => {
    dispatch(setAdminsLoading());
  
    axios
      .post(BASE_URL+"/admin/admin/get-user",{"email": id })
      .then(res =>
        dispatch({
          type: GET_ADMIN,
          payload: res.data.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ADMIN,
          payload: null
        })
      );
  };


  export const prosearch = id  => dispatch => {
    dispatch(setAdminsLoading());
  
    axios
      .post(BASE_URL+"/admin/admin/get-user",{"email": id })
      .then(
        res =>{
         // history.push('/profile/'+id)
        }
      )
      .catch(err => {swal("Warning!","Please enter valid email address", "error")}
      );
  };

// active user
export const activeAdmin = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(BASE_URL+"/admin/admin/disable", {"email": id})
    .then(res =>
      dispatch({
        type: GET_ADMIN,
        payload: res.data.data
      },window.location.reload(true))
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const unActiveAdmin = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(BASE_URL+"/admin/admin/enable", {"email": id})
    .then(res =>
      dispatch({
        type: GET_ADMIN,
        payload: res.data.data
      },window.location.reload(true))
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Post
export const deleteAdmin = id => dispatch => {
  axios
      .delete(BASE_URL+"/admin/admin/",{data:{"email":id}})
        .then(res =>window.location.reload(true),
          dispatch({
            type: DELETE_ADMIN,
            payload: id
          })
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );

};

export const changePassword = data => dispatch => {
  dispatch(setAdminsLoading());
  axios
    .post(BASE_URL+"/admin/change-password",data
    )
    .then(res =>
      dispatch({
        type: GET_ADMIN,
        payload: res.data.data
      })
    )
    .catch(err =>{swal("Warning!",err.response.data.data[0].message, "error")}
      // dispatch({
      //   type: GET_ADMIN,
      //   payload: null
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

export const updateAdmin = (id, data, history) => dispatch => {

  axios
    .put(BASE_URL+'/admin/', data)
    .then(res =>{
      if(data.email == id){
        swal("Success!","Updated", "success")
      } else{
        swal("Please log in with the updated email address " + data.email)
        
        // Remove token from localStorage
        localStorage.removeItem('jwtToken');
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current user to {} which will set isAuthenticated to false
        dispatch(setCurrentUser({}));
      }
      
      // swal("Success!","Updated", "success")
    })
    .catch(err =>{swal("Warning!",err.response.data.data, "error")}
    );
};

// Get admin
export const getAdmin = id => dispatch => {
  dispatch(setAdminsLoading());

  axios
    .post(BASE_URL+"/admin/admin/get-user",{"email": id })
    .then(res =>
      dispatch({
        type: GET_ADMIN,
        payload: res.data.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ADMIN,
        payload: null
      })
    );
};

// Get admin
export const getAdminAuthCheck = id => dispatch => {
  axios
    .post(BASE_URL+"/admin/admin/get-user",{"email": id })
    .then(res =>{
       if(res.data.data.Enabled==false){
        // Remove token from localStorage
      localStorage.removeItem('jwtToken');
      // Remove auth header for future requests
      setAuthToken(false);
      // Set current user to {} which will set isAuthenticated to false
      dispatch(setCurrentUser({}));
       }
    }
    )
    .catch(err =>{
      // Remove token from localStorage
      localStorage.removeItem('jwtToken');
      // Remove auth header for future requests
      setAuthToken(false);
      // Set current user to {} which will set isAuthenticated to false
      dispatch(setCurrentUser({}));
    }
    );
};

export const getCurrentAdmin = id => dispatch => {
  dispatch(setAdminsLoading());

  axios
    .post(BASE_URL+"/admin/admin/get-user",{"email": id })
    .then(res =>
      dispatch({
        type: GET_ADMIN,
        payload: res.data.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ADMIN,
        payload: null
      })
    );
};

// Set loading state
export const setAdminsLoading = () => {
  return {
    type: ADMIN_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
