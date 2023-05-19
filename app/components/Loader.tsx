"use client";

import { FC } from "react";
import { PuffLoader } from "react-spinners";

const Loader: FC = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <PuffLoader color="red" size={100} />
    </div>
  );
};

export default Loader;
