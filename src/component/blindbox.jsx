import React from "react";

const BlindBox = ({
  image = "https://via.placeholder.com/200x200?text=盲盒图片",
  name = "默认盲盒名",
  onDetail = () => alert("这里是盲盒详情！"),
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 w-72 flex flex-col items-center">
      <img
        src={image}
        alt={name}
        className="w-full h-52 object-cover rounded-md mb-4"
      />
      <div className="text-lg font-bold mb-4 text-gray-800">{name}</div>
      <button
        onClick={onDetail}
        className="w-full py-2 text-base font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition"
      >
        查看详情
      </button>
    </div>
  );
};

export default BlindBox;