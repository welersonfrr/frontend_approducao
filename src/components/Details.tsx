import React, { useEffect, useState } from "react";
import SpinnerLoading from "./SpinnerLoading";
import { config } from "../utils/config";
import axios from "axios";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";
import { MdPrint } from "react-icons/md";

const Details = ({ filial, op }: any) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [arrProd, setArrProd] = useState([]);
  const [{ user, opData }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const formatData = (data: string) => {
    let frst = Number(data.substr(6, 2));
    let dia;
    if (frst < 10) {
      dia = `0${frst}`;
    } else {
      dia = data.substr(6, 2);
    }

    return `${dia}/${data.substr(4, 2)}/${data.substr(0, 4)}`;
  };

  const calcInterval = (h1: string, h2: string) => {
    let ah1 = h1.split(":");
    let ah2 = h2.split(":");

    const mini = Number(ah1[0]) * 60 + Number(ah1[1]);
    const mfim = Number(ah2[0]) * 60 + Number(ah2[1]);

    const mtot = mfim - mini;

    return mtot;
  };

  const printProduction = async (printData: any) => {
    dispatch({
      type: actionType.SET_AP,
      apData: printData,
    });

    navigate("/print");
  };

  try {
    const search = async () => {
      await axios
        .get(
          `http://${config.IP_SERVER}:${config.PORT}/order/details?filial=${user.filial}&op=${op}`
        )
        .then((res) => {
          setData(res.data.data);
          setArrProd(res.data.data.producoes);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    useEffect(() => {
      search();
    }, []);
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="w-full h-full min-h-screen">
      {data !== undefined && (
        <div className="flex w-full h-full items-start justify-center">
          <div className="w-[1024px] h-auto flex flex-col gap-2 ">
            {/* ordem de produção */}
            <div className="w-full flex items-center justify-center flex-col">
              <p className="text-sm">Ordem de Produção</p>
              <div className="bg-[#1e293b] text-white rounded-lg text-[1.4rem] p-4 min-w-[200px] flex items-center justify-center">
                {op}
              </div>
            </div>
            {/* dados sintetizados */}
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-1 bg-[#F5F5F7] rounded-xl p-1">
                <img src={data["img"]} alt="" />
              </div>
              <div className="col-span-3 grid grid-rows-2 gap-2">
                <div className="bg-[#F5F5F7] rounded-xl p-1 ">
                  <div className="flex flex-row gap-4">
                    <p>{data["codigo"]}</p>
                    <p>|</p>
                    <p>{data["produto"]}</p>
                  </div>
                  <div className="grid grid-rows-2">
                    <div className="grid grid-cols-5">
                      <p className="col-span-1 flex items-end justify-center">
                        Pallet
                      </p>
                      <p className="col-span-1 flex items-end justify-center">
                        Total
                      </p>
                      <p className="col-span-1 flex items-end justify-center">
                        Lote
                      </p>
                      <p className="col-span-2 flex items-end justify-center">
                        Tempo em produção
                      </p>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                      <div className="col-span-1 flex items-center justify-center bg-[#1e293b] text-white rounded-lg">
                        {data["pallet"]}
                      </div>
                      <div className="col-span-1 flex items-center justify-center  bg-[#1e293b] text-white rounded-lg">
                        {data["total"]}
                      </div>
                      <div className="col-span-1 flex items-center justify-center  bg-[#1e293b] text-white rounded-lg">
                        {data["lote"]}
                      </div>
                      <div className="col-span-2 grid grid-cols-2 bg-[#1e293b] text-white rounded-lg">
                        <div className="flex flex-col items-center">
                          <div>{data["first"]["data"]}</div>
                          <div>{data["first"]["hora"]}</div>
                        </div>
                        <div className="flex flex-col  items-center">
                          <div>{data["last"]["data"]}</div>
                          <div>{data["last"]["hora"]}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F5F5F7] rounded-xl p-1">
                  <p>
                    <span className="font-bold">Confirmado:</span>{" "}
                    {data["confirm_date"]}
                  </p>
                  <p>
                    {" "}
                    <span className="font-bold">Obs:</span> {data["obs"]}
                  </p>
                </div>
              </div>
            </div>
            {/* tabela de produções */}
            <div className=" h-[480px] overflow-hidden overflow-y-scroll">
              <table className="table-fixed w-full">
                <thead className="bg-[#1e293b] text-white">
                  <th>Pallet</th>
                  <th>Quantidade</th>
                  <th>Data Inicio</th>
                  <th>Hora Inicio</th>
                  <th>Hora Fim</th>
                  <th>Tempo médio</th>
                  <th>Reimpressão</th>
                </thead>
                <tbody className="bg-white text-[#1e293b]">
                  {arrProd.map((prod: any) => {
                    console.log(prod);
                    return (
                      <tr>
                        <td>{prod.numero}</td>
                        <td>{prod.quantidade}</td>
                        <td>{formatData(prod.dt_inicio)}</td>
                        <td>{prod.hr_inicio}</td>
                        <td>{prod.hr_fim}</td>
                        <td>{calcInterval(prod.hr_inicio, prod.hr_fim)}</td>
                        <td className="flex items-center justify-center">
                          <MdPrint
                            className="text-2xl cursor-pointer"
                            onClick={() => {
                              printProduction(prod);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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

export default Details;
