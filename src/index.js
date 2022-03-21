import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard' ; 

/* PrimeReact Library */
import "primereact/resources/themes/mdc-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css";               //core css
import "primeicons/primeicons.css";                            //icons
import "primeflex/primeflex.css" ;                            // flex
import PrimeReact from 'primereact/api';

PrimeReact.ripple = true;

ReactDOM.render(<Dashboard/>, document.getElementById('root'));