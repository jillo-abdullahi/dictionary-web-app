import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import { InputField } from "@/components/inputField";
import { Header } from "@/containers/Header";
import { FontType } from "@/containers/Header";
import { EmptyState } from "@/components/emptyState";
import { MagnifyingGlass } from "react-loader-spinner";

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [font, setFont] = useState<FontType>(FontType.INTER);
  const [textColor, setTextColor] = useState<"text-white" | "text-black">(
    "text-white"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>("");

  const [phonetics, setPhonetics] = useState<{ text: string; audio: string }>({
    text: "",
    audio: "",
  });

  const playAudio = (audioFile: string) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  const [backgroundColor, setBackgroundColor] = useState<
    "bg-white" | "bg-black"
  >("bg-black");

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleFont = (_font: FontType) => {
    if (_font === FontType.INTER) {
      setFont(FontType.INTER);
    } else if (_font === FontType.LORA) {
      setFont(FontType.LORA);
    } else {
      setFont(FontType.INCONSOLATA);
    }
  };

  useEffect(() => {
    if (!isDarkTheme) {
      setTextColor("text-black");
      setBackgroundColor("bg-white");
    } else {
      setTextColor("text-white");
      setBackgroundColor("bg-black");
    }
  }, [isDarkTheme]);

  // need to clear error when searchTerm changes
  useEffect(() => {
    setError("");
  }, [searchTerm]);

  const handleSubmit = async (e: any) => {
    const API = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    e.preventDefault();

    if (searchTerm.trim() === "") {
      setError("Whoops, can’t be empty...");

      return;
    } else {
      setError("");
    }

    // fetch from API
    setLoading(true);
    setPhonetics({ text: "", audio: "" });
    try {
      const response = await fetch(`${API}${searchTerm}`);
      const jsonData = await response.json();
      setData(jsonData.length ? jsonData[0] : jsonData);

      // set phonetics
      if (jsonData.length) {
        if (jsonData[0].phonetics.length === 1) {
          setPhonetics({
            text: jsonData[0].phonetics[0].text,
            audio: jsonData[0].phonetics[0].audio,
          });
        } else if (jsonData[0].phonetics.length > 1) {
          // check to find which phonetics array has both audio and text

          const phoneticsData = jsonData[0].phonetics.filter((item: any) => {
            return item.text && item.audio;
          })[0];

          setPhonetics({
            text: phoneticsData.text,
            audio: phoneticsData.audio,
          });
        }
      }
    } catch (error) {
      setFetchError("Whoops, something went wrong...try again later");
      setLoading(false);
    } finally {
      setLoading(false);
      setFetchError("");
    }
  };

  const WordDefinition: React.FC<{
    partofSpeech: string;
    definitions: any;
  }> = ({ partofSpeech, definitions }) => {
    return (
      <div className="mt-12 w-full">
        {/* heading for part of speech  */}
        <div className="relative flex items-center">
          <h2 className="mr-5 text-2xl italic font-bold ">{partofSpeech}</h2>
          <hr
            className={`  w-full ${
              isDarkTheme ? "border-gray-400" : "border-gray-200"
            }`}
          />
        </div>

        {/* meanings and examples */}
        <div className="mt-10">
          {/* Meaning  */}
          <h3 className="text-gray-300 text-xl pb-6">Meaning</h3>
          <div className="pl-10">
            <ul className="list-disc  marker:text-purple space-y-3">
              {definitions.length
                ? definitions.map((_definition: any, index: number) => {
                    const { definition, example, synonyms } = _definition;
                    return (
                      <li className="text-lg" key={index}>
                        <p>{definition}</p>

                        {example ? (
                          <p className="mt-3 text-gray-300">{`"${example}"`}</p>
                        ) : null}

                        {/* Synonyms  */}
                        {synonyms.length ? (
                          <div className="flex items-center justify-start mt-10">
                            <h3 className="text-gray-300 text-xl">Synonyms</h3>
                            <div className="ml-2 space-x-2">
                              {synonyms.map(
                                (synonym: string, index: number) => {
                                  return (
                                    <span
                                      key={index}
                                      className="text-purple text-bold text-xl"
                                    >
                                      {synonym}
                                    </span>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        ) : null}
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Dictionary</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/images/logo.svg" />
      </Head>
      <main
        className={`w-full h-full min-h-screen flex justify-center pt-58 pb-10 ${backgroundColor} ${textColor} ${font} transition-all duration-500 ease-in-out`}
      >
        <div className="max-w-736 w-full">
          <Header
            theme={isDarkTheme ? "dark" : "light"}
            toggleTheme={toggleTheme}
            font={font}
            toggleFont={toggleFont}
          />

          <div className="w-full mt-14">
            <InputField
              value={searchTerm}
              error={error}
              placeholder="Search for any word..."
              handleChange={(e) => setSearchTerm(e.target.value)}
              handleSubmit={handleSubmit}
              font={font}
              theme={isDarkTheme ? "dark" : "light"}
            />
          </div>

          {!loading && !fetchError && data?.title !== "No Definitions Found" ? (
            <div className="mt-12">
              <div className="flex w-full justify-between items-center">
                <div className="flex flex-col space-y-2">
                  <h1 className="text-6xl font-bold">{data?.word}</h1>
                  {phonetics.text && (
                    <span className="text-purple text-2xl">
                      {phonetics.text}
                    </span>
                  )}
                </div>
                {phonetics.audio ? (
                  <button onClick={() => playAudio(phonetics.audio)}>
                    <Image
                      src="/assets/images/icon-play.svg"
                      alt="volume"
                      width={75}
                      height={75}
                    />
                  </button>
                ) : null}
              </div>

              {/* search results  */}
              {data.meanings && data?.meanings.length
                ? data.meanings.map((meaning: any, index: number) => {
                    return (
                      <div key={index}>
                        <WordDefinition
                          partofSpeech={meaning.partOfSpeech}
                          definitions={meaning.definitions}
                        />
                      </div>
                    );
                  })
                : null}

              {/* source  */}
              {data.sourceUrls ? (
                <div className="flex items-center justify-start space-x-5 w-full border-t border-gray-400 mt-10 pt-5">
                  <p className="text-gray-300 text-sm underline underline-offset-2">
                    Source
                  </p>
                  <p
                    className={`${
                      isDarkTheme ? "text-white" : "text-gray-300"
                    }`}
                  >
                    <a
                      href={data.sourceUrls}
                      target="_blank"
                      className="text-sm flex space-x-2"
                    >
                      <span className="underline underline-offset-2">
                        {data.sourceUrls}
                      </span>

                      <Image
                        src="/assets/images/icon-new-window.svg"
                        alt="external"
                        width={12}
                        height={12}
                      />
                    </a>
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* in the event of an error or no definitions found  */}
          {!loading &&
          (fetchError || data?.title === "No Definitions Found") ? (
            <div className="mt-20">
              <EmptyState
                fetchError={fetchError}
                theme={isDarkTheme ? "dark" : "light"}
              />
            </div>
          ) : null}

          {/* loading state  */}
          {loading && !fetchError && data?.title !== "No Definitions Found" ? (
            <div className="flex justify-center items-center mt-20">
              <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="transparent"
                color="#A445ED"
              />
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}
