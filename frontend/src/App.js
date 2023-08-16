import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './container/Home/Home.js';
import Login from './container/Login/Login';
import Register from './container/Register/Register';
import Layout from './components/Layout/Layout';
import Profile from './container/Profile/Profile';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Unaothorized from './components/Unauthorized/Unaothorized';
import AdminPage from './components/AdminPage/AdminPage';

function App() {
  const ROLES = {
    User: 5110,
    Admin: 5111,
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unaothorized />} />

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/adminPage" element={<AdminPage />} />
        </Route>

        <Route
          element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
        >
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* <Route path='/article/:id' element={<ArticleItem />} />
            <Route path='/results' element={<Results />} />

            <Route path='/signup' element={<SignUp />} /> */}
    </Routes>
  );
}

export default App;
