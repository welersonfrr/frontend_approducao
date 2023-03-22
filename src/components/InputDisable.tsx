import React from "react";

const InputDisable = ({ title, value }: any) => {
  return (
    <div className="w-auto h-auto flex flex-col items-start justify-center">
      <p className="mt-4">{title}</p>
      <div className="w-auto min-w-[600px] h-auto flex flex-row items-center justify-start bg-gray-50 rounded-xl border-4 border-gray-400">
        <input
          type="text"
          value={value}
          className="p-4 focus:outline-none bg-transparent focus:bg-transparent w-full"
          disabled
        />
      </div>
    </div>
  );
};

export default InputDisable;
