import React, { useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import Dashboard from "../containers/dashboard";
import Product from "../containers/product";
import Modal from "../components/Modal";
import MainLayout from "../Hoc/MainLayout";
import SnackBar from "../components/SnackBar";
import Login from "../containers/login";
import SecureStorage from "./SecureStorage";
import Category from "../containers/category";
import { checkLogin, setupInterceptors } from "../actions/loginActions";
import Bank from "../containers/bank";
import Country from "../containers/Country";
import Sport from "../containers/Sport";
import Profession from "../containers/Profession";
import Person from "../containers/person";
import MaritalStatus from "../containers/maritalStatus";
import StatusPerson from "../containers/statusPerson";
import Gender from "../containers/gender";
import Role from "../containers/role";
import Permission from "../containers/permission";
import User from "../containers/user";
import Home from "../containers/home";
import Reports from "../containers/reports";
import ExpirationCard from "../containers/Templates/ExpirationCard";

export default function Routes() {
  const dispatch = useDispatch();
  const token = SecureStorage.getItem("token");

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch, token]);

  useEffect(() => {
    setupInterceptors();
  }, [token]);

  return (
    <HashRouter>
      <MainLayout>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/template/expiration-cards" component={ExpirationCard} />
          <Route
            path="/dashboard"
            exact={false}
            component={() => {
              if (SecureStorage.getItem("token")) {
                return (
                  <Switch>
                    <Dashboard>
                      <Route path="/dashboard/main" component={Home} />
                      <Route path="/dashboard/reports" component={Reports} />
                      <Route path="/dashboard/user" component={User} />
                      <Route path="/dashboard/role" component={Role} />
                      <Route
                        path="/dashboard/permission"
                        component={Permission}
                      />
                      <Route path="/dashboard/product" component={Product} />
                      <Route path="/dashboard/category" component={Category} />
                      <Route path="/dashboard/banco" component={Bank} />
                      <Route path="/dashboard/pais" component={Country} />
                      <Route path="/dashboard/deporte" component={Sport} />
                      <Route
                        path="/dashboard/profesion"
                        component={Profession}
                      />
                      <Route path="/dashboard/socio" component={Person} />
                      <Route
                        path="/dashboard/estado-civil"
                        component={MaritalStatus}
                      />
                      <Route
                        path="/dashboard/status-persona"
                        component={StatusPerson}
                      />
                      <Route path="/dashboard/sexo" component={Gender} />
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
