import { useHistory, Link } from "react-router-dom";

export default function Navbar({ setUser, user }) {
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const googleSignIn = () => {
    window.location.href = "http://localhost:5000/api/authorize"; //scope-nál lehetne még drive, calendar stb.; redirect uri: végén ide irányít
    // window.location.href =
    // 	"https://accounts.google.com/o/oauth2/v2/auth?response_type=code&prompt=select_account&client_id=382341078182-spo8stdhro7lfrgvfjjardd8tdufe36j.apps.googleusercontent.com&scope=openid%20profile%20email%20https://www.googleapis.com/auth/calendar&redirect_uri=http%3A//localhost:3000/login"; //scope-nál lehetne még drive, calendar stb.; redirect uri: végén ide irányít
  };

  return (
    <nav>
      <Link to="/">
        <span className="navLink">Teqball Reserve</span>
      </Link>

      {user ? (
        <>
          <Link to="/groups">
            <span className="navLink">Groups</span>
          </Link>

          <Link to="/user">
            <span className="navLink">Logged in as {user.name}</span>
          </Link>

          <Link to="/">
            <button className="navBtn" onClick={logout}>
              Logout
            </button>
          </Link>
        </>
      ) : (
        <button className="navBtn" onClick={googleSignIn}>
          Login
        </button>
      )}
    </nav>
  );
}
