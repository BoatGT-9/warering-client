import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { NavLink } from "react-router-dom";
import { PiUserList } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface INavDialog {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (active: boolean) => void;
}

export default function SmallNavLinks(props: INavDialog) {
  const { isDrawerOpen, setIsDrawerOpen } = props;

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div>
      <Dialog
        open={isDrawerOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullScreen
        className="m-5 hidden sm:block"
      >
        <DialogContent>
          <DialogContentText
            className="p-3 relative "
            component={"div"}
            variant={"body2"}
          >
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-2 right-3 text-[21px]"
            >
              X
            </div>
            <NavLink
              to="/device-list"
              key={3}
              onClick={() => {}}
              className={({ isActive }) =>
                `flex pl-10 p-5 items-center text-[14px] ${
                  isActive ? "text-[#1966fb]" : "text-[#1d4469]"
                }`
              }
            >
              <div className=" bg-red-700 rounded-xl items-center">
                <NavLink className="flex pl-10 p-5 items-center text-[14px]  ">
                  <span className=" flex mr-3 text-[13px]  text-white">
                    <PiUserList className="flex mr-3 text-[20px]  " />
                    UserList
                  </span>
                </NavLink>
              </div>
              <div className="absolute mt-[35cm]   ">
                <button className="flex pl-10 p-5 items-center"> 
                <CiLogout className="mr-3 text-[16px]"/>
                Log Out</button>
              </div>
              {/* <FiCpu className="mr-3 text-[16px]" /> */}
              {/* <div className=" flex items-center logout  ">
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
              </div> */}
            </NavLink>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
