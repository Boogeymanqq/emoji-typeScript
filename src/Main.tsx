import React, { useState, useEffect } from "react";
import { Emoji } from "./Emoji";
import { Paginator } from "./Paginator";
import { EmojiHeader } from "./header";
import "../src/style.css";
// import loading from "/loading.gif";

// const url = "https://emoji-api-app.herokuapp.com/";

type EmojiObj = {
  title: string;
  symbol: string;
  keywords: string;
};

// async function getData(): Promise<EmojiObj[]> {
//   const response = await fetch(url);
//   const responseApp = await response.json();
//   return await responseApp;
// }

export const Main = () => {
  const [data, setData] = useState<EmojiObj[]>([]);
  // const [filtered, setFiltered] = useState<EmojiObj[]>([]); // для поиска
  const [keys, setKeys] = useState("");
  const [viewPage, setViewPage] = useState(1);
  const [viewPerPage, setViewPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function dataApi() {
      // const apiArr = await getData();
      // setData(apiArr);
      // setFiltered(apiArr);
      try {
        const url = "https://emoji-api-app.herokuapp.com/";
        const response = await fetch(url);
        const responseApp = await response.json();
        const apiArr = await responseApp;
        setData(apiArr);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    }
    dataApi();
  }, []);

  useEffect(() => {
    setViewPage(1);
  }, [keys, viewPerPage]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let userValue = event.target.value.split(" ");
    setKeys(userValue.join(" "));
    keys.split(",").forEach((elem) => console.log(elem));
  }

  const filtred = data.filter(
    (elem) =>
      elem.keywords.toLowerCase().includes(keys) ||
      elem.title.toLowerCase().includes(keys) ||
      elem.keywords.toLowerCase().includes(keys.split(" ")[0]) ||
      elem.keywords.toLowerCase().includes(keys.split(" ")[1]) ||
      elem.title.toLowerCase().includes(keys.split(" ")[0]) ||
      elem.title.toLowerCase().includes(keys.split(" ")[1])
  );

  ///
  const lastIndex = viewPage * viewPerPage;
  const firstIndex = lastIndex - viewPerPage;
  const indexPage = filtred.slice(firstIndex, lastIndex);
  ///

  return (
    <div className="wrapper">
      <header className="header">
        <EmojiHeader />
        <div className="header__search">
          <input
            className="input"
            type="text"
            placeholder="Введите emoji"
            value={keys}
            onChange={handleChange}
          />
        </div>
      </header>
      <div className="main">
        <div className="main__container">
          {isLoading && (
            <img
              style={{ alignSelf: "center", justifySelf: "center" }}
              width="200"
              height="200"
              src={require("../src/loading.gif")}
              alt="loading..."
            />
          )}
          {isError && <p>Something went wrong...</p>}
          {filtred.length === 0 ? (
            <p style={{ textAlign: "center" }}>Something went wrong...</p>
          ) : (
            indexPage.map((elem, index) => (
              <Emoji
                key={index}
                symbol={elem.symbol}
                title={elem.title}
                keywords={elem.keywords
                  .split(" ")
                  .filter(
                    (elemKey, indexKey, arrKey) =>
                      arrKey.indexOf(elemKey) === indexKey
                  )
                  .join(" ")}
              />
            ))
          )}
        </div>
      </div>
      <footer className="footer">
        <div className="footer__container">
          <Paginator
            page={viewPage}
            totalPage={Math.ceil(filtred.length / viewPerPage)}
            onPageChange={setViewPage}
          />
          <div className="pagination__select">
            <label>
              Per page
              <select
                className="pagination__select__page"
                value={viewPerPage}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                  setViewPerPage(+event.target.value)
                }
              >
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
              </select>
            </label>
          </div>
        </div>
      </footer>
    </div>
  );
};
