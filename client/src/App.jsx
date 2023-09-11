import Router from "./components/Router";
import Navbar from "./components/bars/Navbar";
import Footerbar from "./components/bars/Footerbar";

const App = () => {
  return (
    <>
      <Router />
      <Navbar />
      <Footerbar />
    </>
  );
};

export default App;