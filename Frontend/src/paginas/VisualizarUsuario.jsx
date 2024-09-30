import { Tabla } from "../layouts/Tabla"

export const VisualizarUsuario = () =>{
    
    return (
        <>
        <div className="flex flex-col items-center ">
            <h1 className='font-black text-4xl text-gray-700'>Lista de usuarios</h1>
            <hr className='my-4' />
            <div className="w-full flex justify-center">
                <Tabla/>
            </div>
        </div>
        </>
    )
}