import React, { useEffect, useState } from "react";
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdKeyboardBackspace,
} from "react-icons/md";
import InputDisable from "../components/InputDisable";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SpinnerLoading from "../components/SpinnerLoading";
import { actionType } from "../context/reducer";

const ProductionDetails = () => {
  const [showConfirm, setshowConfirm] = useState(false);
  const [loading, setloading] = useState(false);
  const [{ user, opData }, dispatch] = useStateValue();

  const [value, setvalue] = useState(Number(opData.qtdpad));
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username == null) {
      navigate("/login");
    }
    if (opData.codigo === null) {
      navigate("/");
    }
  }, []);

  const confirmProduction = async () => {
    setshowConfirm(false);
    setloading(true);

    try {
      const result = await axios.post(
        `http://localhost:3380/order/production`,
        {
          filial: user.filial,
          op: opData.op,
          codigo: opData.codigo,
          produto: opData.produto,
          lote: opData.lote,
          dt_validade: opData.dtvalidade,
          quantidade: value,
          usuario: user.username,
        }
      );

      dispatch({
        type: actionType.SET_AP,
        apData: result.data.data,
      });

      setloading(false);
      navigate("/print");
    } catch (error: any) {
      console.log(error.toString());
      setloading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="w-auto h-auto"
          onClick={() => navigate("/")}
        >
          <MdKeyboardBackspace className="w-14 h-14" />
        </motion.button>
        <InputDisable title={"OP"} value={opData.op ?? ""} />
        <InputDisable title={"CODIGO"} value={opData.codigo ?? ""} />
        <InputDisable title={"PRODUTO"} value={opData.produto ?? ""} />
        <InputDisable title={"LOTE"} value={opData.lote ?? ""} />

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
                  onClick={confirmProduction}
                >
                  confirmar
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
      {/* loading spinner */}
      {loading && (
        <div className="absolute w-screen h-screen flex items-center justify-center backdrop-blur-sm bg-white/30">
          <SpinnerLoading />
        </div>
      )}
    </div>
  );
};

export default ProductionDetails;
