import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export const MainLayout = () => {
  //creamos el estado (por defecto, abierto)
  const[isSidebarOpen,setIsSidebarOpen] = useState(true);
  
  //estado para el rol
  const[userRole, setUserRole] = useState<'Administrador' | 'Estudiante'>('Administrador');

  //funcion para alternar el estado
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  //funcion para alternar el rol
  const toggleRole = () => {
    setUserRole(prev => prev === 'Administrador' ? 'Estudiante' : 'Administrador');
  }

  return (
    <div className="layout-container">
      {/** le pasamos el estado al siderbar */}
      <Sidebar isOpen={isSidebarOpen} userRole={userRole} onToggleRole={toggleRole} />

      <div className="main-content">
        {/**le pasamos la funcion al boton de Navbar */}
        <Navbar  onToggleMenu={toggleSidebar}/>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};