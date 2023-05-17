import axios from "axios";
import React, { useEffect, useState } from "react";
import { config } from "../utils/config";
import SpinnerLoading from "../components/SpinnerLoading";
import { motion } from "framer-motion";
import CardProduction from "../components/CardProduction";
import {
  MdAccountCircle,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardBackspace,
  MdLogout,
  MdRefresh,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { initialState } from "../context/initialState";
import MenuBar from "../components/MenuBar";

const Productions = () => {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(true);
  const [popupMenu, setPopupMenu] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const [indexMin, setIndexMin] = useState(0);
  const [indexMax, setindexMax] = useState(7);

  const handleGetData = async (status: boolean) => {
    setIndexMin(0);
    setindexMax(7);
    setLoading(true);
    setConfirmed(status);
    if (confirmed === status) {
      setLoading(false);
    }
  };

  const search = async () => {
    console.log("search");

    try {
      await axios
        .get(
          `http://${config.IP_SERVER}:${config.PORT}/order/production?filial=${user.filial}&confirmed=${confirmed}`
        )
        .then((res) => {
          const nwArr = res.data.data.slice(indexMin, indexMax);
          console.log(indexMin);
          console.log(indexMax);

          setData(res.data.data);
          setShowData(nwArr);
          console.log(res.data.data.length);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleChangePage = (opt: string) => {
    // console.log(`${indexMin} ${indexMax}`);
    setLoading(true);

    if (opt === "prev") {
      if (indexMin !== 0) {
        setIndexMin(indexMin - 7);
        setindexMax(indexMax - 7);
      }
    } else {
      setIndexMin(indexMin + 7);
      setindexMax(indexMax + 7);
    }
    console.log(`${indexMin} ${indexMax}`);
    search();
  };

  const handleMenu = () => {
    setPopupMenu(!popupMenu);
  };

  const handleLogout = () => {
    dispatch({
      type: actionType.SET_USER,
      user: initialState.user,
    });
  };

  useEffect(() => {
    search();
  }, [confirmed, indexMin]);

  return (
    <div className="w-screen h-full min-h-screen flex flex-col items-center bg-blue-400">
      {/*  */}
      <MenuBar back={"/"} />
      {/*  */}
      <div className="flex flex-row gap-4">
        <motion.button
          className=""
          whileTap={{ scale: 0.75 }}
          onClick={() => handleChangePage("prev")}
        >
          <MdKeyboardArrowLeft className="w-10 h-10" />
        </motion.button>
        <div className="w-auto h-auto flex flex-col items-center justify-center">
          <p>Páginas</p>
          <p>
            {indexMin} - {indexMax}
          </p>
        </div>
        <motion.button
          className=""
          whileTap={{ scale: 0.75 }}
          onClick={() => handleChangePage("prox")}
        >
          <MdKeyboardArrowRight className="w-10 h-10" />
        </motion.button>
      </div>
      {/*  */}
      <div>
        <motion.button
          className="absolute top-4 right-4"
          whileTap={{ scale: 0.75 }}
          onClick={handleMenu}
        >
          <MdAccountCircle className="w-10 h-10" />
        </motion.button>
      </div>
      <div className="w-full h-auto flex flex-row items-center justify-center gap-2 my-2">
        <div className="w-auto h-auto flex flex-row items-center justify-center ">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            className={`p-4 min-w-250 rounded-lg uppercase  drop-shadow-2xl ${
              confirmed === true
                ? "bg-white border-2 border-slate-800 text-slate-800 font-bold"
                : "bg-slate-800 text-white "
            }`}
            onClick={() => handleGetData(true)}
          >
            confirmados
          </motion.button>
        </div>
        <div className="w-auto h-auto flex flex-row items-center justify-center ">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            className={`p-4 min-w-250 rounded-lg uppercase drop-shadow-2xl ${
              confirmed === false
                ? "bg-white border-2 border-slate-800 text-slate-800 font-bold"
                : "bg-slate-800 text-white"
            }`}
            onClick={() => handleGetData(false)}
          >
            pendentes
          </motion.button>
        </div>
      </div>
      <div className="w-[1024px]">
        {data.length > 0 && (
          <div className="flex flex-col">
            {showData.map((prod: any) => {
              console.log(showData);

              const current = Object.getOwnPropertyNames(prod)[0];
              return (
                <div className="flex flex-col">
                  <p className="text-white">{current}</p>
                  <div className="flex flex-wrap">
                    {prod[current].map((data: any) => {
                      return <CardProduction prod={data} />;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {popupMenu && (
        <div className="w-auto min-w-[120px] h-auto bg-white drop-shadow-md absolute top-14 right-4">
          <div className="w-full h-full flex flex-col gap-3 p-1">
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
  );
};

export default Productions;
