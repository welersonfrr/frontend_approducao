import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  MdAccountCircle,
  MdCheckCircleOutline,
  MdKeyboardBackspace,
  MdLogout,
  MdRefresh,
} from "react-icons/md";
import axios from "axios";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { initialState } from "../context/initialState";
import ResumeProduction from "../components/ResumeProduction";
import SpinnerLoading from "../components/SpinnerLoading";
import { config } from "../utils/config";

const TotalProduction = () => {
  const [popupMenu, setPopupMenu] = useState(false);
  const [loading, setloading] = useState(true);
  const [qtdOp, setQtdOp] = useState<number>(5);
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [showingData, setShowingData] = useState<any>();

  const data = [
    {
      id: "7cx7pba69skdxto",
      numero: "5",
      usuario: "teste",
      dt_inicio: "28/03/2023",
      hr_inicio: "14:24",
      dt_fim: "28/03/2023",
      hr_fim: "15:31",
      quantidade: "20",
    },
    {
      id: "7cx7pba69skdxto",
      numero: "5",
      usuario: "teste",
      dt_inicio: "28/03/2023",
      hr_inicio: "14:24",
      dt_fim: "28/03/2023",
      hr_fim: "15:31",
      quantidade: "20",
    },
  ];

  const [detailsData, setDetailsData] = useState<any>(data);
  const search = async () => {
    try {
      await axios
        .get(
          `http://${config.IP_SERVER}:${config.PORT}/order/production/resume?filial=${user.filial}&qtd=${qtdOp}`
        )
        .then((response) => {
          setShowingData(response);
        });
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  useEffect(() => {
    if (user.username == null) {
      navigate("/login");
    }
    if (user.controller === false) {
      navigate("/");
    }
    search();
  }, []);

  const handleShowMore = () => {
    setloading(true);
    console.log(`qtd ${qtdOp}`);
    const qtd = qtdOp + 1;
    console.log(`qtd ${qtd}`);
    setQtdOp(qtd);
    search();
  };

  const handleMenu = () => {
    setPopupMenu(!popupMenu);
  };

  const handlePageConfirmation = () => {
    navigate("/confirmation");
  };

  const handleLogout = () => {
    dispatch({
      type: actionType.SET_USER,
      user: initialState.user,
    });
  };

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
                setloading(true);
                search();
              }}
            >
              <MdRefresh className="w-14 h-14" />
            </motion.button>
          </div>
        </div>
        {showingData !== undefined &&
          showingData.data.data.map((data: any) => {
            return <ResumeProduction data={data} key={data.op} />;
          })}
        <div className="w-auto h-auto my-4 flex flex-row items-center justify-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.1 }}
            type="button"
            className="p-3 bg-slate-800 text-white rounded-lg uppercase font-bold drop-shadow-2xl"
            onClick={handleShowMore}
          >
            Mostrar mais. . .
          </motion.button>
        </div>

        {popupMenu && (
          <div className="w-auto min-w-[120px] h-auto bg-white drop-shadow-md absolute top-14 right-4">
            <div className="w-full h-full flex flex-col gap-3 p-1">
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

export default TotalProduction;
