import {Switch,Route,Link} from "react-router-dom"
import './App.css';
import Home from "./components/Home"
import Signup from "./components/Signup"
import Profile from "./components/Profile"
import NavProfile from "./components/NavProfile"
import ZoomImg from "./components/ZoomImg"
import Hashtag from "./components/Hashtag"
import useInput from "./hooks/useInput"
import { useCallback } from "react";
import withRouter from "with-router"
import UserProfile from "./components/UserProfile"

function App({history}) {
  const [value,setValue,onChangeValue] = useInput("");
  const onSubmit = useCallback((e)=>{
    e.preventDefault();
    history.push(`/hashtag/${value}`);
    setValue("");
  },[value]);
  return (
    <div id="App" className="App">
      
      <header id="header">
        <Link to="/">home</Link>
        <Link to="/profile">profile</Link>
        <Link to="/signup">signup</Link>
        <div id="header_search_box">
          <form onSubmit={onSubmit}>
            <input onChange={onChangeValue} value={value} type="text"/>
            <input type="submit" value="serach" />
          </form>
        </div>
      </header>

    <div id="main_wrapper">
      
      <nav id="nav" className="main_child">
        <NavProfile />
      </nav>

      <article id='article' className="main_child">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/profile" component={Profile} />
          <Route path="/signup" component={Signup} />
          <Route path="/hashtag/:tag" component={Hashtag} />
          <Route path="/userPosts/:UserId" component={UserProfile} />
          <Route render={({location})=><h1>404 || can't find {location.pathname}.</h1>} />
        </Switch>
      </article>

      <aside id="aside" className="main_child">
        <h1>aside</h1>
      </aside>
    </div>

      <footer id="footer">
        <p>email : foxboxr@gmail.com</p>
      </footer>
      <ZoomImg />
    </div>
  );
}

export default withRouter(App);
