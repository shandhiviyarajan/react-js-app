import axios from "axios";
import swal from 'sweetalert';
import {
  ADD_USER,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_USERS,
  GET_USER,
  USER_LOADING,
  DELETE_USER
} from "./types";
import { BASE_URL } from "../../src/config";
const $ = window.$;

// Add user
export const addUser = (userData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(BASE_URL+"admin", userData)
    .then(res =>
      dispatch({
        type: ADD_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// active user
export const activeUser = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(BASE_URL+"/admin/user/disable", {"email": id})
    .then(res =>{window.location.reload(true)}
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      },
      window.location.reload(true))
    );
};

export const unActiveUser = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(BASE_URL+"/admin/user/enable", {"email": id})
    .then(res =>{window.location.reload(true)}
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Users
export const getUsers = (name) => dispatch => {
  dispatch(setUsersLoading());
  axios
    .post(BASE_URL+"/admin/user/list-users")
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data.data.Users
      }, localStorage.removeItem('page'),localStorage.setItem('page', res.data.data.PaginationToken))
    )
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: null
      })
    );
};

// Get Admins
export const getUserPagination = () => dispatch => {
  if(localStorage.getItem('page') == "undefined"){
   
  }else{
    dispatch(setUsersLoading());
  axios
    .post(BASE_URL+"/admin/user/list-users",{"page":localStorage.getItem('page')})
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data.data.Users
      }, localStorage.removeItem('page'),localStorage.setItem('page', res.data.data.PaginationToken))
    )
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: null
      })
    );
  }
};

export const searchUser = (id,history) => dispatch => {
  axios
    .post(BASE_URL+"/admin/user/get-user",{"email": id })
    .then(res =>{ window.location = '/user-profile/'+id; }
    )
    .catch(err =>{swal("Warning!","The number of search results are null", "error")}
    );
};

export const changePassword = data => dispatch => {
  dispatch(setUsersLoading());

  axios
    .post(BASE_URL+"/admin/change-password",data,
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwtToken'),
      'accesstoken': localStorage.getItem('accesstoken'),
  }}
  )
    .then(res =>{swal("Success!","New password Update", "success");}
    ).catch(err =>{swal("Warning!","please enter your valid access data", "error")}
    );
};

// Delete Post
export const deleteUser = id => dispatch => {
  axios
      .delete(BASE_URL+"/admin/user/",{data:{"email":id}})
        .then(res =>window.location.reload(true),
          dispatch({
            type: DELETE_USER,
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

export const updateUser = (id, data, history) => dispatch => {
  dispatch(setUsersLoading());
  axios
    .put(BASE_URL+`/admin/`, data)
    .then(res =>
      dispatch(
        {
          type: GET_USER,
          payload: res.data
        },
        $("#editBrandModal1").modal("hide"),
        window.location.reload(true)
      )
    )
    .catch(err =>
      dispatch({
        type: GET_USER,
        payload: null
      })
    );
};



// Get Admin profile
export const getUser = id => dispatch => {
  dispatch(setUsersLoading());

  axios
    .post(BASE_URL+"/admin/{userType}/get-user",{"email": id })
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER,
        payload: null
      })
    );
};

export const getAdmin = id => dispatch => {
  dispatch(setUsersLoading());

  axios
    .post(BASE_URL+"/admin/user/get-user",{"email": id })
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER,
        payload: null
      })
    );
};

// Set loading state
export const setUsersLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
