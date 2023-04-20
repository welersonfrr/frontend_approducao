import React from "react";
import { motion } from "framer-motion";

const ConfirmationProd = (data: any, cancelAction: any) => {
  return (
    <div>
      <div>
        <div className=" p-4 flex flex-col gap-2 m-4 bg-white w-auto h-auto">
          <p>OP</p>
          <p className="bg-slate-300 p-4 font-bold">{data.op}</p>
          <p>Produto</p>
          <p className="bg-slate-300 p-4 font-bold">{data.codigo}</p>
          <p>Descricao</p>
          <p className="bg-slate-300 p-4 font-bold">{data.produto}</p>
          <p>Lote</p>
          <p className="bg-slate-300 p-4 font-bold">{data.lote}</p>
          <p>Data/Hora Inicio</p>
          <p className="bg-slate-300 p-4 font-bold">
            {data.dt_inicio} - {data.hr_inicio}
          </p>
          <p>Data/Hora Fim</p>
          <p className="bg-slate-300 p-4 font-bold">
            {data.dt_fim} - {data.hr_fim}
          </p>
          <p>Pallets</p>
          <p className="bg-slate-500 p-4 font-bold text-[1.75rem] text-white">
            {data.quantidadePallet}
          </p>
          <p>Total</p>
          <p className="bg-slate-500 p-4 font-bold text-[1.75rem] text-white">
            {data.quantdadeProducao}
          </p>
          <div className="w-auto h-auto flex flex-row bg-gray-50 rounded-xl border-4 border-gray-400">
            <input
              className="p-4 focus:outline-none bg-transparent focus:bg-transparent"
              placeholder="Observações"
              type="text"
            />
          </div>
          <div className="w-auto h-auto my-4 flex flex-row items-center justify-center gap-9">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.1 }}
              type="button"
              className="p-3 bg-slate-800 text-white rounded-lg uppercase font-bold drop-shadow-2xl"
              onClick={cancelAction.cancelAction}
            >
              Cancelar
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.1 }}
              type="button"
              className="p-3 bg-slate-800 text-white rounded-lg uppercase font-bold drop-shadow-2xl"
              // onClick={handleShowMore}
            >
              Confirmar
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationProd;
