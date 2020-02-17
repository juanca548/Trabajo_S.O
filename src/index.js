const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { exec } = require("child_process");
const app = express();

//Settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.get("/carpeta", (req, res) => {
    const direccion = req.query.dir
    let directorioPath = path.join(__dirname+'/root/'+direccion)
    exec('ls -l', {cwd: directorioPath}, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        let informacionDirectorios = stdout.split("\n")
        informacionDirectorios = informacionDirectorios.slice(1, informacionDirectorios.length-1)
        let resultado = []
        informacionDirectorios.map( elemento =>{
            let informacionDirectorio = elemento.split(" ")
            resultado.push({
                permissions: informacionDirectorio[0].split(''),
                owner:  informacionDirectorio[2],
                fileDirName: informacionDirectorio[informacionDirectorio.length-1]
            })
        })
        res.json(resultado)
    });
    
})

app.post("/api/guardarCarpetaOArchivo", (req, res) => {
    const direccion = req.body.dir
    const tipo = req.body.type
    const nombre = req.body.name
    let directorioPath = path.join(__dirname+'/root/'+direccion)
    let comando = 'mkdir '+ nombre
    if(tipo =="Archivo"){
        comando = 'touch '+ nombre
    }
    exec(comando, {cwd: directorioPath}, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    
    res.send('/')
})




app.post('/api/changeName', (req, res) => {
    const dir = req.body.dir
    const oldName = req.body.oldName
    const newName = req.body.newName
    let directoryPath = path.join(__dirname+'/root/'+dir)
    exec("mv " + oldName + " " + newName, {cwd: directoryPath}, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    
    res.json('Hello world')
})

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//HTML en todas las rutas para react
app.get('*', (req, res) => res.sendFile(path.join(__dirname+'/public/index.html')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
}); 