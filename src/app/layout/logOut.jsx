import React, { useEffect } from "react";
// import { useAuth } from "../components/hooks/useAuth";
import { useDispatch } from "react-redux";

const logOut = () => {
  // const { logOut } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOut());
  }, []);

  return <h1>loading...</h1>;
};

export default logOut;
