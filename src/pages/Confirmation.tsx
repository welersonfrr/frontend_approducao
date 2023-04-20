import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MdAccountCircle,
  MdKeyboardBackspace,
  MdLogout,
  MdOutlineInsertChartOutlined,
  MdRefresh,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { initialState } from "../context/initialState";
import SpinnerLoading from "../components/SpinnerLoading";
import axios from "axios";
import { config } from "../utils/config";

const Confirmation = () => {
  const inputObs = useRef<HTMLInputElement>(null);
  const [popupMenu, setPopupMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConfirmationProd, setShowConfirmationProd] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const [nonConfirmedData, setNonConfirmedData] = useState<any>();

  let userData = {
    id: "000",
    op: "005548",
    codigo: "PA02970502603",
    produto: "FAR. TRIGO IND. BELARINA INTEIRA PAES INDUSTRIAIS GRANEL KG",
    lote: "030623-065",
    numero: "6",
    quantidade: "53",
    dt_inicio: "27/03/2023",
    hr_inicio: "15:34",
    dt_fim: "27/03/2023",
    hr_fim: "16:15",
  };
  const [dataShowing, setdataShowing] = useState(userData);

  const navigate = useNavigate();

  const getAllData = async () => {
    axios
      .get(
        `http://${config.IP_SERVER}:${config.PORT}/order/production/confirmation`,
        {
          params: {
            filial: user.filial,
          },
        }
      )
      .then((response) => setNonConfirmedData(response.data))
      .finally(() => setLoading(false));
  };

  const postConfirmData = async (obs: any) => {
    setLoading(true);
    axios
      .post(
        `http://${config.IP_SERVER}:${config.PORT}/order/production/confirmation`,
        {
          recId: dataShowing.id,
          obs: obs,
        }
      )
      .then(() => {
        setLoading(true);
        setShowConfirmationProd(false);
      })
      .finally(() => getAllData());
  };

  const handleMenu = () => {
    setPopupMenu(!popupMenu);
  };

  const handlePageDados = () => {
    navigate("/details");
  };

  const handleLogout = () => {
    dispatch({
      type: actionType.SET_USER,
      user: initialState.user,
    });
  };

  const handleConfirmationProd = (production: any) => {
    setdataShowing(production);
    setShowConfirmationProd(true);
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="w-screen h-full min-h-screen flex flex-col items-center justify-start bg-primary">
      <motion.button
        className="absolute top-4 right-4"
        whileTap={{ scale: 0.75 }}
        onClick={handleMenu}
      >
        <MdAccountCircle className="w-10 h-10" />
      </motion.button>
      <div className="w-[1000px] flex flex-col items-center justify-start">
        <div className="w-full flex justify-between flex-row gap-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="w-auto h-auto"
            onClick={() => navigate("/")}
          >
            <MdKeyboardBackspace className="w-14 h-14" />
          </motion.button>
          <div className="flex flex-row">
            <motion.button
              whileHover={{ rotate: 360 }}
              transition={{
                duration: 0.5,
              }}
              onClick={() => {
                setLoading(true);
                getAllData();
              }}
            >
              <MdRefresh className="w-14 h-14" />
            </motion.button>
          </div>
        </div>
        {/* content goes here */}
        <div className="w-[400px] md:w-full h-auto flex flex-col gap-4">
          {nonConfirmedData !== undefined &&
            nonConfirmedData.data.map((production: any) => {
              return (
                <div
                  key={production.op}
                  className="w-full h-full p-2 flex flex-row items-center gap-2 bg-white rounded-lg cursor-pointer"
                  onClick={() => handleConfirmationProd(production)}
                >
                  <div className="rounded-full bg-red-500 w-auto h-full p-2"></div>
                  <p>{production.op}</p>
                  <p>-</p>
                  <p>{production.produto}</p>
                </div>
              );
            })}
        </div>

        {/*  */}
        {showConfirmationProd && (
          <div className="absolute z-50">
            <div className="p-4 flex flex-col gap-2 m-4 bg-white w-auto h-auto">
              <p>OP</p>
              <p className="bg-slate-300 p-4 font-bold">{dataShowing.op}</p>
              <p>Produto</p>
              <p className="bg-slate-300 p-4 font-bold">{dataShowing.codigo}</p>
              <p>Descricao</p>
              <p className="bg-slate-300 p-4 font-bold">
                {dataShowing.produto}
              </p>
              <p>Lote</p>
              <p className="bg-slate-300 p-4 font-bold">{dataShowing.lote}</p>
              <p>Data/Hora Inicio</p>
              <p className="bg-slate-300 p-4 font-bold">
                {dataShowing.dt_inicio} - {dataShowing.hr_inicio}
              </p>
              <p>Data/Hora Fim</p>
              <p className="bg-slate-300 p-4 font-bold">
                {dataShowing.dt_fim} - {dataShowing.hr_fim}
              </p>
              <p>Pallets</p>
              <p className="bg-slate-500 p-4 font-bold text-[1.75rem] text-white">
                {dataShowing.numero}
              </p>
              <p>Total</p>
              <p className="bg-slate-500 p-4 font-bold text-[1.75rem] text-white">
                {dataShowing.quantidade}
              </p>
              <div className="w-auto h-auto flex flex-row bg-gray-50 rounded-xl border-4 border-gray-400">
                <input
                  className="p-4 focus:outline-none bg-transparent focus:bg-transparent"
                  placeholder="Observações"
                  autoFocus
                  ref={inputObs}
                  type="text"
                />
              </div>
              <div className="w-auto h-auto my-4 flex flex-row items-center justify-center gap-9">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.1 }}
                  type="button"
                  className="p-3 bg-slate-800 text-white rounded-lg uppercase font-bold drop-shadow-2xl"
                  onClick={() => setShowConfirmationProd(false)}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.1 }}
                  type="button"
                  className="p-3 bg-slate-800 text-white rounded-lg uppercase font-bold drop-shadow-2xl"
                  onClick={() => postConfirmData(inputObs.current?.value)}
                >
                  Confirmar
                </motion.button>
              </div>
            </div>
          </div>
        )}

        {popupMenu && (
          <div className="w-auto min-w-[120px] h-auto bg-white drop-shadow-md absolute top-14 right-4">
            <div className="w-full h-full flex flex-col gap-3 p-1">
              {user.controller && (
                <div
                  className="flex flex-row p-2 justify-start items-center cursor-pointer gap-1"
                  onClick={handlePageDados}
                >
                  <MdOutlineInsertChartOutlined />
                  <p>Dados</p>
                </div>
              )}
              <div
                className="flex flex-row p-2 justify-start items-center cursor-pointer gap-1"
                onClick={handleLogout}
              >
                <MdLogout />
                <p>Log out</p>
              </div>
            </div>
          </div>
        )}
        {/* loaging data */}
        {loading && (
          <div className="absolute z-50 w-screen h-screen flex items-center justify-center backdrop-blur-sm bg-white/30">
            <SpinnerLoading />
          </div>
        )}
      </div>
    </div>
  );
};

export default Confirmation;
