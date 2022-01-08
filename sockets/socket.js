const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controller/socket');


// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    // Verificar autentificacion
    if (!valido) {return client.disconnect(); }

    //Cliente autenticado
    usuarioConectado(uid);

    // Ingresar al usuario en una sala en particular
    // sala global
    client.join(uid);

    // Escuchar el mensaje
    client.on('mensaje-personal', async (payload) => {
        await grabarMensaje(payload);

        io.to(payload.para).emit('mensaje-personal', payload);
    });



    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });



    /*client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });*/


});
