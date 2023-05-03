import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdPrint } from "react-icons/md";
import { config } from "../utils/config";
import axios from "axios";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";

const ResumeProduction = (data: any) => {
  const [showData, setShowData] = useState(false);
  const [prodData, setProdData2] = useState<any>();
  const [{ user, opData }, dispatch] = useStateValue();
  const navigate = useNavigate();
  data = data.data;

  const getData = async () => {
    // setShowData(true);
    try {
      axios
        .get(
          `http://${config.IP_SERVER}:${config.PORT}/order/production?op=${data.op}&filial=${data.filial}`
        )
        .then((response) => {
          setProdData2(response.data.data);
        })
        .finally(() => {
          setShowData(true);
        });
    } catch (error: any) {
      console.log(error.toString());
    }
  };

  const formatData = (value: any) => {
    if (value === "0") {
      return "00/00/0000";
    }
    const dia = value.substr(6, 2);
    const mes = value.substr(4, 2);
    const ano = value.substr(0, 4);
    const novaData = `${dia}/${mes}/${ano}`;

    return novaData;
  };

  const printProduction = async (printData: any) => {
    dispatch({
      type: actionType.SET_AP,
      apData: printData,
    });

    navigate("/print");
  };

  const calcInterval = (h1: string, h2: string) => {
    let ah1 = h1.split(":");
    let ah2 = h2.split(":");

    const mini = Number(ah1[0]) * 60 + Number(ah1[1]);
    const mfim = Number(ah2[0]) * 60 + Number(ah2[1]);

    const mtot = mfim - mini;

    return mtot;
  };

  return (
    <div>
      {/* blocks */}
      <div
        className={`w-full h-auto mt-4 py-4 bg-white rounded-2xl border-2 ${
          data.confirmado ? "border-black" : "border-red-400 bg-red-200"
        } grid grid-cols-4`}
      >
        {/* esquerda */}
        <div className="col-span-3 grid grid-rows-5 m-2 border-r-2 border-black ">
          <div className="grid grid-cols-2">
            <div>{data.op}</div>
            <div>{data.codigo}</div>
          </div>
          <div className="flex items-center justify-center text-center break-normal text-[1.5rem] font-semibold">
            {data.produto}
          </div>
          <div className="flex items-center justify-center text-[2rem] font-bold">
            {data.lote}
          </div>
          <div className="grid grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <div>{formatData(data.dt_inicio.toString())}</div>
              <div>{data.hr_inicio}</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div>{formatData(data.dt_fim.toString())}</div>
              <div>{data.hr_fim}</div>
            </div>
          </div>
          <div className="break-normal border-t-2 border-black">
            OBS.: {data.obs}
          </div>
        </div>
        {/* direita */}
        <div className="col-span-1 grid m-2">
          <div className="flex flex-row justify-between items-center">
            <p>Qtd Pallets</p>
            <div className="flex items-center justify-center py-4 min-w-[90px] text-[1.5rem] bg-slate-800 text-white rounded-lg uppercase font-bold ">
              {data.producoes}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center my-2">
            <p>Qtd Produção</p>
            <div className="flex items-center justify-center py-4 min-w-[150px] text-[1.5rem] bg-slate-800 text-white rounded-lg uppercase font-bold ">
              {data.quantidade}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.1 }}
              type="button"
              className="p-3 bg-slate-800 text-white rounded-lg uppercase font-bold drop-shadow-2xl"
              onClick={() => getData()}
            >
              Detalhes
            </motion.button>
          </div>
        </div>
      </div>

      {showData && (
        <div className="absolute z-50 left-0 w-full h-full backdrop-blur-sm bg-white/30">
          <div className="flex flex-col items-center">
            <div className=" w-full flex items-center justify-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.1 }}
                type="button"
                className="p-3 bg-slate-800 text-white rounded-lg uppercase font-bold drop-shadow-2xl"
                onClick={() => setShowData(false)}
              >
                Fechar
              </motion.button>
            </div>
            <div className="w-[80%] bg-pink-300 flex items-center justify-center mt-4">
              <table className="table-auto w-full">
                <thead>
                  <th className="border">Numero</th>
                  <th className="border">ID</th>
                  <th className="border">Usuario</th>
                  <th className="border">Dt Inicio</th>
                  <th className="border">Hr Inicio</th>
                  <th className="border">Dt Fim</th>
                  <th className="border">Hr Fim</th>
                  <th className="border">Tempo</th>
                  <th className="border">Print</th>
                </thead>

                {prodData.map(function (prod: any) {
                  return (
                    <tbody key={prod.id}>
                      <tr>
                        <td className="border">{prod.numero}</td>
                        <td className="border">{prod.id}</td>
                        <td className="border">{prod.usuario}</td>
                        <td className="border">{formatData(prod.dt_inicio)}</td>
                        <td className="border">{prod.hr_inicio}</td>
                        <td className="border">{formatData(prod.dt_fim)}</td>
                        <td className="border">{prod.hr_fim}</td>
                        <td className="border">
                          {calcInterval(prod.hr_inicio, prod.hr_fim)}
                        </td>
                        <td className="border flex items-center justify-center">
                          <MdPrint
                            className="text-2xl cursor-pointer"
                            onClick={() => {
                              printProduction(prod);
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeProduction;
