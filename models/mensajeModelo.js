const {Schema, model} = require('mongoose');

const MensajeSchema = Schema ({
    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    mensaje: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String
    }
},
{
    timestamps: true
});

MensajeSchema.method('toJSON', function() {
    const { __v,  ...object } = this.toObject();
    return object;
})


module.exports = model('Mensaje', MensajeSchema);