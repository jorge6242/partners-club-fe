import {
  combineReducers
} from 'redux';

import modalReducer from './modalReducer';
import snackBarReducer from './snackBarReducer';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import loginReducer from './loginReducer';
import bankReducer from './bankReducer';
import countryReducer from './countryReducer';
import sportReducer from './sportReducer';
import professionReducer from './professionReducer';
import personReducer from './personReducer';
import maritalStatusReducer from './maritalStatusReducer';
import statusPersonReducer from './statusPersonReducer';
import genderReducer from './genderReducer';
import roleReducer from './roleReducer';
import permissionReducer from './permissionReducer';
import userReducer from './userReducer';
import relationTypeReducer from './relationTypeReducer';

const rootReducer = combineReducers({
  modalReducer,
  snackBarReducer,
  productReducer,
  categoryReducer,
  loginReducer,
  bankReducer,
  countryReducer,
  sportReducer,
  professionReducer,
  personReducer,
  maritalStatusReducer,
  statusPersonReducer,
  genderReducer,
  roleReducer,
  permissionReducer,
  userReducer,
  relationTypeReducer
});

export default rootReducer;