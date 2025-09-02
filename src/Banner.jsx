import { useState } from 'react' 
import logo from './assets/logo.png'
import './index.css'

export default function Banner() {
    return(
        <div className='Banner'>
             <img src={logo} alt="Logo" width={50}/>
        </div>
    )
}