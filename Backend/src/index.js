import app from './server.js'


app.listen(app.get('port'),()=>{
    console.log(`Server ON http://localhost:${app.get('port')}`);
})  