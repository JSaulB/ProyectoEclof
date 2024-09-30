import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export const Dashboard = () => {
    const [activeLink, setActiveLink] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleLinkClick = (path) => {
        setActiveLink(path);
    };

    const handleBack = () => {
        navigate(-1);
    };


    const handleExit = () => {
        localStorage.removeItem("token")
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <nav className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="p-4">
                    <Link to="/dashboard">
                        <img src="/src/assets/eclofLogo.png" alt="ECLOF Logo" className="w-20 h-auto mx-auto" />
                    </Link>
                </div>
                <ul className="flex-grow flex flex-col justify-center space-y-4">
                    <li 
                        className={`px-4 py-2 cursor-pointer text-center text-2xl ${
                            activeLink === "/dashboard/registrarusuario" ? "bg-gray-800" : "hover:bg-gray-800"
                        }`}
                        onClick={() => handleLinkClick("/dashboard/registrarusuario")}
                    >
                        <Link to="/dashboard/registrarusuario">Registrar usuario</Link>
                    </li>
                    <li 
                        className={`px-4 py-2 cursor-pointer text-center text-2xl ${
                            activeLink === "/dashboard/usuario" ? "bg-gray-800" : "hover:bg-gray-800"
                        }`}
                        onClick={() => handleLinkClick("/dashboard/usuario")}
                    >
                        <Link to="/dashboard/usuario">Visualizar usuarios</Link>
                    </li>
                </ul>
            </nav>
            <div className="flex-1 flex flex-col">
                <header className="bg-gray-900 text-white p-4 flex justify-between items-center relative">
                    <div className="w-24">
                        {location.pathname !== "/dashboard" && (
                            <button 
                                onClick={handleBack}
                            >
                               <IoIosArrowBack size={24} />
                            </button>
                        )}
                    </div>
                    <h1 className="text-5xl font-bold absolute left-1/2 transform -translate-x-1/2">ECLOF</h1>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleExit}> 
                        <Link to="/login">Salir</Link>
                        
                    </button>
                </header>
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};