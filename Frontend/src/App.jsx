import React from 'react'
import './App.css'
import { Dashboard } from './layouts/dashboard'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { VisualizarUsuario } from './paginas/VisualizarUsuario'
import { RegistrarUsuario } from './paginas/RegistrarUsuarios'
import { Login } from './paginas/Login'
import { Inicio } from './paginas/Inicio'
import { RutaPrivada } from './paginas/routes/RutaPrivada'
import { NotFound } from './paginas/NotFound'
function App() {

  return (
    <>  

     <BrowserRouter>

        <Routes>

          <Route index="/" element={<Login />} />

          <Route path="/login" element={<Login />} />
          <Route path='*' element={<NotFound/>}></Route>





            <Route path='/dashboard/*' element={

              <RutaPrivada>
                <Routes> 
                  <Route element={<Dashboard />}>
                    <Route index element={<Inicio/>}/>

                    <Route path='usuario' element={<VisualizarUsuario />} />

                    <Route path='registrarusuario' element={<RegistrarUsuario />} />
                  </Route>
                </Routes>
            </RutaPrivada>

            }>      
            </Route>



        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
