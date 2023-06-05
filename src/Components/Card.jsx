import React from 'react'
import {Link} from "react-router-dom"

const Card = (props) => {
  return (
    <div className='card'>
        <div className="imgbox">
            <img src={props.img} alt="" />
        </div>
        <div className="textBox">
            <h4>{props.title}</h4>
            <p>{props.desc}</p>
        </div>
        <h5>
            <Link target='_blank' to={props.url}>Visit Work</Link>
            </h5>
    </div>
  )
}

export default Card