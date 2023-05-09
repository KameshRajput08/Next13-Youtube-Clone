import React from "react";

const loading = () => {
  return (
    <div className="w-screen h-screen overflow--y-scroll relative">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 p-0 sm:py-10 sm:px-6">
        {["", "", "", "", "", "", "", ""].map((card, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default loading;
