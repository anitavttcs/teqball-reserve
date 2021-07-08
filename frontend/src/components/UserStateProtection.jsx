import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context";

function UserStateProtection({ children, reversed }) {
  const [user] = useContext(UserContext);

  if (reversed && user) {
    // TODO: redirect to signed in started page
    return <Redirect to="/" />;
  }

  if (!reversed && !user) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
}

export default UserStateProtection;
