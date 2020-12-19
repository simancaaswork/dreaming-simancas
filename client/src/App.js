import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

/* views imports */
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import Profile from './views/Profile'
import Post from './views/Post'
import ConfigProfile from './views/ConfigProfile'
import UploadImage from './views/UploadImage'
import Discover from './views/Discover'
import AllPosts from './views/AllPosts'
import Notifications from './views/Notifications'

/* components imports */
import NavBar from './components/NavBar'
import NavBarMobile from './components/NavBarMobile'


/* context import */
import DreamingContext from './context/DreamingContext'

/*   H O C   */
import PrivateRoute from './hoc/PrivateRoute'
import ScrollTop from './hoc/ScrollUp'

function App() {
  return (
    <DreamingContext>
      <Router>
        <ScrollTop>
          <NavBar />
          <Switch>
            <PrivateRoute exact path="/" component={Home} /> 
            <Route exact path="/login" component={Login} /> 
            <Route exact path="/register" component={Register} /> 
            <PrivateRoute exact path="/:user" component={Profile} /> 
            <PrivateRoute exact path="/:user/upload/image" component={UploadImage} /> 
            <PrivateRoute exact path="/:user/config" component={ConfigProfile} /> 
            <PrivateRoute exact path="/:user/post/:id" component={Post} /> 
            <PrivateRoute exact path="/discover/people" component={Discover} /> 
            <PrivateRoute exact path="/discover/posts" component={AllPosts} /> 
            <PrivateRoute exact path="/:username/notifications" component={Notifications} /> 
          </Switch>
          <NavBarMobile />
        </ScrollTop>
      </Router>
    </DreamingContext>
  );
}

export default App;
