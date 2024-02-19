import { useAppDispatch , useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";

function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { user , token} = useAppSelector((state) => state.auth)
  return (
    <div className="flex flex-col">
      <div className="mb-5 mt-5">AdminDashboard</div>
      <div>
        Role :{" "}
        {user?.roles.map((role) => {
          return role;
        })}
      </div>
      <button
        id="logout-btn"
        onClick={async () => {
          const responseLogout = await dispatch(logout(token));
        }}
        className="bg-red-500 text-white px-5 w-[200px] py-2 rounded-md"
      >
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
