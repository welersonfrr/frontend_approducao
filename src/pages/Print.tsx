import React, { MutableRefObject, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { MdKeyboardBackspace, MdPrint } from "react-icons/md";
import { motion } from "framer-motion";
import DataSheet from "../components/DataSheet";
import { useStateValue } from "../context/StateProvider";

const Print = () => {
  const [{ user, apData }, dispatch] = useStateValue();
  const elementRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username == null) {
      navigate("/login");
    }
    if (apData.codigo === null) {
      navigate("/");
    }
    const divElement = elementRef.current;
  }, []);

  const handlePrint = useReactToPrint({
    content: () => elementRef.current,
    documentTitle: "titulo",
  });

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary gap-2">
      <div className=" flex flex-row gap-[30rem]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="w-auto h-auto"
          onClick={() => navigate("/")}
        >
          <MdKeyboardBackspace className="w-14 h-14" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-row items-center justify-center gap-3 p-4 m-4 bg-slate-800 text-white rounded-lg uppercase font-bold drop-shadow-2xl"
          onClick={handlePrint}
        >
          <MdPrint className="text-2xl" />
          <p>Imprimir</p>
        </motion.button>
      </div>
      <div
        ref={elementRef}
        className="flex flex-col items-center justify-center gap-8 pt-10"
      >
        <DataSheet data={apData} />
        <DataSheet data={apData} />
      </div>
    </div>
  );
};

export default Print;
