import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Favourite from './pages/Favourite'
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/favourite' element={<Favourite />} />
      </Routes>
    </>
  );
}

export default App;
