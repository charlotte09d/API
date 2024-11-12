import { useState } from "react";
import useFetch from "./hook/userFetch";

export default function App() {
  const [displayText, setDisplayText] = useState("code"); // État pour savoir quoi afficher

  const {
    data: showData,
    isLoading: isLoading,
    error: showError,
  } = useFetch(
    `https://api.tvmaze.com/shows/32649?embed[]=cast&embed[]=seasons&embed[]=episodes`
  );

  // Fonction pour définir ce qui doit être affiché
  const handleDisplay = (type) => {
    setDisplayText(type);
  };

  return (
    <>
      <div className=" bg-fond bg-repeat">
        <div className="text-white">
          {/* Boutons pour changer l'affichage */}
          <div className="grid grid-flow-col pt-5 mx-3 gap-10 md:text-xl  xl:mx-48 xl:gap-20 ">
            <button
              onClick={() => handleDisplay("code")}
              className="bg-black hover:bg-red text-white font-bold py-2 px-4 rounded md:py-3  "
            >
              Main
            </button>
            <button
              onClick={() => handleDisplay("seasons")}
              className=" bg-black hover:bg-red text-white font-bold py-2 px-2 rounded"
            >
              Seasons
            </button>
            <button
              onClick={() => handleDisplay("episode")}
              className="bg-black hover:bg-red text-white font-bold py-2 px-2 rounded"
            >
              Episodes
            </button>
            <button
              onClick={() => handleDisplay("cast")}
              className="bg-black hover:bg-red text-white font-bold py-2 px-2 rounded"
            >
              Cast
            </button>
          </div>

          {/* Affichage en fonction du bouton cliqué */}
          {displayText === "code" ? (
            <div className="">
              <div className="pb-24 md:mt-5 lg:mt-10 ">
                <div
                  className=" h-screen  bg-contain bg-center  "
                  style={{
                    backgroundImage: `linear-gradient(to top, black 30%, transparent), url(${showData?.image.original})`,
                    backgroundSize: "contain", // Pour s'assurer que l'image s'adapte
                    backgroundRepeat: "no-repeat", // Pour éviter la répétition de l'image
                  }}
                ></div>

                {/* Titre */}
                <h1 className="-mt-56  text-left ml-3 mr-2 text-lg lg:text-5xl lg:mb-8 font-black text-white uppercase whitespace-nowrap">
                  {showData?.name}
                </h1>

                {/* Sous-titre */}
                <h2 className=" text-left ml-3 text-lg lg:text-3xl lg:mb-5 font-medium text-zinc-400 whitespace-nowrap">
                  {showData?.status} | {showData?.language} |{" "}
                  {showData?.rating?.average}/10
                </h2>

                {/* Genres */}
                <h3 className=" text-left ml-3 text-sm lg:text-2xl lg:mb-2 font-extralight text-zinc-400 whitespace-nowrap">
                  {showData?.genres[0]} | {showData?.genres[1]} |{" "}
                  {showData?.genres[2]} | 2018
                </h3>

                {/* Résumé */}
                <p
                  className=" lg:bottom-36 sm:bottom-40 ml-3 mr-3 text-justify text-sm lg:text-xl font-extralight text-white"
                  dangerouslySetInnerHTML={{ __html: showData?.summary }}
                ></p>
              </div>
            </div>
          ) : displayText === "seasons" ? (
            <div className=" px-5 lg:px-20 ">
              <div className="bg-black p-5 text-center rounded-lg mb-10 shadow-lg mt-10">
                <h1 className="text-4xl font-bold text-white tracking-wide uppercase shadow-md">
                  Seasons
                </h1>
              </div>
              <div className=" pt-5 lg:mt-10  justify-center  grid grid-cols-1 2xl:grid-cols-2 ">
                {showData?._embedded?.seasons?.map((season) => (
                  <div
                    key={season.id}
                    className="mx-4 mb-10  xl:mx-28 bg-gris px-4 py-6 rounded"
                  >
                    <div className="ml-3  ">
                      <div className="flex items-end">
                        <h3 className="uppercase text-xs md:text-lg lg:text-xl  xl:text-3xl">
                          Season {season.number} : {season.name}
                        </h3>
                      </div>
                      <p className="uppercase font-bold lg:font-semibold text-xs md:text-lg lg:text-xl  xl:text-2xl">
                        {season.episodeOrder} Episodes
                      </p>
                    </div>
                    <div className="flex flex-row ml-3  py-5 text-white items-center  ">
                      <img
                        src={season.image?.medium}
                        className="self-start w-36 md:w-44 lg:w-56 xl:w-64 "
                        alt={`Season ${season.number}`}
                      />
                      <p
                        className="text-sm  justify-center text-justify mt-2 md:text-sm lg:text-lg xl:text-xl ml-5 mr-10 "
                        dangerouslySetInnerHTML={{ __html: season.summary }}
                      ></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : displayText === "episode" ? (
            <div className=" px-5 lg:px-20 ">
              <div className="bg-black p-5 text-center rounded-lg mb-10 shadow-lg mt-10">
                <h1 className="text-4xl font-bold text-white tracking-wide uppercase shadow-md">
                  Episodes
                </h1>
              </div>

              <div className=" pt-5 lg:mt-10  items-center justify-center  grid grid-cols-1 2xl:grid-cols-2 ">
                {showData?._embedded?.episodes?.map((episode) => (
                  <div
                    key={episode.id}
                    className="mx-4 mb-10  xl:mx-28 bg-gris px-4 py-6 rounded"
                  >
                    <div className="flex flex-col text-white font-bold justify-center ">
                      <p className="uppercase text-xs md:text-lg lg:text-xl  xl:text-3xl">
                        S{episode.season}: E{episode.number}
                      </p>
                      <p className=" uppercase font-bold lg:font-semibold text-xs md:text-lg lg:text-xl  xl:text-2xl">
                        {" "}
                        {episode.name}
                      </p>
                      <div className=" mb-4 flex flex-grow">
                        <p className="text-xs font-light md:text-sm lg:text-lg xl:text-xl pr-5 uppercase">
                          {episode.runtime} min
                        </p>
                        <p className="text-xs font-light md:text-sm lg:text-lg xl:text-xl ">
                          {episode.airdate}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                      <img
                        src={episode.image?.medium}
                        className="self-start w-36 md:w-56 lg:w-72 xl:w-96"
                        alt={`Episode ${episode.number}`}
                      />
                      <p
                        className="text-sm  justify-center text-justify mt-2 md:text-sm lg:text-lg xl:text-xl  "
                        dangerouslySetInnerHTML={{ __html: episode.summary }}
                      ></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className=" px-5 lg:px-20">
              {/* Bandeau avec le titre */}
              <div className="bg-black p-5 text-center rounded-lg mb-10 shadow-lg mt-10">
                <h1 className="text-4xl font-bold text-white tracking-wide uppercase shadow-md">
                  Cast
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
                {showData?._embedded?.cast?.map((cast, i) => {
                  return (
                    <div
                      key={`${i}-${cast.character?.name}`}
                      className="ml-10 pb-10"
                    >
                      {/* Conteneur pour l'image et la bande grise */}
                      <div className="w-[200px] flex flex-col items-center shadow-lg rounded-lg overflow-hidden">
                        {/* Image de l'acteur */}
                        <img
                          src={cast.character?.image?.medium}
                          width={300}
                          className="w-full h-full object-cover rounded-t-lg "
                          alt={`Cast ${cast.number}`}
                        />
                        {/* Bande grise avec les textes */}
                        <div className="w-full bottom-0 h-1/2 bg-black bg-opacity-75 flex flex-col justify-center items-center text-white font-bold py-3">
                          <h1 className="uppercase">{cast.person?.name}</h1>
                          <h2 className="font-light">
                            as {cast.character?.name}
                          </h2>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
