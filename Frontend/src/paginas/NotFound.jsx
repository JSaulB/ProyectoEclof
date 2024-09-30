import { Link } from "react-router-dom"
import luffy from '../assets/luffyconfundido.jpeg'

export const NotFound = () =>{
    return (

        <div className="flex-col flex items-center justify-center">
            <img className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src={luffy} alt="image description"/>



            <div className="flex flex-col items-center justify-center">
                
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12 hover:text-gray-500">Página no encontrada</p>
                
                <p className="md:text-lg lg:text-xl text-gray-200 mt-8">Lo siento pero la ruta que buscas no existe</p>


            </div>
            <div className="my-4">  
                <button
                    className="p-2 w-full block text-center bg-gray-700 text-slate-200 border rounded-xl  duration-300 hover:bg-gray-800 hover:text-white">
                    <Link to={'/'}> Regresar al Inicio</Link>
                </button>
            </div>
        </div>
    )
}