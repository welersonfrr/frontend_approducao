import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  MdSearch,
  MdAccountCircle,
  MdLogout,
  MdOutlineInsertChartOutlined,
  MdCheckCircleOutline,
} from "react-icons/md";
import { motion } from "framer-motion";
import AlertBox from "../components/AlertBox";
import axios from "axios";
import SpinnerLoading from "../components/SpinnerLoading";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { Navigate, useNavigate } from "react-router-dom";
import { initialState } from "../context/initialState";
import { config } from "../utils/config";
import MachineRow from "../components/MachineRow";

const SearchOp = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [showAlert, setshowAlert] = useState(false);
  const [mensagem, setmensagem] = useState("");
  const [loading, setloading] = useState(false);
  const [popupMenu, setPopupMenu] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username == null) {
      navigate("/login");
    }
  }, [user]);

  const handleLogout = () => {
    dispatch({
      type: actionType.SET_USER,
      user: initialState.user,
    });
  };

  const handleMenu = () => {
    setPopupMenu(!popupMenu);
  };

  const handlePageDados = () => {
    navigate("/data");
  };
  const handlePageConfirmation = () => {
    navigate("/confirmation");
  };

  const trowError = (msgError: string) => {
    setmensagem(msgError);
    setshowAlert(true);
    setloading(false);
    setTimeout(() => {
      setshowAlert(false);
    }, 3000);
  };

  const search = async () => {
    setloading(true);
    if (ref.current?.value === "") {
      trowError("Por favor forneça uma OP");
    } else {
      try {
        const result = await axios.get(
          `http://${config.IP_SERVER}:${config.PORT}/order/op?op=${ref.current?.value}&filial=${user.filial}`
        );

        dispatch({
          type: actionType.SET_OP,
          opData: result.data.data,
        });

        setloading(false);
        if (ref.current != null) {
          ref.current.value = "";
        }
        navigate("/production");
      } catch (error: any) {
        setloading(false);
        if (error.response?.status === 404) {
          trowError("OP não encontrada.");
        } else {
          trowError(
            `${error.toString()} - Contate o administrador do sistema.`
          );
          console.log(error.toString());
        }

        if (ref.current != null) {
          ref.current.value = "";
        }
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-evenly">
      <MachineRow />
      <div className="w-auto h-auto flex flex-row items-center justify-center bg-gray-50 rounded-xl border-4 border-gray-400">
        <input
          type="number"
          max={999999}
          placeholder="Buscar OP..."
          className="p-4 focus:outline-none bg-transparent focus:bg-transparent"
          ref={ref}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search();
            }
          }}
        />
        <MdSearch className=" m-4 cursor-pointer" onClick={search} />
      </div>
      {showAlert && <AlertBox mensagem={mensagem} />}
      {/* loading spinner */}
      {loading && (
        <div className="absolute w-screen h-screen flex items-center justify-center backdrop-blur-sm bg-white/30">
          <SpinnerLoading />
        </div>
      )}
      <div className="absolute top-4 right-4">
        <motion.button whileTap={{ scale: 0.75 }} onClick={handleMenu}>
          <MdAccountCircle className="w-10 h-10" />
        </motion.button>
      </div>
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
            {user.controller && (
              <div
                className="flex flex-row p-2 justify-start items-center cursor-pointer gap-1"
                onClick={handlePageConfirmation}
              >
                <MdCheckCircleOutline />
                <p>Confirmação</p>
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
    </div>
  );
};

export default SearchOp;
