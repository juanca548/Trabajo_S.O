//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons'

import React, { Component } from 'react';



export default class App extends Component {
    constructor() {
      super();  
    }
    render(){
        return(
            <div>Hola Mundo</div>
        )
    }
} 

