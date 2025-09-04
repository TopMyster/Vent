import logo from './assets/logo.png'
import './index.css'

export default function Banner() {
    return(
        <div className='Banner'>
             <img src={logo} alt="Logo" width={50}/>
             <h3 style={{marginLeft: 10, fontFamily: " system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", color: 'white', fontWeight: 830,}}>Vent</h3>
        </div>
    )
}