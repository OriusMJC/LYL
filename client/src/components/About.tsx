import Nav from "./Nav";
import s from './Styles/About.module.css'

export default function About(){
    return (
        <div id={s.aboutContainer}>
            <Nav/>
            <section>
                <h1>Somos L&L automotores y estamos acá para ayudarte!</h1>
           </section>
        </div>
    )
}