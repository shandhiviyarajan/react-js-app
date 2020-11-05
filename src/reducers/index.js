import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import permissionReducer from "./permissionReducer";
import roleReducer from "./roleReducer";
import dashcamReducer from "./dashcamReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  user: userReducer,
  admin: adminReducer,
  permission: permissionReducer,
  role: roleReducer,
  dashcam: dashcamReducer,
});


