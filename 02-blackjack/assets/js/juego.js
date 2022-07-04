/**
 * 2C - Two of clubs
 * 2D - Two of diamond
 * 2H - Two od hearts
 * 2S - Two od spades
 */

//PATRON MÓDULO

const moduloJuego = (()=>{
    'use strict';
    //use strict

        

    let deck            = [];
    const tipos         = ['C','D','H','S'],
          especiales    = ['A','J','Q','K'];

    let puntosJugadores = [],
        mensaje           = '';

    //Referencias HTML
    const btnPedir      = document.querySelector('#btnPedir'),
          btnDetener    = document.querySelector('#btnDetener'),
          btnNuevoJuego = document.querySelector('#btnNuevo');

    const puntajeHTML   = document.querySelectorAll('small'),
          divCartas = document.querySelectorAll('.divCartas');


    const inicializarJuego = ( numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];

        for(let i =0; i < numJugadores; i++)
        {
            puntosJugadores.push(0);
        }

        puntajeHTML.forEach( ( elemnt ) => elemnt.innerText = '0' );

        const imgCartas = document.querySelectorAll('.carta');
        imgCartas.forEach( ( carta ) => carta.remove() );

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    };
    

    //Esta funcion crea una nueva baraja desordenada
    const crearDeck = () => {
        deck = [];

        for( let i = 2; i <= 10; i++)
        {
            for( let tipo of tipos)
            {
                deck.push( i + tipo );
            }
        }

        for(let tipo of tipos)
        {
            for (const especial of especiales) {
                deck.push( especial + tipo );
            }
        }

        return _.shuffle(deck);;
    }


    
    //Esta funcion retorna una carta del arreglo deck

    const pedirCarta = () => {

        if( deck.length === 0)
        {
            throw 'No hay cartas en el deck';
        }
        
        return deck.shift();
    }


    const valorCarta  = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);

        return  ( valor === 'A') ? 11 :
                ( isNaN(valor) ) ? 10 : valor * 1;
    }

    //Turno: 0 = primer jugador y Turno:ultimo sera la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntajeHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    };


    const crearCarta = ( carta, turno ) => {

        const nuevaCarta = document.createElement('img');
        nuevaCarta.className = 'carta';
        nuevaCarta.src = `assets/cartas/${ carta }.png`;
        divCartas[ turno ].append( nuevaCarta );
        

    };

    const determinarGanador = () => {
        setTimeout( () => {

            if( puntosComputadora === puntosMinimos )
            {
                mensaje = 'Empate D:';
            } else if ( puntosComputadora > puntosMinimos )
            {
                mensaje = 'Ganaste';
            } 

            alert( mensaje );
        }, 30);
    };

    //Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => 
    {
        let puntosComputadora = 0;
        do
        {
            const carta = pedirCarta();

            console.warn(puntosJugadores.length);
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
            crearCarta(carta, puntosJugadores.length - 1 );

            if( puntosMinimos > 21) 
            {
                mensaje = 'Computadora gana :(';
                break;
            }
        }
        while( (puntosComputadora <  puntosMinimos) && (puntosMinimos <= 21) );
        
        setTimeout( () => {

            if( puntosComputadora === puntosMinimos )
            {
                mensaje = 'Empate D:';
            } else if ( puntosComputadora > puntosMinimos )
            {
                mensaje = 'Ganaste';
            } 

            alert( mensaje );
        }, 30);
        

    };

    //Eventos

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta( carta, 0 );


        if(puntosJugador >21)
        {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
            
            
        } 
        else if( puntosJugador === 21 )
        {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
            
        }
    });

    btnDetener.addEventListener('click',()=>{
        if( puntosJugadores[0] > 0)
        {
            btnDetener.disabled = true;
            btnPedir.disabled = true;

            turnoComputadora( puntosJugadores[0] );  
        }
    });


    //Nuevo Juego

    btnNuevoJuego.addEventListener('click',(  )=>{
        inicializarJuego();
    });

    return {
        nuevoJueego: inicializarJuego
    };
    
}) ();


//EL PATRON MÓDULO es básicamente una función auto invocada
//Que crea un scope local para todo lo que se encuentra dentro de este.


