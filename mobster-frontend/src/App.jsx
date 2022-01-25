import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Family from './pages/Family'
import CreateFamily from './components/FamilyComponents/CreateFamily'
import Members from './components/FamilyComponents/Members'
import BlockedMembers from './components/FamilyComponents/BlockedMembers'
function App() {

  return (
    <Router>
      <div className="App">
        <Header></Header>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/family/:id" element={<Family />}></Route>
            <Route exact path="/family/create" element={<CreateFamily />}></Route>
            <Route exact path="/family/:familyId/members" element={<Members />}></Route>
            <Route exact path="/family/:familyId/blockedMembers" element={<BlockedMembers />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
