import logo from '../media/logo.png'
import s from './Styles/Loading.module.css'

export default function Loading(){
    return(
        <div id={s.loading}>
          <img src={logo} alt='Logo load'/>
        </div>
    )
}