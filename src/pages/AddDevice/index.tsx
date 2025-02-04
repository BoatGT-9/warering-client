import {
  BigNavbar,
  FormRow,
  NavLinkSidebar,
  NavDialog,
  AccountUserDrawer,
  FormSelect,
} from "../../components";
import Wrapper from "../../assets/wrappers/AddDevice";
import { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { Button } from "@mui/material";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { SnackBar } from "../../components";
import { Alert } from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAppDispatch } from "../../app/hooks";

interface IDeviceInfo {
  nameDevice: string;
  usernameDevice: string;
  password: string;
  description: string;
  topics: string;
  qos: number;
  retain: boolean;
  isSaveData: boolean;
}

function AddDevice() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [snackBarText, setSnackBarText] = useState<string>("");
  const [snackBarType, setSnackBarType] = useState<
    "error" | "success" | "info" | "warning"
  >("error");
  const [isAccountUserDrawerOpen, setIsAccountUserDrawerOpen] =
    useState<boolean>(false);

  const [timeoutIds, setTimeoutIds] = useState<any>([]);

  const AddDevice = async (deviceInfo: IDeviceInfo) => {
    setIsLoading(true);
    try {
      await axiosPrivate.post(`/devices`, deviceInfo);
      setIsLoading(false);
      setShowSnackBar(true);
      setSnackBarType("success");
      setSnackBarText("Your device has been added");
      clearAlert();
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      const msg =
        typeof err?.response?.data?.message === "object"
          ? err?.response?.data?.message[0]
          : err?.response?.data?.message;
      setShowSnackBar(true);
      setSnackBarType("error");
      setSnackBarText(msg);
      clearAlert();
      setIsLoading(false);
    }
  };

  // Function to clear all running timeouts
  const clearAllTimeouts = () => {
    timeoutIds.forEach((timeoutId: any) => clearTimeout(timeoutId));
    setTimeoutIds([]); // Clear the timeout IDs from state
  };
  // Function to set a new timeout
  const clearAlert = () => {
    clearAllTimeouts(); // Clear existing timeouts before setting a new one
    const newTimeoutId = setTimeout(() => {
      // Your timeout function logic here
      setShowSnackBar(false);
    }, 3000);
    setTimeoutIds([newTimeoutId]); // Store the new timeout ID in state
  };
  const [values, setValues] = useState({
    nameDevice: "",
    usernameDevice: "",
    password: "",
    description: "",
    topics: "",
  });
  const [retain, setRetain] = useState<boolean>(true);
  const options = [0, 1, 2];
  const [qos, setQos] = useState<number>(options[0]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    const { nameDevice, usernameDevice, password, description, topics } =
      values;
    if (
      !nameDevice ||
      !usernameDevice ||
      !password ||
      !description ||
      !topics
    ) {
      setShowSnackBar(true);
      setSnackBarType("error");
      setSnackBarText("Please provide all value");
      clearAlert();
      return;
    }
    const deviceInfo: IDeviceInfo = {
      nameDevice,
      usernameDevice,
      password,
      description,
      topics,
      qos: Number(qos),
      retain,
      isSaveData: true,
    };
    await AddDevice(deviceInfo);
  };

  return (
    <Wrapper>
      <AccountUserDrawer
        isAccountUserDrawerOpen={isAccountUserDrawerOpen}
        setIsAccountUserDrawerOpen={setIsAccountUserDrawerOpen}
      />
      <BigNavbar
        isAccountUserDrawerOpen={isAccountUserDrawerOpen}
        setIsAccountUserDrawerOpen={setIsAccountUserDrawerOpen}
      />
      <div className="flex h-[100vh]">
        <NavLinkSidebar />
        <NavDialog
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
        <div className="m-[3rem] top-[5rem] w-[100%] h-fit flex flex-col sm:mx-[1rem]">
          <div className="flex justify-between">
            <button
              onClick={() => {
                setIsDrawerOpen(true);
              }}
              className="hidden p-1 w-fit h-fit relative sm:block text-[#8f8f8f] mb-6"
              id="small-open-sidebar-btn"
            >
              <RiMenu2Fill className="text-[23px]" />
            </button>

            <button
              onClick={() => {
                navigate("/device-list");
              }}
              className="flex cursor-pointer text-sm text-[#1D4469] font-bold items-center left-0 mb-10"
            >
              <IoArrowBackSharp className="text-sm mr-2" />
              Back
            </button>
          </div>

          <div className="flex w-[100%] justify-between sm:hidden">
            <div className="text-[23px] text-[#1d4469] font-bold mb-10">
              Add Dashboard
            </div>
          </div>
          <div className="bg-white shadow-md py-8 px-10 rounded-md">
            <div className=" w-[100%] flex flex-col">
              <div className="text-[18px] font-bold text-[#1D4469]">
                Device Details
              </div>
              <div className="text-sm text-[#a4a4a4] mt-3">
                Fill in the information to add a Dashboard from your device.
              </div>
            </div>

            {showSnackBar && snackBarType && (
              <div className="hidden sm:block">
                <Alert
                  severity={snackBarType}
                  sx={{
                    fontSize: "11.8px",
                    alignItems: "center",
                    marginTop: "2rem",
                  }}
                >
                  {snackBarText}
                </Alert>
              </div>
            )}

            <div className="flex gap-10 mt-9 sm:flex-col sm:gap-0">
              <div className="w-[100%]">
                <FormRow
                  type="text"
                  name="nameDevice"
                  labelText="Device name"
                  value={values.nameDevice}
                  handleChange={handleChange}
                  marginTop="mt-[0.2rem]"
                />
              </div>
              <div className="w-[100%]">
                <FormRow
                  type="text"
                  name="usernameDevice"
                  labelText="username device"
                  value={values.usernameDevice}
                  handleChange={handleChange}
                  marginTop="mt-[0.2rem]"
                />
              </div>
            </div>
            <div className="flex gap-10 mt-1 sm:flex-col sm:gap-0">
              <div className="w-[100%]">
                <FormRow
                  type="text"
                  name="password"
                  labelText="password"
                  value={values.password}
                  handleChange={handleChange}
                  marginTop="mt-[0.2rem]"
                />
              </div>
              <div className="w-[100%]">
                <FormRow
                  type="text"
                  name="description"
                  labelText="description"
                  value={values.description}
                  handleChange={handleChange}
                  marginTop="mt-[0.2rem]"
                />
              </div>
            </div>
            <div className=" w-[100%] flex flex-col">
              <div className="text-[17px] font-bold text-[#1D4469]">
                Publish Detail
              </div>
            </div>
            <div className="flex gap-10 mt-2 sm:flex-col sm:gap-0">
              <div className="w-[100%]">
                <FormRow
                  type="text"
                  name="topics"
                  labelText="topic device"
                  value={values.topics}
                  handleChange={handleChange}
                  marginTop="mt-[0.2rem]"
                />
              </div>
              <div className="w-[100%]">
                <FormSelect
                  name="Qos"
                  labelText="Qos"
                  options={options}
                  setValue={setQos}
                  value={qos}
                  marginTop="mt-[0.2rem]"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label
                htmlFor="link-checkbox"
                className="ms-2 text-sm mr-2 font-medium text-[#1D4469] dark:text-gray-300"
              >
                Retain
              </label>
              <input
                id="link-checkbox"
                type="checkbox"
                name="retain"
                onChange={() => setRetain((prev) => !prev)}
                checked={retain}
                className=" w-[15px] h-[15px] text-[#2CB1BC] bg-gray-100 border-gray-300 rounded focus:ring-[#ffffff00] dark:focus:ring-[#2CB1BC] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="w-[360px] sm:w-[100%]">
              <Button
                onClick={() => {
                  onSubmit();
                }}
                style={{
                  textTransform: "none",
                  width: "100%",
                  height: "39px",
                  marginTop: "1.5rem",
                }}
                sx={{
                  bgcolor: "#1966fb",
                  ":hover": {
                    bgcolor: "#10269C",
                  },
                  ":disabled": {
                    color: "#fff",
                  },
                }}
                variant="contained"
                id="setup-user-submit"
                disabled={isLoading}
              >
                { isLoading ? <div className="loader"></div>: "Add Device"}
              </Button>
            </div>
            {showSnackBar && (
              <div className="block sm:hidden">
                <SnackBar
                  severity={snackBarType}
                  showSnackBar={showSnackBar}
                  snackBarText={snackBarText}
                  setShowSnackBar={setShowSnackBar}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default AddDevice;
