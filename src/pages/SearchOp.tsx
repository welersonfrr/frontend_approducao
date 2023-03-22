import React, { useRef } from "react";
import { useState } from "react";
import { MdSearch } from "react-icons/md";
import AlertBox from "../components/AlertBox";

const SearchOp = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [showAlert, setshowAlert] = useState(false);
  const [mensagem, setmensagem] = useState("");

  const search = async () => {
    console.log(ref.current?.value);
    if (ref.current?.value === "") {
      setmensagem("Por favor forneca uma OP");
      setshowAlert(true);
      setTimeout(() => {
        setshowAlert(false);
      }, 3000);
    } else {
      try {
      } catch (error: any) {
        console.log(error.toString());
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-auto h-auto flex flex-row items-center justify-center bg-gray-50 rounded-xl border-4 border-gray-400">
        <input
          type="number"
          max={999999}
          placeholder="Buscar OP..."
          className="p-4 focus:outline-none bg-transparent focus:bg-transparent"
          ref={ref}
          autoFocus
        />
        <MdSearch className=" m-4 cursor-pointer" onClick={search} />
      </div>
      {showAlert && <AlertBox mensagem={mensagem} />}
    </div>
  );
};

export default SearchOp;
