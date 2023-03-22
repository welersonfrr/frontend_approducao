import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { motion } from "framer-motion";

interface AlertBoxProps {
  mensagem: string;
}

const AlertBox: React.FC<AlertBoxProps> = ({ mensagem }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="z-50 w-300 h- min-h-[3.5rem] py-1 fixed bottom-4 flex flex-row items-center justify-between bg-red-400"
    >
      <MdErrorOutline className="mx-4 text-2xl" />
      <div className="w-full h-auto flex items-center justify-center">
        <p className="">{mensagem}</p>
      </div>
    </motion.div>
  );
};

export default AlertBox;
