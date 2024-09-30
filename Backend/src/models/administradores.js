import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'


const adminSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    apellido:{
        type:String,
        required:true,
        trim:true,
    },
    contraseña:{
        type:String,
        required:true
    },
    token:{
        type:String,
        default:null
    }
},
{
    timestamps:true
})


const usuarioSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    apellido:{
        type:String,
        required:true,
        trim:true
    },
    entidad:{
        type:String,
        required:true,
        enum:['Natural', 'Jurídica']
    },
    codigo:{
        type:String,
        required:true,
        unique:true
        
    }
},
{
    timestamps:true
}
)


//método para encriptar contraseña
adminSchema.methods.encryptPassword = async function(contraseña) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(contraseña,salt)
    return hash
}

// método para conocer si la contraseña ya se encuentra en la base de datos
adminSchema.methods.matchPassword = async function(contraseña) {
    const response = await bcrypt.compare(contraseña,this.contraseña)
    return response
}


// método para crear un token
adminSchema.methods.createToken = async function () {
    const createToken = this.token = Math.random().toString(36).slice(2)
    return createToken
}

export default model('administradores',adminSchema)
export const Usuarios = model('usuarios',usuarioSchema)