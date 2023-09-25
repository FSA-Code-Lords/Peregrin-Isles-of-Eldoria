import Router from "./components/Router";
import Navbar from "./components/bars/Navbar";
import Footerbar from "./components/bars/Footerbar";
import { useEffect, useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem(`token`)) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Router isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Footerbar />
    </>
  );
};

export default App;
