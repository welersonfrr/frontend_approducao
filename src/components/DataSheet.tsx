import React, { useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";

const DataSheet = () => {
  const [{ apData, opData, user }] = useStateValue();
  const navigate = useNavigate();

  const codbel = opData.codbel;

  useEffect(() => {
    if (user.username == null) {
      navigate("/login");
    }
    if (apData.codigo === null) {
      navigate("/");
    }
  }, []);

  const formatData = (value: any) => {
    value = value ?? "";
    const dia = value.substr(6, 2);
    const mes = value.substr(4, 2);
    const ano = value.substr(0, 4);
    const novaData = `${dia}/${mes}/${ano}`;
    return novaData;
  };

  return (
    <div>
      {/* bloco total */}
      <div className="grid grid-rows-3 w-[700px] h-[500px] border-2 border-black bg-white">
        {/* 1/3 */}
        <div className="grid grid-cols-4 border-b-2 border-black">
          {/* esquerda */}
          <div className="col-span-3 grid grid-rows-4 border-r-2 border-black">
            {/* cima */}
            <div className="grid grid-cols-3 border-b-2 border-black">
              <div className="col-span-1 pl-1 flex items-center">
                {apData.op}
              </div>
              <div className="flex items-center">{apData.codigo}</div>
              <div className="flex items-center">{codbel}</div>
            </div>
            {/* baixo */}
            <div className="row-span-3 flex items-center justify-center w-full text-center text-2xl font-bold">
              {apData.produto}
            </div>
          </div>
          {/* direita */}
          <div className="flex flex-col items-center justify-center text-[3rem]">
            <p className="text-[1rem]">Pallet n:</p>
            {apData.numero}
          </div>
        </div>
        {/* 2/3 */}
        <div className="grid grid-cols-4 border-b-2 border-black">
          {/* esquerda */}
          <div className="col-span-3 border-r-2 border-black flex items-center justify-center w-full text-center text-[3rem] font-bold">
            {apData.lote}
          </div>
          {/* direita */}
          <div className="flex items-center justify-center">
            <QRCodeSVG value={apData.id} />
          </div>
        </div>
        {/* 3/3 */}
        <div className="grid grid-cols-6">
          {/* esquerda */}
          <div className="col-span-4 grid grid-rows-6 border-r-2 border-black">
            {/* 1/3 */}
            <div className="row-span-1 flex flex-row justify-between px-4 border-b-2 border-black">
              <p className="flex h-auto w-auto items-center justify-center">
                Inicio
              </p>
              <p className="flex h-auto w-auto items-center justify-center">
                {formatData(apData.dt_inicio)} - {apData.hr_inicio}
              </p>
            </div>
            {/* 2/3 */}
            <div className="row-span-1 flex flex-row justify-between px-4 border-b-2 border-black">
              <p className="flex h-auto w-auto items-center justify-center">
                Fim
              </p>
              <p className="flex h-auto w-auto items-center justify-center">
                {formatData(apData.dt_fim)} - {apData.hr_fim}
              </p>
            </div>
            {/* 3/3 */}
            <div className="row-span-4 flex flex-col items-center justify-end">
              <p>_________________________</p>
              <p className="text-[0.75rem]">Assinatura</p>
            </div>
          </div>
          {/* direita */}
          <div className="col-span-2 flex flex-col items-center justify-center w-full text-center text-[5rem] font-bold">
            <p className="text-[1rem]">Quantidade:</p>
            {apData.quantidade}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSheet;
