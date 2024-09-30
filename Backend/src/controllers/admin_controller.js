import administradores, { Usuarios } from "../models/administradores.js";
import generarJWT from "../helpers/crearJWT.js";


const login = async (req,res) =>{

    const {nombre, contraseña} = req.body;

    if(Object.values(req.body).includes("")){
        return res.status(400).json({message: "Todos los campos son obligatorios"})
    }

    const administradorDB = await administradores.findOne({nombre}).select("-token")
    if(!administradorDB){
        return res.status(404).json({message: "Administrador no encontrado"})
    }

    const validarContraseña = await administradorDB.matchPassword(contraseña)
    if(!validarContraseña){
        return res.status(403).json({message: "Contraseña incorrecta"})
    }

    const token = generarJWT(administradorDB._id, 'administrador')

    res.status(200).json({
        nombre:administradorDB, token
    })

}


const listUsers = async (req,res) =>{

    try {
        const users = await Usuarios.find();
        res.json(users);
    } catch (msg) {
        res.status(500).json({ message: msg.message });
    }
}


const updateUser = async (req,res)=>{
    try {
        const updatedUser = await Usuarios.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (msg) {
        res.status(400).json({ message: msg.message });
    }
}


const deleteUser = async (req,res) =>{
    try {
        await Usuarios.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuario eliminado' });
    } catch (msg) {
        res.status(500).json({ message: msg.message });
    }
}


const registerAdmin = async (req,res)=>{
    //* Actividad 1 (Request)
    const {nombre,contraseña} = req.body

    //* Actividad 2 (Validaciones)
    if(Object.values(req.body).includes('')){
        return res.status(400).json({msg:'Lo sentimos completa los datos datos'})
    }
    const verificarEmailBDD = await administradores.findOne({nombre})
    if(verificarEmailBDD){
        return res.status(400).json({msg:'Lo sentimos, el nombre ya existe'})
    }

    //* Actividad 3 (Guardar en BDD)
    const nuevoadmin = new administradores(req.body)
    nuevoadmin.contraseña = await nuevoadmin.encryptPassword(contraseña)
    nuevoadmin.createToken()
    await nuevoadmin.save()
    //* Actividad 4 (Respuesta)
    res.status(200).json({msg:'Administrador registrado'})
}


const createUser = async (req, res) => {
    const { nombre, apellido, entidad, codigo } = req.body;
    const newEstudiante = new Usuarios({ nombre, apellido, entidad, codigo });

    try {
        const savedUsuario = await newEstudiante.save();
        res.status(201).json(savedUsuario);
    } catch (msg) {
        res.status(400).json({ message: msg.message });
    }
}



export {
    login,
    listUsers,
    createUser,
    updateUser,
    deleteUser,
    registerAdmin,
}