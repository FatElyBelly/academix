import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

// Pages
import Landing from './pages/Landing.js'
import Home from './pages/Home.js'
import Plans from './pages/Plans.js'
// Auth pages
import Authentication from './pages/Authentication.js'
import Signout from './pages/Signout.js'

// Authentication
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {

  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={user ? <Home/> : <Landing/>}></Route>
          <Route path="/authentication" element={user ? <Signout/> : <Authentication/>}></Route>
          <Route path="/abonnements" element={user ?<Plans/> : <Authentication/>}></Route>
          <Route path="/signout" element={user ? <Signout/> : <Authentication/>}></Route>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
