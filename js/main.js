const main = ()=>{
    const mainContainer = document.querySelector('.pokecont');
    //botones para paginación
    const prev = document.querySelector('#previous');
    const next = document.querySelector('#next');
    document.getElementById('page-btns').style.display='flex';
    //botones para el cambio en generacion
    const gens = document.querySelectorAll('.gens');
    //regresar al inicio con el logo
    document.getElementById('logo').onclick = function(event){
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
            alert('No sirvo aún :( - Mi programador es un NyE');
            document.getElementById('searchbar').value='';
            var valoresAceptados = /^[0-9]+/;
            if(busq.match(valoresAceptados)){
                rmChildNodes(mainContainer);
                fetchPoke(busq);
                document.getElementById('page-btns').style.display='none';
            }
            else{
                alert("No es un valor númerico");
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
    });
    next.addEventListener('click',()=>{
        offsetHandler(offset+9);
    });

    const fetchPoke = (id)=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res=> res.json()).then(data=>createPokeCard(data));
    }

    const fetchPokemons = (offset,limit)=>{
        for (let i = offset; i <= offset+limit; i++) {
            fetchPoke(i);       
        }
    };

    const createPokeCard=(pokemon)=>{
        //Se crea la card
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        //Se crea el panel superior de la carta
        const imgColor = document.createElement('div');
        let type=pokemon.types[0].type.name;
        if(type=="grass")
            imgColor.classList.add('img-div-grass');
        else if(type=='fire')
            imgColor.classList.add('img-div-fire');
        else if(type=='water')
            imgColor.classList.add('img-div-water');
        else if(type=='bug')
            imgColor.classList.add('img-div-bug');
        else if(type=='flying')
            imgColor.classList.add('img-div-fly');
        else if(type=='normal')
            imgColor.classList.add('img-div-normal');
        else if(type=='poison')
            imgColor.classList.add('img-div-poison');
        else if(type=='electric')
            imgColor.classList.add('img-div-electric');
        else if(type=='ground')
            imgColor.classList.add('img-div-ground');
        else if(type=='fighting')
            imgColor.classList.add('img-div-fighting');
        else if(type=='fairy')
            imgColor.classList.add('img-div-fairy');
        else if(type=='dark')
            imgColor.classList.add('img-div-dark');
        else if(type=='dragon')
            imgColor.classList.add('img-div-dragon');
        else if(type=='psychic')
            imgColor.classList.add('img-div-psychic');
        else if(type=='ice')
            imgColor.classList.add('img-div-ice');
        else if(type=='rock')
            imgColor.classList.add('img-div-rock');
        else if(type=='ghost')
            imgColor.classList.add('img-div-ghost');
        else if(type=='steel')
            imgColor.classList.add('img-div-steel');
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
        imgColor.appendChild(imgContainer);
        imgColor.appendChild(imgContainerBack);
        card.appendChild(imgColor);
        card.appendChild(pokeNumber);
        card.appendChild(pokeName);

        mainContainer.appendChild(card);
    }
    
    fetchPokemons(offset,limit);
}

document.addEventListener('DOMContentLoaded',main);
