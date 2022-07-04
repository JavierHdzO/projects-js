const heroes = 
{
    capi:
    {
        nombre:'Capitan America',
        poder:'Aguantar inyecciones son morir'
    },
    iron:
    {
        nombre:'Iron Man',
        poder:'Absurda cantidad de dinero'
    },
    spider:
    {
        nombre:'Spiderman',
        poder:'La mejor reaccion alergica a las picaduras de aranas'
    },

}

export const buscarHeroe = (heroeId,    11 ) =>
{
    const heroe = heroes[heroeId];

    if( heroe )
    {
        callback();
    }else 
    {
        callback(`No existe un erroe con el id ${heroeId}`);
    }
}