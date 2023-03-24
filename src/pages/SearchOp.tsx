import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { MdSearch } from "react-icons/md";
import AlertBox from "../components/AlertBox";
import axios from "axios";
import SpinnerLoading from "../components/SpinnerLoading";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { Navigate, useNavigate } from "react-router-dom";

const SearchOp = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [showAlert, setshowAlert] = useState(false);
  const [mensagem, setmensagem] = useState("");
  const [loading, setloading] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username == null) {
      navigate("/login");
    }
  }, []);

  const trowError = (msgError: string) => {
    setmensagem(msgError);
    setshowAlert(true);
    setloading(false);
    setTimeout(() => {
      setshowAlert(false);
    }, 3000);
  };

  const search = async () => {
    setloading(true);
    if (ref.current?.value === "") {
      trowError("Por favor forneca uma OP");
    } else {
      try {
        const result = await axios.get(
          `http://localhost:3380/order/op?op=${ref.current?.value}&filial=${user.filial}`
        );

        dispatch({
          type: actionType.SET_OP,
          opData: result.data.data,
        });

        setloading(false);
        if (ref.current != null) {
          ref.current.value = "";
        }
        navigate("/production");
      } catch (error: any) {
        setloading(false);
        if (error.response?.status === 404) {
          trowError("OP não encontrada.");
        } else {
          trowError(
            `${error.toString()} - Contate o administrador do sistema.`
          );
          console.log(error.toString());
        }

        if (ref.current != null) {
          ref.current.value = "";
        }
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
      {/* loading spinner */}
      {loading && (
        <div className="absolute w-screen h-screen flex items-center justify-center backdrop-blur-sm bg-white/30">
          <SpinnerLoading />
        </div>
      )}
    </div>
  );
};

export default SearchOp;
