export const Inicio = () =>{
    return (
        <>
        <h1 className="text-4xl py-5">Bienvendida, 
            a continuación se le dara indicaciones de todas las actividades que podrá realizar en el sistema:
        </h1>
        
        <div>

            <h1 className="text-lg font-bold"> Instrucciones: </h1>
            <h1 className="font-bold"> Registro de usuarios:</h1>
            <p>Para registrar un nuevo usuario, debe ingresar a la sección de Registrar usuarios y dar click, 
                luego de eso deberá ingresar los datos del usuario y dar click en el boton "Crear usuario".
            </p>
            <h1 className="font-bold">Visualizar Usuarios:</h1>
            <p>En el apartado de "Visualizar usuarios", tiene la posibilidad de realizar busquedas especificas,
                ya sea utilizando el código, nombre, apellido o entidad, para una mejor busqueda del usuario que desea encontrar.
                En la lista de los usuarios registrados, también existen dos acciones:
            </p>
            <p className="p-3">
                <strong>1. Ver Usuario:</strong> Se puede ver toda la información del usuario en cuestión, esto incluye los datos personales,
                también la fecha de creación del usuario, y la fecha si en alguna ocasión se actualizó sus datos.
            </p>
            <p className="p-3">
                <strong>2. Actualizar Usuario:</strong> Se puede actualizar la información del usuario en cuestión, pero no podrá actualizar el código.
            </p>
            <p className="p-3">
                <strong>3. Eliminar Usuario:</strong> Se puede eliminar el usuario de forma permanente.
            </p>
        </div>



        </>
    )
}