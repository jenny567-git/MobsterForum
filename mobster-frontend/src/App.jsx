import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import SingleThreadView from './pages/SingleThreadView/SingleThreadView'
import Family from './pages/Family'
import CreateFamily from './components/FamilyComponents/CreateFamily'
import Members from './components/FamilyComponents/Members'
import BlockedMembers from './components/FamilyComponents/BlockedMembers'
import InviteMembers from './components/FamilyComponents/InviteMembers'

import Profile from './pages/Profile'
import { About } from './pages/StaticContent/About'
import { NotFound } from './pages/StaticContent/NotFound'
function App() {

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
            <Route exact path="/family/create" element={<CreateFamily />}></Route>
            <Route exact path="/family/:familyId/members" element={<Members />}></Route>
            <Route exact path="/family/:familyId/blockedMembers" element={<BlockedMembers />}></Route>
            <Route exact path="/family/:familyId/invite" element={<InviteMembers />}></Route>
            <Route exact path ="/profile" element={<Profile />}></Route>
            <Route exact path ="/about" element={<About />}></Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
