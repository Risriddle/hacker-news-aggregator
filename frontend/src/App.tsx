import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Stories from './pages/Stories'
import './App.css'

function App() {


  return (
    <>
      <section id="center">
        
        <div>
         <Router>
          <Routes>
            <Route path="/" element={<Stories/>}>

            </Route>
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
