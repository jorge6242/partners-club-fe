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
  personReducer
});

export default rootReducer;