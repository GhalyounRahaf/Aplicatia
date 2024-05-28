import "bootstrap/dist/js/bootstrap.bundle.js"

import './App.css'
import './Dashboard/css/style.css';

import './Dashboard/charts/ChartjsConfig';
// Import Router................
import Router from './Router/Router'

export default function App() {
  return (
    <>
     <Router />
    </>
  )
}

