import { motion } from "framer-motion";
import React from "react";
import { MdKeyboardBackspace, MdRefresh } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MenuBar = ({ back }: any, { refresh }: any) => {
  const navigate = useNavigate();
  return (
    <div className="w-[1024px] flex justify-between flex-row gap-4 mt-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="w-auto h-auto"
        onClick={() => navigate(back)}
      >
        <MdKeyboardBackspace className="w-14 h-14" />
      </motion.button>
    </div>
  );
};

export default MenuBar;
