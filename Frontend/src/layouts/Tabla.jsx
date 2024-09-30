import React, { useState, useEffect } from 'react';
import { BsArrowRepeat } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import Modal from '../components/modals/modal';
import { useNavigate } from 'react-router-dom';
import Mensaje from '../paginas/Alerts';
import axios from 'axios';

import { MdArrowBack } from "react-icons/md";
import { GrLinkNext } from "react-icons/gr";
import { FaStepForward } from "react-icons/fa";

export const Tabla = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState({
    codigo: '',
    nombre: '',
    apellido: '',
    entidad: ''
  });

  const filteredUsers = usuarios.filter(usuario =>
    usuario.codigo.toLowerCase().includes(searchTerm.codigo.toLowerCase()) &&
    usuario.nombre.toLowerCase().includes(searchTerm.nombre.toLowerCase()) &&
    usuario.apellido.toLowerCase().includes(searchTerm.apellido.toLowerCase()) &&
    usuario.entidad.toLowerCase().includes(searchTerm.entidad.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginate = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  };

  const listarUsuarios = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_URL_BACKEND}/usuarioseclof`;
      
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const respuesta = await axios.get(url, options);
      setUsuarios(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (action, usuario) => {
    setModalAction(action);
    setSelectedUser(usuario);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalAction(null);
    setSelectedUser(null);
  };

  const handleConfirm = async () => {
    await listarUsuarios();
    closeModal();
  };

  useEffect(() => {
    listarUsuarios();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full mb-4 px-4 flex justify-center items-center space-x-2">
        <input
          type="text"
          name="codigo"
          placeholder="Código..."
          value={searchTerm.codigo}
          onChange={handleSearchChange}
          className="p-2 border rounded shadow-lg w-1/4"
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre..."
          value={searchTerm.nombre}
          onChange={handleSearchChange}
          className="p-2 border rounded shadow-lg w-1/4"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido..."
          value={searchTerm.apellido}
          onChange={handleSearchChange}
          className="p-2 border rounded shadow-lg w-1/4"
        />
        <input
          type="text"
          name="entidad"
          placeholder="Entidad..."
          value={searchTerm.entidad}
          onChange={handleSearchChange}
          className="p-2 border rounded shadow-lg w-1/4"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="w-full px-4">
          <Mensaje tipo={'false'}>{'No se encontraron registros con esos criterios'}</Mensaje>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto shadow-lg bg-white">
            <thead className="bg-gray-900 text-slate-100">
              <tr>
                <th className="p-2">N°</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Apellido/Grupo</th>
                <th className="p-2">Entidad</th>
                <th className="p-2">Código</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginate().map((usuario, index) => (
                <tr key={usuario._id} className="bg-gray-400 text-center hover:bg-gray-900 hover:text-white">
                  <td className="p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="">{usuario.nombre}</td>
                  <td className="">{usuario.apellido}</td>
                  <td className="">{usuario.entidad}</td>
                  <td className="">{usuario.codigo}</td>
                  <td className="">
                    <div className="flex justify-center items-center space-x-4">
                      <button
                        className="p-2 hover:bg-gray-700 rounded-full"
                        onClick={() => openModal('actualizar', usuario)}
                      >
                        <BsArrowRepeat size={24} />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-700 rounded-full"
                        onClick={() => openModal('borrar', usuario)}
                      >
                        <RiDeleteBinLine size={24} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="p-4 flex justify-center items-center space-x-4">
        <button 
          disabled={currentPage === 1} 
          className={`px-4 py-2 bg-gray-400 hover:bg-gray-900  hover:text-white rounded ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <MdArrowBack size={20} />
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button 
          disabled={currentPage === totalPages} 
          className={`px-4 py-2 bg-gray-400 hover:bg-gray-900 hover:text-white rounded ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <GrLinkNext size={20} />
        </button>
        <button 
          disabled={currentPage === totalPages} 
          className={`px-4 py-2 bg-gray-400 hover:bg-gray-900 hover:text-white rounded ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`} 
          onClick={() => setCurrentPage(totalPages)}
        >
          <FaStepForward size={20} />
        </button>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        action={modalAction}
        data={selectedUser}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Tabla;