import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import SingleThreadView from './pages/SingleThreadView/SingleThreadView'
import Family from './pages/Family'
import CreateFamily from './components/FamilyComponents/CreateFamily'
import Members from './components/FamilyComponents/Members'
import BlockedMembers from './components/FamilyComponents/BlockedMembers'
import InviteMembers from './components/FamilyComponents/InviteMembers'
import SearchResult from './components/Search/SearchResult'

import AdminDashboard from './pages/Admin-dashboard'
import Profile from './pages/Profile'
import { About } from './pages/StaticContent/About'
import { NotFound } from './pages/StaticContent/NotFound'
import { FAQ } from './pages/StaticContent/FAQ'
import { Footer } from './components/Footer'
import { useLocalStorage } from './CustomHooks/useLocalStorage'

function App() {

  const [loggedInUser, setLoggedInUser] = (useLocalStorage('user', null));

  function isAuthorizedAsApplicationAdmin() {
    let isAuthorized = false;
    if (loggedInUser !== null){
      for (let i = 0; i < loggedInUser.roles.length; i++){
        if(loggedInUser.roles[i] === 'admin'){
          isAuthorized = true;
        }
      }
    }
    return isAuthorized;
  }

  // This is mainly for changing the url from /admin-dashboard when user is redirected to "Home"
  function Redirect() {
    window.history.pushState('/', '', '/');
    return (
      <Home />
    )
  }

  return (
    <Router>
      <div className="App">
        <Header></Header>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/thread/:id" element={<SingleThreadView />}></Route>
            <Route exact path="/family" element={<Family />}></Route>
            <Route exact path="/family/:id" element={<Family />}></Route>
            {/* <Route exact path="/family/create" element={<CreateFamily />}></Route> */}
            <Route exact path="/family/:familyId/members" element={<Members />}></Route>
            <Route exact path="/family/:familyId/blockedMembers" element={<BlockedMembers />}></Route>
            {/* <Route exact path="/family/:familyId/invite" element={<InviteMembers />}></Route> */}
                      <Route exact path="/searchresult" element={<SearchResult />}></Route>
                      <Route exact path="/admin-dashboard" element={isAuthorizedAsApplicationAdmin() ? <AdminDashboard /> : <Redirect />} />
            <Route exact path ="/profile" element={<Profile />}></Route>
            <Route exact path ="/about" element={<About />}></Route>
            <Route exact path ="/faq" element={<FAQ />}></Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer></Footer>
      </div>
    </Router>
  )
}
export default App
