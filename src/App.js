import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

// Pages
import Landing from './pages/Landing.js'
import Plans from './pages/Plans.js'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing/>}></Route>
          <Route path="/home" element={<Landing/>}></Route>
          <Route path="/abonnements" element={<Plans/>}></Route>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
