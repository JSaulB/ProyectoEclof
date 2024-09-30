import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mensaje from './Alerts';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as Yup from 'yup'

export const RegistrarUsuario = ({usuario}) =>{
    
    const navigate = useNavigate()
    const [mensaje,setMensaje] = useState({})

    const initialValues ={
        nombre: usuario?.usuario?.nombre ?? "",
        apellido: usuario?.usuario?.apellido ?? "",
        entidad: usuario?.usuario?.entidad ?? "",
        codigo: usuario?.usuario?.codigo ?? ""


    }

    const validationSchema = Yup.object({
        nombre: Yup.string().matches(/^[A-Za-zÀ-ÿ\-.]+$/, "El nombre solo puede contener letras y guiones")     
        .required("El nombre es requerido"),
        apellido: Yup.string().matches(/^[A-Za-zÀ-ÿ\-.]+$/, "El apellido/grupo, solo puede contener letras y guiones")     
        .required("El apellido/grupo, es requerido"),
        codigo: Yup.number().typeError('Debe ser un número')
        .required('El código del Beneficiario es requerido'),
    });
    

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_URL_BACKEND}/registrarusuarios`;
            console.log(url);
            
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post(url, values, options);
            setMensaje({
                respuesta: "Usuario registrado con éxito",
                tipo: true
            });
            setTimeout(() => {
                navigate('/dashboard/usuario');
            }, 3000);
            console.log(response);
        } catch (error) {
            console.log(error);
            setMensaje({
                respuesta: "Error  al registrar usuario",
                tipo: false
            });
            setTimeout(() => {
                setMensaje({})
            }, 3000);
        } finally {
            setSubmitting(false);
        }
    };

    return (    
        <>

            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-2xl justify-center  mt-10 flex">

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                        <div>
                            <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre: </label>
                            <Field
                                id="nombre"
                                name="nombre"
                                type="text"
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                                placeholder="Ingrese el nombre del usuario"
                            />
                            <ErrorMessage name="nombre" component="div" className="text-red-600 text-sm" />

                        </div>

                        <div>
                            <label htmlFor="apellido" className="text-gray-700 uppercase font-bold text-sm">Apellido/Grupo: </label>
                            <Field
                                id="apellido"
                                name="apellido"
                                type="text"
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                                placeholder="Ingrese el apellido del usuario"
                            />
                            <ErrorMessage name="apellido" component="div" className="text-red-600 text-sm" />

                        </div>
                        <div>
                            <label htmlFor="codigo" className="text-gray-700 uppercase font-bold text-sm">Código: </label>
                            <Field
                                id="codigo"
                                name="codigo"
                                type="number"
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                                placeholder="Ingrese el código del usuario"
                            />
                            <ErrorMessage name="codigo" component="div" className="text-red-600" />
                        </div>

                        <div>
                            <label htmlFor="entidad" className="text-gray-700 uppercase font-bold text-sm">Entidad: </label>
                            <Field
                                as="select"
                                id="entidad"
                                name="entidad"
                                className="border-2 w-full p-2 mt-2  rounded-md mb-5"
                                >
                                <option value="" hidden>Seleccione la entidad del usuario</option>
                                <option value="Natural">Natural</option>
                                <option value="Jurídica">Jurídica</option>
                            </Field>
                        </div>

                        <div className='flex justify-center'>
                            
                            <input
                                type="submit"
                                className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors"
                                value={'Crear usuario'}
                                disabled ={isSubmitting}

                                />
                        </div>
                    </Form>
                )}
            </Formik>
            </div>
        </>
        
    );
};

RegistrarUsuario.propTypes = {
    usuario: PropTypes.object
};
