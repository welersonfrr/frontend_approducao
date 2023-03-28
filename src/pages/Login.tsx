import React, { useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AlertBox from "../components/AlertBox";
import SpinnerLoading from "../components/SpinnerLoading";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const inputUser = useRef<HTMLInputElement>(null);
  const inputPass = useRef<HTMLInputElement>(null);
  const [showAlert, setshowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const trowError = (msgError: string) => {
    setMensagem(msgError);
    setshowAlert(true);
    setLoading(false);
    setTimeout(() => {
      setshowAlert(false);
    }, 3000);
  };

  const auth = async () => {
    setLoading(true);
    if (inputUser.current?.value === "") {
      trowError("Informe um usuário");
    } else if (inputPass.current?.value === "") {
      trowError("Informe uma senha");
    } else {
      try {
        const result = await axios.post(`http://localhost:3380/auth`, {
          username: inputUser.current?.value,
          password: inputPass.current?.value,
        });

        dispatch({
          type: actionType.SET_USER,
          user: result.data.data.record,
        });

        setLoading(false);
        if (inputPass.current != null) {
          inputPass.current.value = "";
        }
        // console.log(result.data.data.record);

        navigate("/");
      } catch (error: any) {
        setLoading(false);
        if (error.response?.status === 400) {
          trowError("Usuário ou senha inválido");
        } else {
          trowError(
            `${error.toString()} - Contate o administrador do sistema.`
          );
          console.log(error.toString());
        }

        if (inputPass.current != null) {
          inputPass.current.value = "";
        }
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-auto h-auto flex flex-row items-center justify-center bg-gray-50 rounded-xl border-4 border-gray-400">
        <input
          type="text"
          placeholder="Usuário"
          className="p-4 focus:outline-none bg-transparent focus:bg-transparent"
          ref={inputUser}
          autoFocus
        />
      </div>
      <div className="w-auto h-auto flex flex-row items-center justify-center bg-gray-50 rounded-xl border-4 border-gray-400">
        <input
          type="password"
          placeholder="Senha"
          className="p-4 focus:outline-none bg-transparent focus:bg-transparent"
          ref={inputPass}
        />
      </div>
      <div className="w-auto h-auto flex flex-row items-center justify-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.1 }}
          type="button"
          className="p-3 bg-slate-800 text-white rounded-lg uppercase font-bold drop-shadow-2xl"
          onClick={auth}
        >
          Entrar
        </motion.button>
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

export default Login;
