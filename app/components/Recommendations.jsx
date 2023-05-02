

import RecomCard from "./RecomCard";

const Recommendations = ({ rec, theme }) => {
  return (
    <>
      <div className="flex-[2] px-4 md:px-0">
        <h2 className={`text-${theme}-text mb-3 font-semibold text-xl`}>
          More like this
        </h2>
        {rec?.map((v) => {
          return <RecomCard key={v?._id} video={v} theme={theme} />;
        })}
      </div>
    </>
  );
};

export default Recommendations;
