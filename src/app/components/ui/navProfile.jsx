import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";
// import { useAuth } from "../hooks/useAuth";

const NavProfile = () => {
  // const { currentUser } = useAuth();
  const currentUser = useSelector(getCurrentUserData());
  const [isOpen, setOpen] = useState(false);

  const tooggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  if (!currentUser) return "loading";

  return (
    <div className="dropdown" onClick={tooggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt="avatar"
          height="40"
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item">
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
