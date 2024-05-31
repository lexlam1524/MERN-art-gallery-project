import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Artists from './pages/Artists';
import Artifacts from './pages/Artifacts';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/artifacts" element={<Artifacts />} /> 
          <Route path="/artists" element={<Artists />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
