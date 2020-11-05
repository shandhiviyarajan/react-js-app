import axios from "axios";
import swal from 'sweetalert';
import {
  CLEAR_ERRORS,
  GET_DASHCAMS,
  GET_DASHCAM,
  DASHCAM_LOADING
} from "./types";
import { BASE_URL,BASE_URL_ADMIN } from "../../src/config";
const $ = window.$;


// Get Dash-cams
export const getDashCams = () => dispatch => {
  dispatch(setDashCamsLoading());
  axios
    .get(BASE_URL_ADMIN+"/dash-cam/list")
    .then(res =>
      dispatch({
        type: GET_DASHCAMS,
        payload: res.data.data.dashCams
      }, localStorage.setItem('dashcampage', res.data.data.total))
    )
    .catch(err =>{swal("Warning!","Access denied to this section", "error")}
    );
};

export const getDashCam = id => dispatch => {
    dispatch(setDashCamsLoading());
  
    axios
      .get(BASE_URL_ADMIN+"/role/"+id)
      .then(res =>
        dispatch({
          type: GET_DASHCAM,
          payload: res.data.data.roles[0]
        })
      )
      .catch(err =>
        dispatch({
          type: GET_DASHCAM,
          payload: null
        })
      );
  };

// Get Admins
export const getDashCamPagination = (page) => dispatch => {
  
  axios
    .get(BASE_URL_ADMIN+"/dash-cam/list?page="+page)
    .then(res =>
      dispatch({
        type: GET_DASHCAMS,
        payload: res.data.data.dashCams
      }, localStorage.setItem('dashcampage', res.data.data.total))
    )
};



// Get admin
export const searchDashCam = id => dispatch => {
  dispatch(setDashCamsLoading());

  axios
    .get(BASE_URL_ADMIN+"/role/"+id)
    .then(res =>
      dispatch({
        type: GET_DASHCAM,
        payload: res.data.data.roles[0]
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DASHCAM,
        payload: null
      })
    );
};

// Set loading state
export const setDashCamsLoading = () => {
  return {
    type: DASHCAM_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
