import Login from "./Login";
import NotFound from "./NotFound";
import Home from "./Home";
import Event from "./Event";
import AddEvent from "./AddEvent";
import User from "./User";
import Groups from "./Groups";
import Group from "./Group";
import AddGroup from "./AddGroup";
import AddMember from "./AddMember";
import Navbar from "../components/Navbar";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserStateProtection from "../components/UserStateProtection";

const Router = ({ setUser, user, checkToken }) => (
  <BrowserRouter>

    <Navbar setUser={setUser} user={user} />
    <div className="container">
      <Switch>
        <Route exact path="/login">
          <UserStateProtection reversed>
            <Login checkToken={checkToken} />
          </UserStateProtection>
        </Route>

        <Route exact path="/">
          <UserStateProtection reversed>
            <Home setUser={setUser} user={user} />
          </UserStateProtection>
        </Route>

        <Route exact path="/event/:id">
          <UserStateProtection reversed>
            <Event setUser={setUser} user={user} />
          </UserStateProtection>
        </Route>

        <Route exact path="/add-event">
          <UserStateProtection reversed>
            <AddEvent user={user} />
          </UserStateProtection>
        </Route>

        <Route exact path="/user">
          <UserStateProtection reversed>
            <User user={user} />
          </UserStateProtection>
        </Route>

        <Route exact path="/groups">
          <UserStateProtection reversed>
            <Groups setUser={setUser} user={user} />
          </UserStateProtection>
        </Route>

        <Route exact path="/group/:id">
          <UserStateProtection reversed>
            <Group user={user} />
          </UserStateProtection>
        </Route>

        <Route exact path="/add-group">
          <UserStateProtection reversed>
            <AddGroup />
          </UserStateProtection>
        </Route>

        <Route exact path="/add-member">
          <UserStateProtection reversed>
            <AddMember />
          </UserStateProtection>
        </Route>

        <Route path="/*">
          <NotFound />
        </Route>

      </Switch>
    </div>
  </BrowserRouter>
);

export default Router;
