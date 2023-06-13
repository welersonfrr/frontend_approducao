import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { MdNumbers, MdOutlineModeEditOutline } from "react-icons/md";
import { config } from "../utils/config";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
import SpinnerLoading from "./SpinnerLoading";
import { actionType } from "../context/reducer";

const MachineItem = (props: any) => {
  if (localStorage.getItem(props.name) === null) {
    localStorage.setItem(props.name, '{"op":"","qtdPad":""}');
  }
  const preData = JSON.parse(localStorage.getItem(props.name)!);
  console.log(preData);
  const [dis, setDis] = useState(true);
  const [res, setRes] = useState<any>(undefined);
  const [opData, setOpData] = useState<any>();
  const qtdPad = useRef<any>(preData.qtdPad);
  const machineOp = useRef<any>(preData.op);
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (user.username == null) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (preData.op !== "") {
      machineOp.current.value = preData.op;
      qtdPad.current.value = preData.qtdPad;
      search();
    }
  }, []);

  useEffect(() => {
    if (machineOp.current.value === "") {
      localStorage.setItem(props.name, '{"op":"","qtdPad":"-"}');
    }
  }, [dis]);

  const change = () => {
    setDis(false);
  };

  const search = async () => {
    setloading(true);
    try {
      const result = await axios.get(
        `http://${config.IP_SERVER}:${config.PORT}/order/machine/?op=${machineOp.current?.value}&filial=${user.filial}`
      );

      setOpData(result.data.data);

      setloading(false);
      if (preData.op !== "" && preData.op === machineOp.current.value) {
        result.data.data["qtdPad"] = preData.qtdPad;
      }
      setRes(result.data.data);
      qtdPad.current.value = Number(result.data.data.qtdPad);
      localStorage.setItem(
        props.name,
        JSON.stringify({
          op: machineOp.current.value,
          qtdPad: qtdPad.current.value,
        })
      );
    } catch (error: any) {
      if (error.response?.status === 404) {
        setRes(undefined);
        qtdPad.current.value = "-";
        setloading(false);
        machineOp.current.value = null;
      } else {
        setRes(undefined);
        setloading(false);
        qtdPad.current.value = 0;
        machineOp.current.value = null;
        console.log(error.toString());
      }
    }
    setDis(true);
  };

  const production = async () => {
    if (res !== undefined) {
      setloading(true);

      try {
        dispatch({
          type: actionType.SET_OP,
          opData: opData,
        });
        setTimeout(async () => {
          const result = await axios.post(
            `http://${config.IP_SERVER}:${config.PORT}/order/production`,
            {
              filial: user.filial,
              op: res.op,
              codigo: res.codigo,
              produto: res.produto,
              lote: res.lote,
              dt_validade: res.validade,
              quantidade: qtdPad.current.value,
              usuario: user.username,
            }
          );
          dispatch({
            type: actionType.SET_AP,
            apData: result.data.data,
          });
          console.log(result.data.data);
          navigate("/print");
        }, 800);
      } catch (error: any) {
        console.log(error.toString());
        setloading(false);
      }
    } else {
      console.log("");
    }
  };

  return (
    <div>
      <div className="w-[325px] h-[240px] bg-[#D9D9D9] rounded-[18px] m-2">
        {/* loading spinner */}
        {loading && (
          <div className="absolute w-[325px] h-[240px] z-10 flex rounded-[18px] items-center justify-center backdrop-blur-sm bg-white/30">
            <SpinnerLoading />
          </div>
        )}
        <div
          className="w-[40px] h-[40px] ml-[280px] absolute rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => change()}
        >
          <MdOutlineModeEditOutline className="text-white text-[1.6rem]" />
        </div>
        <div className="grid grid-cols-5 p-3 w-full h-full gap-2">
          <div className="col-span-2 w-full h-full bg-white flex items-center justify-center rounded-md">
            {res !== undefined ? <img src={res.img} alt={res.id} /> : <></>}
          </div>
          <div className="col-span-3 w-full h-full flex flex-col items-start justify-evenly rounded-md gap-2">
            <p className="text-[18px] font-bold">{props.name}</p>
            <p className="text-[14px]">
              OP:{" "}
              <span
                className={`text-[16px] p-1 font-semibold rounded-md border-2 ${
                  dis
                    ? "border-transparent bg-transparent"
                    : "border-black bg-gray-50"
                }`}
              >
                <input
                  ref={machineOp}
                  type="number"
                  max={999999}
                  placeholder="Stopped"
                  disabled={dis}
                  className=" focus:outline-none bg-transparent focus:bg-transparent  w-[120px]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      search();
                    }
                  }}
                  onBlur={() => search()}
                ></input>
              </span>
            </p>
            <p className="text-[14px]">
              QTD:{" "}
              <span
                className={`text-[16px] p-1 font-semibold rounded-md border-2 ${
                  dis
                    ? "border-transparent bg-transparent"
                    : "border-black bg-gray-50"
                }`}
              >
                <input
                  type="number"
                  ref={qtdPad}
                  max={999999}
                  placeholder="-"
                  //   value={qtdPad}
                  disabled={dis}
                  className=" focus:outline-none bg-transparent focus:bg-transparent  w-[60px]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      localStorage.setItem(
                        props.name,
                        `{"op":"${preData.op}","qtdPad":"${qtdPad.current.value}"}`
                      );
                      setDis(true);
                    }
                  }}
                  onBlur={() => {
                    localStorage.setItem(
                      props.name,
                      `{"op":"${preData.op}","qtdPad":"${qtdPad.current.value}"}`
                    );
                    setDis(true);
                  }}
                ></input>
              </span>
            </p>
            <p className="text-[14px]">
              Lote:
              <span className="text-[16px] p-1 font-semibold">
                {res !== undefined ? res.lote : "-"}
              </span>
            </p>
            <div className="w-full">
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                className="w-full bg-[#1e293b] text-white font-bold flex items-center justify-center p-2 rounded-md drop-shadow-md"
                onClick={() => production()}
              >
                APONTAR
              </motion.button>
            </div>
          </div>
          <div className="col-span-6 h-auto flex flex-row gap-1 items-center justify-evenly">
            <div className="w-auto h-auto flex flex-row gap-2">
              <div className="h-[30px] w-[30px] flex items-center justify-center">
                <img
                  src="/images/pallet.png"
                  alt=""
                  width="auto"
                  height="auto"
                />
              </div>
              <div className="w-full min-w-[70px] bg-[#1e293b] text-white flex items-center justify-center p-1 rounded-md">
                {res !== undefined ? res.pallet : 0}
              </div>
            </div>
            <div className="w-auto h-auto flex flex-row gap-2">
              <div className="h-[30px] w-[30px] flex items-center justify-center">
                <MdNumbers />
              </div>
              <div className="w-full  min-w-[70px] bg-[#1e293b] text-white flex items-center justify-center p-1 rounded-md">
                {res !== undefined ? res.producoes : 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineItem;
