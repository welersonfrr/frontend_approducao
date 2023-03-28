import React from "react";
import { motion } from "framer-motion";

const ResumeProduction = (data: any) => {
  data = data.data;

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

  return (
    <div>
      {/* blocks */}
      <div className="w-full h-auto min-h-[200px] mt-4 py-4 bg-white rounded-2xl border-2 border-black grid grid-cols-4">
        {/* esquerda */}
        <div className="col-span-3 grid grid-rows-4 m-2 gap-3 border-r-2 border-black ">
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
        </div>
        {/* direita */}
        <div className="col-span-1 grid m-2 gap-3">
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
              // onClick={auth}
            >
              Detalhes
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeProduction;
