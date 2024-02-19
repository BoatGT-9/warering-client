import { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { Outlet, useNavigate } from "react-router-dom";

function RequireUser() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/home");
      return
    }
  
    const isAdmin = user?.roles.filter((role) => {
      return role === "admin";
    }).length;
    if (isAdmin) {
      navigate("/admin");
      return
    }
  }, [user]);

  return <Outlet />;
}

export default RequireUser;
