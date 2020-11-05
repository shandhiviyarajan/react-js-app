import axios from "axios";
import swal from 'sweetalert';
import {
  ADD_ROLE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_ROLES,
  GET_ROLE,
  ROLE_LOADING,
  DELETE_ROLE
} from "./types";
import { BASE_URL,BASE_URL_ADMIN } from "../../src/config";

// Add role
export const addRole = roleData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(BASE_URL_ADMIN+"/role", roleData, {
      headers:{
      'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
      'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
    })
    .then(res =>{
      dispatch({
        type: ADD_ROLE,
        payload: res.data.data
      },swal("Success!","Inserted", "success"),window.location.reload(true))
    }
      
    ).catch(err =>{ if(err.response.data.status == "PERMISSION_DENIED"){
      swal("Warning!","Access denied to this section", "error");
    } else{
      swal("Warning!",err.response.data.message, "error")
    }
    }
    );
};

// Get Admins
export const getRoles = () => dispatch => {
  dispatch(setRolesLoading());
  axios
    .get(BASE_URL_ADMIN+"/role/list",{
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      })
    .then(res =>
      dispatch({
        type: GET_ROLES,
        payload: res.data.data.roles
      }, localStorage.setItem('rolepage', res.data.data.total))
    )
    .catch(err =>{swal("Warning!","Access denied to this section", "error")}
    );
};

// Get Admins
export const getRolePagination = (page) => dispatch => {
  
  axios
    .get(BASE_URL_ADMIN+"/role/list?page="+page,{
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      })
    .then(res =>
      dispatch({
        type: GET_ROLES,
        payload: res.data.data.roles
      }, localStorage.setItem('rolepage', res.data.data.total))
    )
};

export const updateRole = (id, data, history) => dispatch => {
  dispatch(setRolesLoading());
  axios
    .put(BASE_URL_ADMIN+'/role/'+id, data, {
      headers:{
      'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
      'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
    })
    .then(res =>
      dispatch(
        {
          type: GET_ROLE,
          payload: res.data
        },
        history.push('/roles')
      )
    )
    .catch(err =>
      dispatch({
        type: GET_ROLE,
        payload: null
      }, swal("Warning!",err.response.data.message, "error"))
    );
};

// Delete Post
export const deleteRole = id => dispatch => {

  axios
      .delete(BASE_URL_ADMIN+"/role/"+id, {
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      })
        .then(res =>
          dispatch({
            type: DELETE_ROLE,
            payload: id
          },swal("deleted!", { icon: "success", }))
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          }, swal("Warning!","Cannot be Deleted", "error"))
        );

};


// Get role user admin
export const getRoleUser = id => dispatch => {
  dispatch(setRolesLoading());

  axios
    .get(BASE_URL_ADMIN+"/role/"+id,
      {
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      })
    .then(res =>
      dispatch({
        type: GET_ROLE,
        payload: res.data.data.roles[0]
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ROLE,
        payload: null
      })
    );
};


export const changePassword = data => dispatch => {
  dispatch(setRolesLoading());
  axios
    .post(BASE_URL+"/admin/change-password",data
    )
    .then(res =>
      dispatch({
        type: GET_ROLE,
        payload: res.data.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ROLE,
        payload: null
      })
    );
};

// Get admin
export const getRole = id => dispatch => {
  dispatch(setRolesLoading());

  axios
    .get(BASE_URL_ADMIN+"/role/"+id,
      {
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      })
    .then(res =>
      dispatch({
        type: GET_ROLE,
        payload: res.data.data.roles[0]
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ROLE,
        payload: null
      })
    );
};

// Get admin
export const searchRole = id => dispatch => {
  dispatch(setRolesLoading());

  axios
    .get(BASE_URL_ADMIN+"/role/"+id,
      {
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      })
    .then(res =>
      dispatch({
        type: GET_ROLE,
        payload: res.data.data.roles[0]
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ROLE,
        payload: null
      })
    );
};

// Set loading state
export const setRolesLoading = () => {
  return {
    type: ROLE_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
