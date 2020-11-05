import axios from "axios";
import swal from 'sweetalert';
import {
  ADD_PERMISSION,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_PERMISSIONS,
  GET_PERMISSION,
  PERMISSION_LOADING,
  DELETE_PERMISSION
} from "./types";
import { BASE_URL,BASE_URL_ADMIN } from "../../src/config";
const $ = window.$;

// Add permission
export const addPermission = permissionData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(BASE_URL_ADMIN+"/permission", permissionData, {
      headers:{
      'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
      'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
    })
    .then(res =>{
      dispatch({
        type: ADD_PERMISSION,
        payload: res.data.data
      },swal("Success!","Inserted", "success"),window.location.reload(true))
    }
      
    )
    .catch(err =>{ if(err.response.data.status == "PERMISSION_DENIED"){
      swal("Warning!","Access denied to this section", "error");
    } else{
      swal("Warning!",err.response.data.message, "error")
    }
  }
);
};
// Add role permission
export const AddRolePermissionData = permissionData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(BASE_URL_ADMIN+"/role-permission", permissionData, {
      headers:{
      'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
      'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
    })
    .then(res =>{swal("Success!","Inserted", "success")})
    .catch(err =>{if(err.response.data.status == "DUPLICATE_RECORD"){
      axios
    .put(BASE_URL_ADMIN+"/role-permission/"+permissionData.role_id, permissionData, {
      headers:{
      'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
      'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
    })
    .then(res =>{swal("Success!","Inserted", "success")})
    }else if(err.response.data.status == "INVALID_RECORD"){
      swal("Warning!","This value is already in the list", "error");
    }else if(err.response.data.status == "PERMISSION_DENIED"){
      swal("Warning!","Create Permissions", "error");
    }else{
      swal("Warning!",err.response.data.message, "error");
    }
});
}


//update user role in user
export const updateAdminRoleUser = (id, data, history) => dispatch => {
  dispatch(setPermissionsLoading());
  axios
    .put(BASE_URL_ADMIN+'/user/role/'+id, data, {
      headers:{
      'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
      'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
    })
    .then(res =>{swal("Success!","Success", "success")}
    )
    .catch(err =>
      dispatch({
        type: GET_PERMISSION,
        payload: null
      }, swal("Warning!","This Admin User is not authenticated yet. Please authenticate the User in order to assign a User Role", "error"))
    );
};

// Get Admins
export const getPermissions = () => dispatch => {
  dispatch(setPermissionsLoading());
  axios
    .get(BASE_URL_ADMIN+"/permission/list",{
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      })
    .then(res =>
      dispatch({
        type: GET_PERMISSIONS,
        payload: res.data.data.permissions
      })
    )
    .catch(err =>{swal("Warning!","Access denied to this section", "error")}
    );
};




// Delete Post
export const deletePermission = id => dispatch => {
  axios
      .delete(BASE_URL_ADMIN+"/permission/"+id, {
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      })
        .then(res =>
          dispatch({
            type: DELETE_PERMISSION,
            payload: id
          },swal("deleted!", { icon: "success", }))
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          },swal("Warning!","Cannot be Deleted", "error"))
        );

};

export const changePassword = data => dispatch => {
  dispatch(setPermissionsLoading());
  axios
    .post(BASE_URL+"/admin/change-password",data
    )
    .then(res =>
      dispatch({
        type: GET_PERMISSION,
        payload: res.data.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PERMISSION,
        payload: null
      })
    );
};

export const updatePermission = (id, data, history) => dispatch => {
  dispatch(setPermissionsLoading());
  axios
    .put(BASE_URL_ADMIN+'/permission/'+id, data, {
      headers:{
      'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
      'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
    })
    .then(res =>
      dispatch(
        {
          type: GET_PERMISSION,
          payload: res.data
        },
        history.push('/permissions')
      )
    )
    .catch(err =>
      dispatch({
        type: GET_PERMISSION,
        payload: null
      }, swal("Warning!",err.response.data.message, "error"))
    );
};

// Get admin
export const getPermission = id => dispatch => {
  dispatch(setPermissionsLoading());

  axios
    .get(BASE_URL_ADMIN+"/permission/"+id,
      {
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      })
    .then(res =>
      dispatch({
        type: GET_PERMISSION,
        payload: res.data.data.permissions[0]
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PERMISSION,
        payload: null
      })
    );
};

// Set loading state
export const setPermissionsLoading = () => {
  return {
    type: PERMISSION_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
