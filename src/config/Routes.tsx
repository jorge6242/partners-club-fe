import React, { useEffect } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useDispatch } from 'react-redux';

import Dashboard from "../containers/dashboard";
import Product from "../containers/product";
import Modal from "../components/Modal";
import MainLayout from "../Hoc/MainLayout";
import SnackBar from "../components/SnackBar";
import Login from "../containers/login";
import SecureStorage from "./SecureStorage";
import Category from "../containers/category";
import { checkLogin } from "../actions/loginActions"
import Bank from "../containers/bank";
import Country from "../containers/Country";
import Sport from "../containers/Sport";
import Profession from "../containers/Profession";
import Person from "../containers/person";
import MaritalStatus from "../containers/maritalStatus";
import StatusPerson from "../containers/statusPerson";
import Gender from "../containers/gender";

export default function Routes() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])

  return (
    <HashRouter>
      <MainLayout>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route
            path="/dashboard"
            exact={false}
            component={() => {
              if (SecureStorage.getItem("token")) {
                return (
                  <Switch>
                    <Dashboard>
                      <Route
                        path="/dashboard/product"
                        exact
                        component={Product}
                      />
                      <Route
                        path="/dashboard/category"
                        exact
                        component={Category}
                      />
                      <Route
                        path="/dashboard/banco"
                        exact
                        component={Bank}
                      />
                      <Route
                        path="/dashboard/pais"
                        exact
                        component={Country}
                      />
                      <Route
                        path="/dashboard/deporte"
                        exact
                        component={Sport}
                      />
                      <Route
                        path="/dashboard/profesion"
                        exact
                        component={Profession}
                      />
                      <Route
                        path="/dashboard/socio"
                        exact
                        component={Person}
                      />
                      <Route
                        path="/dashboard/estado-civil"
                        exact
                        component={MaritalStatus}
                      />
                      <Route
                        path="/dashboard/status-persona"
                        exact
                        component={StatusPerson}
                      />
                      <Route
                        path="/dashboard/sexo"
                        exact
                        component={Gender}
                      />
                    </Dashboard>
                  </Switch>
                );
              }
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
        <Modal />
        <SnackBar />
      </MainLayout>
    </HashRouter>
  );
}
