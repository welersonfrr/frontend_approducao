import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  MdAccountCircle,
  MdKeyboardBackspace,
  MdLogout,
  MdOutlineInsertChartOutlined,
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
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [showingData, setShowingData] = useState<any>();

  const search = async () => {
    try {
      await axios
        .get(
          `http://${config.IP_SERVER}:${config.PORT}/order/production/resume?filial=${user.filial}&qtd=5`
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

  const handleMenu = () => {
    setPopupMenu(!popupMenu);
  };

  const handleLogout = () => {
    dispatch({
      type: actionType.SET_USER,
      user: initialState.user,
    });
  };

  return (
    <div className="w-screen h-full flex flex-col items-center justify-start bg-primary">
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
          {/* <div className="w-auto h-auto flex flex-row items-center justify-center bg-gray-50 rounded-xl border-4 border-gray-400">
            <input
              type="number"
              max={999999}
              placeholder="Buscar OP..."
              className="p-4 focus:outline-none bg-transparent focus:bg-transparent"
              ref={ref}
              autoFocus
            />
            <MdSearch
              className=" m-4 cursor-pointer"
              // onClick={search}
            />
          </div> */}
        </div>
        {/* <ResumeProduction data={} /> */}
        {showingData !== undefined &&
          showingData.data.data.map((data: any) => {
            return <ResumeProduction data={data} key={data.op} />;
          })}

        {popupMenu && (
          <div className="w-auto min-w-[120px] h-auto bg-white drop-shadow-md absolute top-14 right-4">
            <div className="w-full h-full flex flex-col gap-3 p-1">
              {user.controller && (
                <div
                  className="flex flex-row p-2 justify-start items-center cursor-pointer gap-1"
                  // onClick={handlePageDados}
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

export default TotalProduction;
