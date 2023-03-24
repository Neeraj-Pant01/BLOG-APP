import Homepage from './components/pages/Homepage';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';
import Setting from './components/pages/setting/Setting';
import Single from './components/pages/single/Single';
import Write from './components/pages/write/Write';
import Topbar from './components/topbar/Topbar';
import { Route, Routes} from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
  const {user} = useContext(Context)
  return (
    <div className="App">
      <Topbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={user ? <Homepage /> : <Login />} />
        <Route path="/register" element={ user ? <Homepage /> : <Register />} />
        <Route path="/setting" element={user ? <Setting /> : <Register />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/single/:postId" element={<Single />} />
      </Routes>
    </div>
  );
}

export default App;
