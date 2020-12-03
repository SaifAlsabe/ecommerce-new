import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { RootStore } from "../../store";

export const PrivateRoute: React.FC<{ component: React.FC<RouteComponentProps>, path: string, exact: boolean }> = ({
  component: Component,
  ...rest
}) => {

  const { user } = useSelector((state: RootStore) => state.userSignin)
  const [name, setName] = useState(user)

  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [user])

  return (
    <Route
      {...rest}
      render={props => {
        if (name) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/signin",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};