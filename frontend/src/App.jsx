import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Artists from './pages/Artists';
import Artifacts from './pages/Artifacts';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Artifacts />} />  // Publicly accessible Artifacts page
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/artists" element={<Artists />} />  // Artists page with artifact adding feature
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
