# NFT TOKEN (ERC721)
```
Este token fue creado como un token Proof Of Attendance, para los asistentes  
a [Cypherpunk Nightmares](https://www.youtube.com/user/77jcampuzano).

```

## Que son los NFT's?
```
Los No Fungible Tokens, son tokens que no son repetibles y que por lo general son usados  
para representar activos o caracteres como por ejemplo:  
* Propiedades fisicas - casas, arte.
* Coleccionables virtuales - tarjetas de personajes, gatos.
* Activos con "valor negativo" - Deudas, gravamenes y otras responsabilidades.

```

## Como funciona?
```
La aplicación consta de dos partes pricipales:
* Backend - en este caso los Smart Contracts.
* Frontend - en este caso se usa JS con el framework de ReactJS.

Para el Backend
-------
Se uso solidity en la version 0.7.2 para el desarrollo del contrato principal  
**Cypher.sol**, tambien se uso la libreria de openzeppelin para usar el estandart  
de ERC721 el cual se importa y se le heredan las funciones al contrato principal  
el contrato del ERC721 nos pide inicializar el contrato con el nombre y el simbolo del  token que vamos a crear __constructor() ERC721("Cypherpunk Nightmares", "EVND") public...__

Dentro del constructor inicializamos la variable admin con la cuenta de la wallet que
deploya el contrato.
La funcion **mint** recibe dos parametros **_toPunk** del tipo address, que sera la
direccion del usuario que recibira el token y **_tokenURI** que es el link de la imagen
que queremos que tenga nuestro token.
El **require** es una funcion que en este caso permite que solo el administrador del
contrato pueda ejecutar esa funcion.
El _tokenIds es una funcion que genera un numero de id para cada token nuevo que se envia.
La funcion **_mint** viene del contrato ERC721 y recibe como parametros la direccion del
usuario al que sera enviado el token y el id de ese token (Los Id's no se pueden repetir).
La funcion **_setTokenURI** nos permite guardar metadata dentro del token.
```

### Referencias
* [openzeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721).
* [ERC-721 specification](http://erc721.org/).
* [Cypherpunk Nightmares](https://www.youtube.com/user/77jcampuzano).

### Stack usado.
* [NodeJs](https://nodejs.org/es/).
* [Truffle framework](https://www.trufflesuite.com/).
* [React.js](https://es.reactjs.org/).
* [Ganache](https://www.trufflesuite.com/docs/ganache/overview).
* [Remix IDE](https://remix.ethereum.org/).
* [Infura](https://infura.io/).
