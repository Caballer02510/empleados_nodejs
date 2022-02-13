const express = require('express');
require('dotenv').config();
const { dbConnection } = require('../database/config')
const Empleado = require('./empleado');
const { body,validationResult,check} = require('express-validator');
const port = process.env.PORT;
class Server {
    constructor(){
        this.app = express();
        this.conectarDB();
        this.middlewares();
        this.rutas();
    }
    middlewares(){
        this.app.use(express.json())//Middleware para leer json;
        this.app.use(express.static('public'));
        //^Middleware para servir la carpeta public
    }
    async conectarDB(){
        await dbConnection()
    }
    rutas() {
        /******* RUTAS DEL EMPLEADO*****/
        this.app.get('/webresources/generic/empleados/:id', async function (req, res) {
            const id = req.params.id;
            let empleado = await Empleado.findById(id);
            res.json(
                empleado

            )
        })
        this.app.get('/webresources/generic/empleados', async function (req, res) {
            let empleados = await Empleado.find();
            res.json(
                empleados
                //[{"categoria":"chucherias","id":30,"imagen":"chuches.jpg","nombre":"chupa chus de naranja","precio":0.0},{"categoria":"chucherias","id":31,"imagen":"chuches.jpg","nombre":"chicle de melón","precio":0.0},{"categoria":"postres","id":33,"imagen":"melon.jpg","nombre":"Melon de chino","precio":2.0},{"categoria":"postres","id":34,"imagen":"melon.jpg","nombre":"Melon de sapo","precio":2.0},{"categoria":"bebidas","id":35,"imagen":"burger/fanta.png","nombre":"Coca cola de melón","precio":3.0},{"categoria":"refrescos","id":38,"imagen":"sandia.jpg","nombre":"refresco de kiwi","precio":2.0},{"categoria":"bocadillos","id":39,"imagen":"cod-1659603340642614231-bocadillo.jfif","nombre":"Bocadillo de calamares","precio":5.0},{"categoria":"bebidas","id":40,"imagen":"cod-737444841162795513-bocata2.jpg","nombre":"cerveza","precio":2.0}]
            )
        })
        this.app.post('/webresources/generic/empleados', function (req, res) {
            const body = req.body;
            let miEmpleado = new Empleado(body);
            miEmpleado.save();
            res.json({
                ok: true,
                msg: 'post API empleados',
                miEmpleado
            })
        })
        //put-empleados
        this.app.put('/webresources/generic/empleados/:id', async function (req, res) {
            const body = req.body;
            const id = req.params.id;
            await Empleado.findByIdAndUpdate(id, body);
            res.json({
                ok: true,
                msg: 'post API empleados',
                body
            })
        })
        //delete empleados
        this.app.delete('/webresources/generic/empleados/:id', async function (req, res) {
            const id = req.params.id;
            await Empleado.findByIdAndDelete(id);
            res.status(200).json({
                ok: true,
                msg: 'delete API'
            })
        })
    }
    

    listen(){
        this.app.listen(port, function() { 
            console.log('Escuchando el puerto',port)});
    }
}
module.exports = Server;