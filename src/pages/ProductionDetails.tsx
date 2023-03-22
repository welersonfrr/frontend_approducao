import React, { useState } from "react";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import InputDisable from "../components/InputDisable";
import { motion } from "framer-motion";

const ProductionDetails = () => {
  const [value, setvalue] = useState(0);
  const [showConfirm, setshowConfirm] = useState(false);

  const data = {
    op: "035898",
    codigo: "PA03069904302",
    nome: "FAR. DOM. MARGARIDA PAPEL 5X5",
    lote: "03L5896-15",
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div>
        <InputDisable title={"OP"} value={data.op} />
        <InputDisable title={"CODIGO"} value={data.codigo} />
        <InputDisable title={"PRODUTO"} value={data.nome} />
        <InputDisable title={"LOTE"} value={data.lote} />

        <div className="w-auto h-auto flex flex-row items-center justify-center ">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setvalue(value + 1)}
            className="drop-shadow-md"
          >
            <MdAddCircleOutline className="w-14 h-14 cursor-pointer" />
          </motion.button>
          <div className="w-auto min-w-210 h-auto flex flex-row items-center justify-center bg-gray-50 rounded-xl border-4 border-gray-400 m-6 p-4 text-[4rem]">
            <input
              type="number"
              value={value}
              min={0}
              onChange={(e) => setvalue(Number(e.target.value))}
              className="w-24 focus:outline-none bg-transparent focus:bg-transparent"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setvalue(value - 1)}
            className="drop-shadow-md"
          >
            <MdRemoveCircleOutline className="w-14 h-14 cursor-pointer" />
          </motion.button>
        </div>

        <div className="w-auto h-auto flex flex-row items-center justify-center ">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.1 }}
            type="button"
            className="p-6 bg-slate-800 text-white rounded-lg uppercase font-bold drop-shadow-2xl"
            onClick={() => setshowConfirm(true)}
          >
            apontar
          </motion.button>
        </div>
      </div>
      {/* Alerta */}
      {showConfirm && (
        <div className="z-50 absolute w-full h-full backdrop-blur-sm bg-white/30">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              className="p-10 bg-white rounded-2xl flex flex-col items-center justify-center gap-16 drop-shadow-2xl"
            >
              <p>Deseja confirmar as informações?</p>
              <div className="w-[300px] h-auto flex items-center justify-between">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.1 }}
                  className="p-3 bg-red-500 hover:bg-gradient-to-b hover:from-red-500 hover:to-red-300 rounded-md text-white uppercase font-semibold"
                  onClick={() => {
                    setshowConfirm(false);
                  }}
                >
                  cancelar
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.1 }}
                  className="p-3 bg-green-500 hover:bg-gradient-to-b hover:from-green-500 hover:to-green-300 rounded-md text-white uppercase font-semibold"
                  onClick={() => {
                    setshowConfirm(false);
                  }}
                >
                  confirmar
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionDetails;
