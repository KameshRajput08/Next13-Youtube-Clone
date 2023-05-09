import getVideos from "./actions/getVideos";
import Card from "./components/Card/Card";
import ClientOnly from "./components/ClientOnly";
import LoadingCard from "./components/LoadingCard";

const page = async ({ searchParams }) => {
  const videos = await getVideos({ type: searchParams.videos });

  if (videos?.length < 1) {
    return (
      <ClientOnly>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 p-0 sm:py-10 sm:px-6">
          {["", "", "", "", "", "", "", ""].map((card, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div
        className={
          "grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 p-0 sm:py-10 sm:px-6"
        }
      >
        {videos?.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </div>
    </ClientOnly>
  );
};

export default page;
