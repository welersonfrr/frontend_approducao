import React from "react";
import MachineItem from "./MachineItem";
import { useStateValue } from "../context/StateProvider";

const MachineRow = () => {
  const [{ user }, dispatch] = useStateValue();
  console.log(user.username);
  if (user.username !== null) {
    return (
      <div className="flex flex-wrap flex-row justify-center">
        {user.maquinas.map((e: any) => {
          return <MachineItem name={e} />;
        })}
      </div>
    );
  } else {
    return <></>;
  }
};

export default MachineRow;
