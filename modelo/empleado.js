const mongoose = require('mongoose');
const EmpleadoSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio']
        },
        apellido: {
            type: String,
            required: [true, 'El apellido es obligatorio']
        },
        fecha_nacimiento: {
            type: String
        },
        categoria: {
            type: String,
            required: [true, 'La categoria es obligatoria']
        }, 
    }
)
//sobreescribimos un método del Schema para modificar el objeto que exporta
EmpleadoSchema.methods.toJSON = function () {
    const { _id, ...Empleados } = this.toObject();
    Empleados.id = _id;
    return Empleados;
}

let Empleado = mongoose.model('Empleado', EmpleadoSchema);
module.exports = Empleado;