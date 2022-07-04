import {buscarHeroe} from './js/callbacks'
import './styles.css';

const heroeId = "Capi";
buscarHeroe( heroeId, (err, heroe )=>{
    console.log( heroe )

    if( heroe )
    {
        console.log( heroe );
    }else
    {
        console.error("Elemento no encotrado");
    }
});




