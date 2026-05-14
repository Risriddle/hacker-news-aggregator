import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Stories from './pages/Stories'
import Bookmarks from './pages/Bookmarks'
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import {ProtectedRoute} from './components/ProtectedRoute'


function App() {
  return (
    <>
      <section id="center">
        <div>
         <Router>
          <Routes>
            <Route path="/" element={<Stories/>}></Route>
            <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks/></ProtectedRoute>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
          </Routes>
         </Router>
        </div>
       
      </section>

      <div className="ticks"></div>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
