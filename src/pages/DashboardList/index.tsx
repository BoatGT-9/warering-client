import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
    BigNavbar,
    FormRow,
    NavLinks,
    SmallNavLink,
    FormControl,
} from "../../components";
import Wrapper from "../../assets/wrappers/Dashboard";
import { GoCpu } from "react-icons/go";
import { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditDashboardDialog from "./EditDashboardDialog";

function DashboardList() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState<boolean>(false);
    const [isMember, setIsMember] = useState<boolean>(true);
    const { user, token } = useAppSelector((state) => state.auth);

    // mock data 
    const dashboard_list = [1, 2, 3, 4, 5]

    const [values, setValues] = useState({
        search_dashboard: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

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
        <Wrapper>
            <EditDashboardDialog
                isEditDialogOpen={isEditDialogOpen}
                setEditDialogOpen={setEditDialogOpen}
            />
            <BigNavbar />
            <div className="flex">
                <NavLinks />
                <SmallNavLink
                    isDrawerOpen={isDrawerOpen}
                    setIsDrawerOpen={setIsDrawerOpen}
                    setIsMember={setIsMember}
                    isMember={isMember}
                />
                <div className="m-[3rem] relative top-[4rem] w-[100%] h-fit flex flex-col sm:top-[5rem] bg-white shadow-md py-8 px-10 rounded-md sm:m-[3rem] sm:mx-[2rem]">
                    <button
                        onClick={() => {
                            setIsDrawerOpen(true);
                        }}
                        className="hidden p-1 w-fit h-fit left-[0rem] absolute sm:block top-[-7rem] text-[#8f8f8f]"
                        id="small-open-sidebar-btn"
                    >
                        <RiMenu2Fill className="text-[23px]" />
                    </button>
                    <div className="absolute left-0 top-[-4rem] text-[23px] text-[#1d4469] font-bold">
                        Dashboard List
                    </div>
                    <div className="absolute top-[-4rem] text-[23px] text-[#1d4469] font-bold right-0">
                        <Button
                            onClick={() => {
                                navigate("/add-dashboard")
                            }}
                            style={{
                                textTransform: "none",
                                width: "100%",
                                height: "39px",
                            }}
                            sx={{
                                border: 2,
                                fontWeight: "bold",
                                alignItems: "center",
                                fontSize: "12px",
                                color: "#1D4469",
                                ":hover": {},
                                ":disabled": {
                                    color: "#fff",
                                },
                            }}
                            variant="outlined"
                            id="setup-user-submit"
                        >
                            Add Dashboard
                        </Button>
                    </div>
                    <div className=" w-[100%] justify-between flex items-center">
                        <div className="w-[330px] sm:w-[200px]">
                            <FormRow
                                type="text"
                                name="search_dashboard"
                                labelText="search dashboard"
                                value={values.search_dashboard}
                                handleChange={handleChange}
                                marginTop="mt-[0.2rem]"
                            />
                        </div>
                        <FormControl title="Sort by date" options={["Date"]} />
                    </div>
                    <div className="overflow-auto rounded-lg shadow block sm:shadow-none">
                        <table className="w-full">
                            <thead className="border-b-2 border-gray-200 sm:hidden">
                                <tr>
                                    <th className=" w-[25%]  text-center text-sm font-semibold tracking-wide ">
                                        Dashboard Name
                                    </th>
                                    <th className="w-[25%]  text-center text-sm font-semibold tracking-wide ">
                                        Description
                                    </th>
                                    <th className=" w-[25%]  text-center text-sm font-semibold tracking-wide ">
                                        CreatedAt
                                    </th>
                                    <th className=" w-[25%]  text-center text-sm font-semibold tracking-wide ">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            {/* <div className="font-bold hidden mr-3 sm:mb-2 sm:block text-gray-600"> */}
                            <tbody className="divide-y divide-gray-100">
                                {dashboard_list.map(() => {
                                    return <tr className="sm:flex sm:flex-col sm:my-5 sm:border-[1px] sm:rounded-lg sm:shadow-md overflow-hidden hover:bg-[#ddd] sm:hover:bg-[#fff] hover:shadow-lg transition ease-in delay-10">
                                        <td className="p-3 text-sm text-[#878787] whitespace-nowrap text-center sm:text-start sm:bg-[#1966fb] sm:text-white">
                                            Dashboard Name
                                        </td>
                                        <td className="p-3 text-sm text-[#878787] whitespace-nowrap text-center sm:text-start">
                                            <div className="font-bold hidden mr-3 sm:mb-2 sm:block text-gray-600">Description </div>
                                            ภายในบ้าน
                                        </td>
                                        <td className="p-3 text-sm text-[#878787] whitespace-nowrap text-center sm:text-start">
                                            <div className="font-bold hidden mr-3 sm:mb-2 sm:block text-gray-600">CreatedAt</div>
                                            00/00/0000 00:00

                                        </td>
                                        <td className="p-3 text-sm text-[#878787] whitespace-nowrap text-center sm:text-start">
                                            <div className="font-bold hidden mr-3 sm:mb-2 sm:block text-gray-600">Action</div>
                                            <div className="flex justify-center sm:justify-start">
                                                <button onClick={() => {
                                                    setEditDialogOpen(true)
                                                }} className="mr-6 text-[#2E7D32]">
                                                    Edit
                                                </button>
                                                <button className="text-[#dc3546]">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default DashboardList;
