import { useNavigate } from "react-router-dom";

interface IProps {
  setIsAccountUserDrawerOpen: (active: boolean) => void;
  isAccountUserDrawerOpen: boolean;
}
function BigNavbar(props: IProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fff] w-[100%] p-3 flex justify-between shadow-sm">
      <button
        onClick={() => {
          navigate("/home");
        }}
        className="text-[#1d4469] font-bold text-[25px] pl-[5.5rem] flex justify-center sm:pl-2"
      >
        WR
      </button>
      <div className=" flex items-center pr-[3rem] sm:pr-2">
        <div className="text-[14.5px] sm:hidden">Admin </div>
        <img
          src={
            "https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg"
          }
          className="ml-5 w-[42px] h-[42px] object-cover rounded-[100px]"
          onClick={() => {
            props.setIsAccountUserDrawerOpen(!props.isAccountUserDrawerOpen);
          }}
        ></img>
      </div>
    </div>
  );
}

export default BigNavbar;
