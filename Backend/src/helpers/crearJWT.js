import jwt from 'jsonwebtoken'

const generarJWT = (id,rol)=>{
    return jwt.sign({id,rol},process.env.JWT_SECRET,{expiresIn:"1h"})
}
// EXPORTAR LA FUNCIÓN
export default  generarJWT