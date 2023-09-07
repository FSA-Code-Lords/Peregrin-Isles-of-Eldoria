import Router from "./components/Router";
import Navbar from "./components/bars/Navbar";
import Footerbar from "./components/bars/Footerbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Router />
      <Footerbar />
    </>
  );
};

export default App;
