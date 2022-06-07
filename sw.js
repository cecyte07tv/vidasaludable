importScripts('./js/sw-utils.js');

const STATIC_CACHE    = 'static-v1';
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';


const APP_SHELL = [
    './',
    './index.html',
    './desarrollo.html',
    './higiene.html',
    './salud.html',
    './css/styles.css',
    './assets/favicon.ico',
    './js/app.js',
    './js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [

    './assets/img/close-icon.svg',
    './assets/img/header-bg.jpg',
    './assets/img/map-image.png',
    './assets/img/navbar-logo.svg',
    './assets/img/desarrollo-podcast.jpg',
    './assets/img/desarrollo.png',
    './assets/img/higiene.jpg',
    './assets/img/salud.jpg',

    './assets/img/portfolio/desarrollo1.jpg',
    './assets/img/portfolio/desarrollo2.jpg',
    './assets/img/portfolio/desarrollo3.jpg',
    './assets/img/portfolio/desarrollo4.jpg',
    './assets/img/portfolio/desarrollo5.jpg',
    './assets/img/portfolio/desarrollo6.jpg',
    './assets/img/portfolio/escoba.jpeg',
    './assets/img/portfolio/guantes.jpeg',
    './assets/img/portfolio/pelota.jpeg',
    './assets/img/portfolio/salud1.jpg',
    './assets/img/portfolio/salud2.jpg',
    './assets/img/portfolio/salud3.jpg',

    './assets/img/team/1.jpg',
    './assets/img/team/2.jpg',
    './assets/img/team/3.jpg',
    './assets/img/team/3a.jpg',
    './assets/img/team/4.jpg',
    './assets/img/team/5.jpg',
    './assets/img/team/desarrollo1.jpg',
    './assets/img/team/desarrollo2.jpg',
    './assets/img/team/desarrollo3.jpg',
    './assets/img/team/desarrollo4.jpg',


    './assets/img/about/desarrollo1.jpg',
    './assets/img/about/desarrollo2.jpg',
    './assets/img/about/higiene1.jpg',
    './assets/img/about/higiene2.jpg',
    './assets/img/about/higiene3.jpg',
    './assets/img/about/higiene4.jpg',
    './assets/img/about/salud1.jpg',
    './assets/img/about/salud2.jpg',
    './assets/img/about/salud3.jpg',
    './assets/img/about/salud4.jpg',
    './assets/img/about/salud5.jpg',
    './assets/img/about/salud6.jpg',

    'https://use.fontawesome.com/releases/v6.1.0/js/all.js',
    'https://fonts.googleapis.com/css?family=Montserrat:400,700',
    'https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
    //'https://cdn.startbootstrap.com/sb-forms-latest.js',
    
    './music/desarrollo.mp3',
    './music/higiene.mp3',
    './podcast/salud_mental1.ogg',
    './podcast/salud_mental2.ogg',

    './js/scripts.js'
];


//instalacion del SW
self.addEventListener('install', e => {


    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ));

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache => 
        cache.addAll( APP_SHELL_INMUTABLE ));



    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ])  );

});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );

});


self.addEventListener( 'fetch', e => {


    const respuesta = caches.match( e.request ).then( res => {

        if ( res ) {
            return res;
        } else {

            return fetch( e.request ).then( newRes => {

                return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, newRes );

            });

        }

    });

    e.respondWith( respuesta );

});






