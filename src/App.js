import { useState } from "react";
import { Header } from "./components/Header/Header";
import { SearchSection } from "./components/SearchSection/SearchSection";
import s from "./App.module.css";
import { Card } from "./components/Card/Card";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile } from "./components/Profile/Profile";

function App() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);

  const handleFetch = async () => {
    try {
      const url = `https://api.github.com/search/users?q=${username}`;

      const response = await fetch(url);

      const responseJson = await response.json();

      console.log(responseJson.items);

      setData(responseJson.items);
    } catch (error) {
      console.log("Error while fetching data from github api", error);
    }
  };

  return (
    <>
      <Header />
      <div className={s.root}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchSection
                    setUsername={setUsername}
                    username={username}
                    handleFetch={handleFetch}
                  />
                  <div className={s.wrap}>
                    {data.length > 0 ? (
                      <div className={s.cardWrapper}>
                        {data.map((item) => {
                          return (
                            <Card
                              key={item.id}
                              name={item.login}
                              id={item.id}
                              imageUrl={item.avatar_url}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <div className={s.noData}>User not found</div>
                    )}
                  </div>
                </>
              }
            />
            <Route path="/user/:username" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
