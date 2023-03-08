import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import HeaderComponent from './components/HeaderComponent';
import LoginPage from './components/LoginPage';
import HomePage from './components/homePage';
//Solo Archivos
import UploadFotoPage from './components/UploadFotoPage';
import EditarPerfilPage from './components/EditarPerfilPage';
import VerFotoPage  from './components/VerFotoPage';
import EditarAlbumPage from './components/editarAlbumsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <HeaderComponent/>
      <Routes>
          <Route path='/' element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/dashboard" element={<HomePage/>}/>
          <Route path="/editPerfil" element={<EditarPerfilPage/>}/>
          <Route path="/upload" element={<UploadFotoPage/>}/>
          <Route path="/verFoto" element={<VerFotoPage/>}/>
          <Route path="/editarAlbums" element={<EditarAlbumPage/>}/>



      </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
