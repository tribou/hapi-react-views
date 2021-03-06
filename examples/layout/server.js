'use strict';
const Hapi = require('hapi');
const Path = require('path');
const Vision = require('vision');
const HapiReactViews = require('../..');


require('babel-core/register')({
    presets: ['react', 'es2015']
});


const server = new Hapi.Server();
server.connection();
server.register(Vision, (err) => {

    if (err) {
        console.log('Failed to load vision.');
    }

    server.views({
        engines: {
            jsx: HapiReactViews
        },
        relativeTo: __dirname,
        path: 'views',
        compileOptions: {
            layoutPath: Path.join(__dirname, 'views'),
            layout: 'layout'
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {

            reply.view('home', { title: 'Home Page' });
        }
    });

    server.route({
        method: 'GET',
        path: '/about',
        handler: (request, reply) => {

            reply.view('about', { title: 'About Page' });
        }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Server is listening at ' + server.info.uri);
    });
});
