const main = ()=>{
    const mainContainer = document.querySelector('.pokecont');
    const pokeType={
        'bug':['Bicho','img-div-bug',],
        'fire':['Fuego','img-div-fire'],
        'ice':['Hielo','img-div-ice'],
        'grass':['Planta','img-div-grass'],
        'electric':['Electrico','img-div-electric'],
        'water':['Agua','img-div-water'],
        'ground':['Tierra','img-div-ground'],
        'rock':['Roca','img-div-rock'],
        'fighting':['Lucha','img-div-fighting'],
        'flying':['Volador','img-div-flying'],
        'steel':['Acero','img-div-steel'],
        'fairy':['Hada','img-div-fairy'],
        'dragon':['Dragon','img-div-dragon'],
        'dark':['Siniestro','img-div-dark'],
        'ghost':['Fantasma','img-div-ghost'],
        'psychic':['Psíquico','img-div-psychic'],
        'normal':['Normal','img-div-normal'],
        'poison':['Veneno','img-div-poison'],
    }
    console.log();
    //botones para paginación
    const prev = document.querySelector('#previous');
    const next = document.querySelector('#next');
    document.getElementById('page-btns').style.display='flex';
    //botones para el cambio en generacion
    const gens = document.querySelectorAll('.gens');
    //regresar al inicio con el logo
    document.getElementById('logo-cont').onclick = function(event){
        document.getElementById('page-btns').style.display='flex';
        offsetHandler(1);
    }
    //arreglo para el cambio de generaciones
    const pokeregionOffset = [1,152,252,387,494,650,722,810];
    
    //valores base de paginacion
    let offset = 1;
    let limit = 8;
    //busqueda directa
    document.getElementById('search').onclick = function(event){
        var busq = document.getElementById('searchbar').value;
        if(busq==''){
            alert("Introduzca una palabra clave");
        }
        else{
            document.getElementById('searchbar').value='';
            var valoresAceptados = /^[0-9]+/;
            if(busq.match(valoresAceptados)&&busq<899&&busq>=1){
                rmChildNodes(mainContainer);
                fetchUniPoke(busq);
                document.getElementById('page-btns').style.display='none';
            }
            else{
                alert("Valores aceptados: 1 - 898");
            }
        }
    }
    
    //eliminador de nodos
    const rmChildNodes = (parent)=>{
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    //cambiador de offset
    const offsetHandler = (newValue)=>{
        offset = newValue;
        rmChildNodes(mainContainer);
        fetchPokemons(offset,limit);
    }
    //Se añaden los eventlisteners a cada generacion
    gens.forEach((gen,i)=>gen.addEventListener('click',()=>{
        document.getElementById('page-btns').style.display='flex';
        offsetHandler(pokeregionOffset[i]);
    }));

    //se asigna un eventlistener para el cambio de valor en paginacion
    prev.addEventListener('click',()=>{
        if(offset!=1) offsetHandler(offset-9);
        else if(offset==1) offsetHandler(891);
    });
    next.addEventListener('click',()=>{
        if(offset!=891) offsetHandler(offset+9);
        else if(offset==891) offsetHandler(1);
    });

    const fetchPoke = (id)=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res=> res.json()).then(data=>createPokeCard(data));
    }

    const fetchUniPoke = (id)=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res=> res.json()).then(data=>createCard(data));
    }

    const fetchPokemons = (offset,limit)=>{
        for (let i = offset; i <= offset+limit; i++) {
            fetchPoke(i);       
        }
    };

    const createCard=(pokemon)=>{
        //CREAR CARTA FRONTAL
        const front = document.createElement('div');
        front.classList.add('pokemon-card');
        //CREAR CARTA TRASERA
        const back = document.createElement('div');
        back.classList.add('pokemon-card');
        //CREAR CARTA ESPECIAL
        const especial = document.createElement('div');
        especial.classList.add('pokemon-card');

        const imgColor = document.createElement('div');
        let type=pokemon.types[0].type.name;
        imgColor.classList.add(pokeType[type][1]);
        
        const imgColorBack = imgColor.cloneNode(true);
        const imgColorSp = imgColor.cloneNode(true);
        //PARTE DELANTERA DE LA IMAGEN
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        const image = document.createElement('img');
        image.src = pokemon.sprites.front_default;
        imgContainer.appendChild(image);
        //PARTE TRASERA DE LA IMAGEN
        const imgContainerBack = document.createElement('div');
        imgContainerBack.classList.add('img-container');
        const imageB = document.createElement('img');
        imageB.src = pokemon.sprites.back_default;
        imgContainerBack.appendChild(imageB);
        //PARTE ESPECIAL DE LA IMAGEN
        const imgContainerASp = document.createElement('div');
        const imgContainerBSp = document.createElement('div');
        imgContainerASp.classList.add('img-container');
        imgContainerBSp.classList.add('img-container');
        const imgSpA = document.createElement('img');
        const imgSpB = document.createElement('img');
        imgSpA.src= pokemon.sprites.front_shiny;
        imgSpB.src=pokemon.sprites.back_shiny;
        imgContainerASp.appendChild(imgSpA);
        imgContainerBSp.appendChild(imgSpB);
        //Se crea el parrafo del numero del pokemon
        const pokeNumber = document.createElement('p');
        pokeNumber.textContent = `#${pokemon.id.toString().padStart(3,0)}`;
        //Se crea el parrafo del nombre
        const pokeName = document.createElement('p');
        pokeName.classList.add('name');
        pokeName.textContent = pokemon.name;
        //Parrafo con info
        const pokeData = document.createElement('p');
        const pokeDataBack = document.createElement('p');
        const pokeDataSp = document.createElement('p');
        let texto = 'DATOS DEL POKÉMON:<br>';
        let textoBack = 'DATOS DEL POKÉMON:<br>';
        texto += `XP Base: ${pokemon.base_experience} puntos Altura Base: ${pokemon.height} decímetros. Peso: ${pokemon.weight} Decagramos.`;
        let habs='<br> Habilidad Principal: ';
        habs+=pokemon.abilities[0].ability.name;
        let hp=pokemon.stats[0].base_stat;
        let att=pokemon.stats[1].base_stat;
        let def=pokemon.stats[2].base_stat;
        let spa=pokemon.stats[3].base_stat;
        let spd=pokemon.stats[4].base_stat;
        let spee=pokemon.stats[5].base_stat;
        textoBack +=`HP: ${hp} Ataque: ${att} Defensa: ${def}<br> At. Especial: ${spa} Def. Especial: ${spd} Velocidad: ${spee}`;
        pokeData.innerHTML=texto;
        const pokeNumberB = pokeNumber.cloneNode(true);
        const pokeNameB = pokeName.cloneNode(true);
        const pokeNumberSp = pokeNumber.cloneNode(true);
        const pokeNameSp = pokeName.cloneNode(true);
        imgColor.appendChild(imgContainer);
        imgColor.appendChild(imgContainerBack);
        front.appendChild(imgColor);
        front.appendChild(pokeNumber);
        front.appendChild(pokeName);
        front.appendChild(pokeData);

        pokeDataBack.innerHTML=textoBack;
        imgColorBack.appendChild(imgContainerBack);
        back.appendChild(imgColorBack);
        back.appendChild(pokeNumberB);
        back.appendChild(pokeNameB);
        back.appendChild(pokeDataBack);

        let pokeT = pokemon.types[0].type.name;
        pokeT = pokeType[pokeT][0];
        let textoSp = `Tipo 1: ${pokeT}`;
        for(let i = 1; i < pokemon.types.length; i++){
            pokeT = pokemon.types[i].type.name;
            pokeT = pokeType[pokeT][0];
            textoSp+=` - Tipo ${i+1}: ${pokeT}`;
        }
        
        pokeDataSp.innerHTML=textoSp;
        imgColorSp.appendChild(imgContainerASp);
        imgColorSp.appendChild(imgContainerBSp);
        especial.appendChild(imgColorSp);
        especial.appendChild(pokeNumberSp);
        especial.appendChild(pokeNameSp)
        especial.appendChild(pokeDataSp)

        mainContainer.appendChild(front);
        mainContainer.appendChild(back);
        mainContainer.appendChild(especial);
    }
    const createPokeCard=(pokemon)=>{
        //Se crea la card
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        //Se crea el panel superior de la carta
        const imgColor = document.createElement('div');
        let type=pokemon.types[0].type.name;
        imgColor.classList.add(pokeType[type][1]);
        //Se crea el contenedor de la imagen
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        const imgContainerBack = document.createElement('div');
        imgContainerBack.classList.add('img-container');
        //Se crea la etiqueta de la imagen con su src
        const image = document.createElement('img');
        image.src = pokemon.sprites.front_default;
        const imageB = document.createElement('img');
        imageB.src = pokemon.sprites.back_default;
        //Se añade la imagen a su contenedor
        imgContainer.appendChild(image);
        imgContainerBack.appendChild(imageB);
        //Se crea el parrafo del numero del pokemon
        const pokeNumber = document.createElement('p');
        pokeNumber.textContent = `#${pokemon.id.toString().padStart(3,0)}`;
        //Se crea el parrafo del nombre
        const pokeName = document.createElement('p');
        pokeName.classList.add('name');
        pokeName.textContent = pokemon.name;

        const btnInfo = document.createElement('input');
        btnInfo.type="button";
        btnInfo.title=pokemon.id;
        btnInfo.value="Ver más...";
        btnInfo.classList.add('btninfo');
        
        btnInfo.addEventListener('click',()=>{
            console.log(btnInfo.title);
            document.getElementById('page-btns').style.display='none';
            rmChildNodes(mainContainer);
            let pkmn = btnInfo.title;
            fetchUniPoke(pkmn);
        })

        imgColor.appendChild(imgContainer);
        imgColor.appendChild(imgContainerBack);
        card.appendChild(imgColor);
        card.appendChild(pokeNumber);
        card.appendChild(pokeName);
        card.title=pokemon.name;
        card.appendChild(btnInfo);

        mainContainer.appendChild(card);
    }
    fetchPokemons(offset,limit);

}

document.addEventListener('DOMContentLoaded',main);
