import React, { useState, useEffect, useCallback } from 'react';

import axios from 'axios';


const Modal = ({ isOpen, onClose, action, data, onConfirm }) => {

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [entidad, setEntidad] = useState('')
  const [codigo, setCodigo] = useState('')
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [ultimaActualizacion, setUltimaActualizacion] = useState('')

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha)
  nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
    return new Intl.DateTimeFormat('es-EC',{dateStyle:'long'}).format(nuevaFecha)
  }


  useEffect(() => {

    if (data) {

      setNombre(data.nombre || '')
      setApellido(data.apellido || '')
      setEntidad(data.entidad || '')
      setCodigo(data.codigo || '')
      setFechaCreacion(formatearFecha(data.createdAt));
      setUltimaActualizacion(formatearFecha(data.updatedAt))


    }

  }, [data]);


  const handleConfirm = useCallback(async () => {

    try {

      const token = localStorage.getItem('token');

      const baseUrl = `${import.meta.env.VITE_URL_BACKEND}`;

      const options = {

        headers: {

          'Content-Type': 'application/json',

          Authorization: `Bearer ${token}`

        }

      };


      if (action === 'actualizar') {

        const url = `${baseUrl}/actualizarusuario/${data._id}`;

        const updatedUser = { ...data, nombre, apellido, codigo, entidad };

        await axios.put(url, updatedUser, options);

        onConfirm(updatedUser);

      } else if (action === 'borrar') {

        const url = `${baseUrl}/borrarusuario/${data._id}`;

        await axios.delete(url, options);

        onConfirm(data);

      }


      onClose();

    } catch (error) {

      console.error('Error:', error);

      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario

    }

  }, [action, data, nombre, apellido, codigo, entidad, onConfirm, onClose]);


  if (!isOpen) return null;


  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-2xl justify-center  mt-10 ">

        <h2 className="text-xl font-bold mb-4 justify-center flex">

          {action === 'actualizar' ? 'Actualizar' : action === 'ver' ? 'Ver perfil del' : 'Borrar'} Usuario

        </h2>

        {action === 'actualizar' ? (

          <div className="mb-4">

            <label className="text-gray-700 uppercase font-bold text-sm   ">Nombre:</label>

            <input

              className="w-full p-2 mb-2 border rounded"

              value={nombre}

              onChange={(e) => setNombre(e.target.value)}

              placeholder="Nombre"

            />

            <label className="text-gray-700 uppercase font-bold text-sm ">Apellido:</label>

            <input

              className="w-full p-2 mb-2 border rounded"

              value={apellido}

              onChange={(e) => setApellido(e.target.value)}

              placeholder="Apellido"

            />

            <label className="text-gray-700 uppercase font-bold text-sm ">Código:</label>

            <input

              className="w-full p-2 mb-2 border rounded bg-gray-300 bg-opacity-50 opacity-50"

              value={codigo}

              disabled

              onChange={(e) => setCodigo(e.target.value)}

              placeholder="Código"

            />

            <label className="text-gray-700 uppercase font-bold text-sm ">Entidad:</label>

            <select

              className="w-full p-2 mb-2 border rounded"

              value={entidad}

              onChange={(e) => setEntidad(e.target.value)}

            >

              <option value="" disabled>Seleccione la entidad del usuario</option>

              <option value="Natural">Natural</option>

              <option value="Jurídica">Jurídica</option>

            </select>

          </div>

        ) : action === 'ver' ? (

          <div className="mb-4 p-4">

            <p className='p-2'><strong>Nombre:</strong> {nombre}</p>
            <p className='p-2'><strong>Apellido/Grupo:</strong> {apellido}</p>
            <p className='p-2'><strong>Código:</strong> {codigo}</p>
            <p className='p-2'><strong>Entidad:</strong> {entidad}</p>
            <p className='p-2'><strong>Fecha de creación:</strong> {fechaCreacion}</p>
            <p className='p-2'><strong>Ultima actualización de Datos:</strong> <br/>{ultimaActualizacion}</p>

          </div>

        ) : (

          <p>¿Estás seguro de borrar el usuario {data?.nombre} {data?.apellido}?</p>

        )}

        <div className="mt-4 flex justify-end space-x-2">

          <button

            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"

            onClick={onClose}

          >

            Cancelar

          </button>
          <button
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors"
            onClick={handleConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;