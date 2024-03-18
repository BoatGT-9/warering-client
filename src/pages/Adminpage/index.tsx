import React, { useState } from "react";
import BigNavbar from "./BigNavbar";
import NavDialog from "./NavDialog";
import NavLinks from "./NavLinkSidebar";
import FormControl from "./FormControl";
import { IoSearchOutline } from "react-icons/io5";
import FormRow from "./FormRow";
import Wrapper from "../../assets/wrappers/Dashboard";
import { Button } from "@mui/material";
import { RiMenu2Fill } from "react-icons/ri";

const Admin = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isAccountUserDrawerOpen, setIsAccountUserDrawerOpen] =
    useState<boolean>(false);
  const [isActive, setActive] = useState(true);

  const dashboard_list = [1, 2, 3, 4, 5];

  const [values, setValues] = useState({
    search_user: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleActive = () => {
    setActive(!isActive);
  };
  return (
    <Wrapper>
      <BigNavbar
        isAccountUserDrawerOpen={isAccountUserDrawerOpen}
        setIsAccountUserDrawerOpen={setIsAccountUserDrawerOpen}
      />
      <div className=" flex h-[100vh]">
        <NavLinks />
        <NavDialog
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
        <div className="m-[3rem] top-[4rem] w-[100%] flex h-fit flex-col sm:m-0 sm:my-[3rem]">
          <button
            onClick={() => {
              setIsDrawerOpen(true);
            }}
            className="hidden p-1 w-fit h-fit relative sm:block text-[#8f8f8f] mb-6"
            id="small-open-sidebar-btn"
          >
            <RiMenu2Fill className="text-[23px]" />
          </button>

          <div className="flex w-[100%] justify-between">
            <div className="text-[23px] text-[#1d4469] font-bold mb-10">
              User List
              <div className=" text-[16px] text-gray-400 font-normal ">
                Admin Dashboard
              </div>
            </div>
          </div>

          <div className="bg-white py-8 px-10 shadow-md rounded-md">
            <div className=" w-[100%] justify-between flex items-center sm:flex-col">
              <div className="w-[330px] relative items-center flex sm:w-[100%]">
                <FormRow
                  type="text"
                  name="search_user"
                  labelText="search user"
                  value={values.search_user}
                  handleChange={handleChange}
                  marginTop="mt-[0.2rem]"
                />
                <IoSearchOutline className="absolute text-[#1d4469] end-0 text-[20px]" />
              </div>
              <div className="flex gap-3 sm:w-[100%] ">
                <div className="pb-2 sm:w-[100%]">
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue="US"
                  >
                    <option>Sort by Date</option>
                    <option value="US">Date</option>
                    <option value="CA">Date</option>
                    <option value="FR">Date</option>
                    <option value="DE">Date</option>
                  </select>
                </div>
                <div className="pb-2 sm:w-[100%]">
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue="US"
                  >
                    <option>Filter by</option>
                    <option value="US">Filter</option>
                    <option value="CA">Filter</option>
                    <option value="FR">Filter</option>
                    <option value="DE">Filter</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-auto rounded-lg shadow block sm:shadow-none">
              <table className="w-full">
                <thead className="border-b-2 border-gray-200 sm:hidden">
                  <tr>
                    <th className=" w-[20%]  text-center text-sm font-semibold tracking-wide ">
                      Username
                    </th>
                    <th className="w-[20%]  text-center text-sm font-semibold tracking-wide ">
                      FirstName
                    </th>
                    <th className=" w-[20%]  text-center text-sm font-semibold tracking-wide ">
                      LastName
                    </th>
                    <th className=" w-[20%]  text-center text-sm font-semibold tracking-wide ">
                      Email
                    </th>
                    <th className=" w-[20%]  text-center text-sm font-semibold tracking-wide ">
                      Status
                    </th>
                  </tr>
                </thead>
                {/* <div className="font-bold hidden mr-3 sm:mb-2 sm:block text-gray-600"> */}
                <tbody className="divide-y divide-gray-100">
                  {dashboard_list.map((i) => {
                    return (
                      <tr
                        key={i}
                        className="sm:flex sm:flex-col sm:my-5 sm:border-[1px] sm:rounded-lg sm:shadow-md overflow-hidden hover:bg-[#ddd] sm:hover:bg-[#fff] hover:shadow-lg transition ease-in delay-10"
                      >
                        <td className=" cursor-pointer p-3 text-sm text-[#878787] whitespace-nowrap text-center sm:text-start sm:bg-[#1966fb] sm:text-white flex justify-center ">
                          Username
                        </td>
                        <img
                          src="https://img.freepik.com/free-psd/3d-illustration-person-with-long-hair_23-2149436197.jpg?w=740&t=st=1708260597~exp=1708261197~hmac=6e04022c7ee16156ca21397efa80e383f0a513a6abc241afc626e3c6774b120d"
                          alt=""
                          className="  mt-2 h-12 w-12 flex flex-col mx-auto items-center justify-center"
                        />
                        <td className="p-3 text-sm text-[#878787] whitespace-nowrap text-center sm:text-start mx-auto">
                          <div className="font-bold hidden mr-3 sm:mb-2 sm:block text-gray-600 text-center">
                            FirstName
                          </div>
                          <div className="mx-auto">FirstName</div>
                        </td>
                        <td className="p-3 text-sm text-[#878787] whitespace-nowrap text-center sm:text-start mx-auto ">
                          <div className="font-bold hidden mr-3 sm:mb-2 sm:block text-gray-600 text-center">
                            LastName
                          </div>
                          LastName
                        </td>
                        <td className="p-3 text-sm text-[#878787] whitespace-nowrap text-center sm:text-start mx-auto justify-items-center item-center ">
                          <div className="font-bold hidden mr-3 sm:mb-2 sm:block text-gray-600 text-center ">
                            Email
                          </div>
                          <div className="mx-auto">email@test.net</div>
                        </td>
                        <td className=" p-3 text-sm text-[#878787] whitespace-nowrap text-center sm:text-start mx-auto">
                          <div className=" font-bold hidden mr-3 sm:mb-2 sm:block text-gray-600 text-center ">
                            Action
                          </div>
                          <div className="flex justify-center sm:justify-start">
                            <Button
                              onClick={handleActive}
                              variant="contained"
                              style={{
                                background: isActive ? "#1966FB" : "#DC3546",
                              }}
                            >
                              {isActive ? "is Active" : "in Active"}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end items-center w-[100%] mt-4">
              <div className="mr-3 text-[12.4px]">1-5 of items</div>
              <div className="flex gap-2">
                <div className="border-[1px] text-[#7a7a7a] border-[#cccccc] rounded-md w-[30px] h-[30px] flex items-center justify-center">
                  {"<"}
                </div>
                <div className="bg-[#1966fb] text-[13.5px]  text-white border-[1px] rounded-md w-[30px] h-[30px] flex items-center justify-center">
                  1
                </div>
                <div className="border-[1px] text-[13.5px] text-[#7a7a7a] border-[#cccccc] rounded-md w-[30px] h-[30px] flex items-center justify-center">
                  2
                </div>
                <div className="border-[1px] text-[13.5px] text-[#7a7a7a] border-[#cccccc] rounded-md w-[30px] h-[30px] flex items-center justify-center">
                  {">"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Admin;
