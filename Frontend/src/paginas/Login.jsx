import { Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import { useState, useContext } from 'react'
import Mensaje from "./Alerts"
export const Login = ()=>{


    const [mensaje, setMensaje] =  useState({})
    const [form, setForm] = useState({
        nombre: "",
        contraseña: "",
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e) => { 
        e.preventDefault()
        try {
          const urlBackend = `${import.meta.env.VITE_URL_BACKEND}/adminlogin`
          console.log(urlBackend);
          
            const respuesta = await axios.post(urlBackend,form)
            console.log(`respuesta: ${respuesta}`)
            // Obtener un token y guardarlo en el localStorage    
            localStorage.setItem('token',respuesta.data.token)
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
            setMensaje({respuesta:error.response.data.message,tipo:false})
        }
    }

    return (

        <div className="h-screen flex justify-center items-center">
            <div className="p-6 bg-white/50 rounded-lg shadow-2xl ">
            {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                <h1 className="text-3xl font-bold  text-gray-900 mb-4 justify-center flex">INICIAR SESIÓN</h1>
                
             
                    <form onSubmit={handleSubmit}>

                            <div>
                                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre: </label>
                                <input
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    onChange={handleChange}
                                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                                    placeholder="Ingrese su nombre"
                                    />
                            </div>

                            <div>
                                <label htmlFor="contraseña" className="text-gray-700 uppercase font-bold text-sm">Contraseña: </label>
                                <input
                                    id="contraseña"
                                    name="contraseña"
                                    type="password"
                                    onChange={handleChange}
                                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                                    placeholder="Ingrese su contraseña"
                                    />
                            </div>

                            

                            <div className='flex justify-center'>
                                
                            <button
                                className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors"
                                type="submit"
                                >
                                      Iniciar Sesión
                                </button>
                            </div>
                    </form>
                      
            </div>
        </div>
    )
}