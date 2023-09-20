const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const clickHandler = () => {
    localStorage.removeItem(`token`);
    setIsLoggedIn(false);
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
