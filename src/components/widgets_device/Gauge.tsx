import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { RxDotsHorizontal } from "react-icons/rx";

export type Id = string | number;

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [],
  datasets: [
    {
      label: "Poll",
      data: [3, 24],
      backgroundColor: ["#00000045", "#1966fb"],
      borderColor: ["#fff", "#fff"],
      circumference: 180,
      rotation: 270,
      borderWidth: 0,
      cutout: "84%",
    },
  ],
};

const options = {};

interface IProp {
  isDeleteConfirmOpen: boolean;
  setIsDeleteConfirmOpen: (active: boolean) => void;
}

function Gauge(props: IProp) {
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);

  return (
    <div
      className="h-[130px] w-[100%] bg-white relative rounded-md shadow-md flex justify-center items-center hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab"
    >
      <div className="absolute left-2 top-2 text-[#1d4469] text-sm">
        Temperature
      </div>
      <div
        onClick={() => {
          setIsOptionOpen(!isOptionOpen);
        }}
        className="absolute right-3 top-2 text-[18px] text-[#7a7a7a] cursor-pointer hover:bg-[#f7f7f7] hover:rounded-md "
      >
        <RxDotsHorizontal />
      </div>
      {isOptionOpen && (
        <div className="bg-white flex flex-col absolute top-6 right-2 border-[1px] rounded-md shadow-sm">
          <button className="text-[#7a7a7a] text-sm px-8 py-2 hover:bg-[#f7f7f7]">
            Edit
          </button>
          <button
            onClick={() => {
              props.setIsDeleteConfirmOpen(!props.isDeleteConfirmOpen);
            }}
            className="text-[#7a7a7a] text-sm px-8 py-2 hover:bg-[#f7f7f7]"
          >
            Delete
          </button>
        </div>
      )}
      <div className="w-[100px]">
        <Doughnut data={data} options={options}></Doughnut>
      </div>
      <div className="w-[100px] text-[#1966fb] absolute text-center bottom-7 text-[12.8px]">
        7.25
      </div>
    </div>
  );
}

export default Gauge;
