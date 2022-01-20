import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import SingleThreadView from './pages/SingleThreadView/SingleThreadView'
function App() {

  return (
    <Router>
      <div className="App">
        <Header></Header>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/thread" element={<SingleThreadView />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
