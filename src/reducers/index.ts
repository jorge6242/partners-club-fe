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
import paymentMethodReducer from './paymentMethodReducer';
import cardTypeReducer from './cardTypeReducer';
import secondModalReducer from './secondModalReducer';
import shareReducer from './shareReducer';
import cardPersonReducer from './cardPersonReducer';
import transactionTypeReducer from './transactionTypeReducer';
import shareMovementReducer from './shareMovementReducer';
import currencyReducer from './currencyReducer';
import shareTypeReducer from './shareTypeReducer';
import locationReducer from './locationReducer';
import accessControlReducer from './accessControlReducer';

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
  relationTypeReducer,
  paymentMethodReducer,
  cardTypeReducer,
  secondModalReducer,
  shareReducer,
  cardPersonReducer,
  transactionTypeReducer,
  shareMovementReducer,
  currencyReducer,
  shareTypeReducer,
  locationReducer,
  accessControlReducer
});

export default rootReducer;