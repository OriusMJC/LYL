import Nav from "./Nav";
import s from './Styles/About.module.css'
import Map from './Map'

export default function About(){
    return (
        <div id={s.aboutContainer}>
            <Nav/>
            <h1>SOMOS L&L AUTOMOTORES Y ESTAMOS ACÁ PARA AYUDARTE!</h1>
            <div className={s.dataAbout}>
                <div >
                    <h2>PAGO Y TRANSFERENCIA SEGURA</h2>
                    <p>L&L TE HACE EL RESTO FÁCIL. 
                    REALIZAMOS TODOS LOS TRÁMITES RÁPIDAMENTE Y TE TRANSFERIMOS A TU BANCO
                    </p>
                </div>
                <hr></hr>
                <div >
                    <h2>HORARIOS DE ATENCIÓN</h2>
                    <p>LUNES A VIERNES DE 10HS A 13HS Y 15HS A 18HS
                    </p>
                </div>
            </div>
            <h2>ENCUENTRANOS AQUÍ</h2>
            <div id={s.map}>
                <Map/>
           </div>
        </div>
    )
}