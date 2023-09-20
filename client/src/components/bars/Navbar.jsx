import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    localStorage.removeItem(`token`);
    setIsLoggedIn(false);
    navigate(`/`);
  };
  return (
    <div id="navBar">
      {isLoggedIn ? (
        <button className="nav-button" onClick={clickHandler}>
          Log Out
        </button>
      ) : null}
    </div>
  );
};

export default Navbar;
