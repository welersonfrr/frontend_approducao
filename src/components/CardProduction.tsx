import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdNumbers, MdClose } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";
import Details from "./Details";

const CardProduction = ({ prod }: any) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleDetails = () => {
    setShowDetails(true);
  };

  return (
    <div
      key={prod.id}
      className="w-[225px] h-[225px] bg-[#D9D9D9] rounded-[18px] m-2"
    >
      <div className="grid grid-cols-2 p-3 w-full h-full gap-2">
        <div className="col-span-1 w-full h-full bg-white flex items-center justify-center rounded-md">
          <img src={prod.img} alt={prod.cod} />
        </div>
        <div className="col-span-1 w-full h-full flex flex-col justify-between">
          <div className="w-full">
            <p className="text-[14px] font-bold">{prod.op}</p>
            <p className="text-[12px]">{prod.cod}</p>
          </div>
          <div className="w-full flex flex-row gap-1">
            <div className="h-[30px] w-[30px] flex items-center justify-center">
              <img src="/images/pallet.png" alt="" width="auto" height="auto" />
            </div>
            <div className="w-full bg-[#1e293b] text-white flex items-center justify-center p-1 rounded-md">
              {prod.pallet}
            </div>
          </div>
          <div className="w-full flex flex-row gap-1">
            <div className="h-[30px] w-[30px] flex items-center justify-center">
              <MdNumbers />
            </div>
            <div className="w-full bg-[#1e293b] text-white flex items-center justify-center p-1 rounded-md text-sm">
              {prod.total}
            </div>
          </div>
          <div className="w-full">
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              className="w-full bg-[#1e293b] text-white font-bold flex items-center justify-center p-2 rounded-md drop-shadow-md"
              onClick={() => handleDetails()}
            >
              DETALHES
            </motion.button>
          </div>
        </div>
      </div>
      {showDetails && (
        <div className="fixed left-0 top-0 z-10 ">
          <div className="w-screen flex items-center flex-col backdrop-blur-sm bg-white/60">
            <div className="w-[1024px] flex justify-end pt-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                className="w-auto bg-[#1e293b] text-white font-bold flex items-center justify-center p-2 rounded-full drop-shadow-md "
                onClick={() => setShowDetails(false)}
              >
                <MdClose className="text-[30px]" />
              </motion.button>
            </div>
            <Details op={prod.op} filial={prod.filial} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardProduction;
