import React from "react";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { CiLogout } from "react-icons/ci";
import { PiUserList } from "react-icons/pi";

const NavLinks = () => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { user, token } = useAppSelector((state) => state.auth);

  const signOut = async () => {
    dispatch(logout());
    await axiosPrivate.post(
      `/auth/logout`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  return (
    <div className="bg-[#fff] h-auto w-[300px] shadow-md pt-5 w-sm flex flex-col sm:hidden justify-center">
      <div className="flex flex-col">
        <Box p={2} width="250px" textAlign="left" role="presentation">
          <Typography
            component="div"
            className="p-5 pb-0 flex flex-col justify-between"
          >
            <div className="bg-red-700 rounded-xl">
              <NavLink
                className="flex pl-10 p-5 items-center text-[14px]  "
              >
                <span className=" flex mr-3 text-[13px]  text-white">
                  <PiUserList className="flex mr-3 text-[20px] " />
                  UserList
                </span>
              </NavLink>
            </div>
            <div className=" flex items-center logout">
              <button
                key={6}
                onClick={() => {
                  signOut();
                }}
                className="flex  pl-10 p-5 items-center text-[13px] text-[#962e39]"
              >
                <CiLogout className="mr-3 text-[16px]" />
                Logout
              </button>
            </div>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default NavLinks;
