import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import SingleThreadView from './pages/SingleThreadView/SingleThreadView'
import Family from './pages/Family'
import CreateFamily from './components/FamilyComponents/CreateFamily'
function App() {

  return (
    <Router>
      <div className="App">
        <Header></Header>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/thread" element={<SingleThreadView />}></Route>
            <Route exact path="/family" element={<Family />}></Route>
            <Route exact path="/family/create" element={<CreateFamily />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
