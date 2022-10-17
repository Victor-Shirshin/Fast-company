import React, { useEffect } from "react";
import { useAuth } from "../components/hooks/useAuth";

const logOut = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    logOut();
  }, []);

  return <h1>loading...</h1>;
};

export default logOut;
