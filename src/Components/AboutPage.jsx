import React from 'react'
import './Css/AboutPage.css'
import {Link} from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className='AboutPage'>

      <div className="firstSection">
        <h1>About Me</h1>
        <div className="box" id='box1'>
            <h3>I Belongs To Pauri District of State Uttarakhand</h3>
            <h3>My Hometown is Binak</h3>
            <h3>My Hobbies are playing Videogames,Reading,Writing Etc.</h3>
        </div>

        <div className="box" id='box2'>
            <h3>I am Graduated from <Link to="https://mitrishikesh.in/">MIT Dhalwala</Link>  affiliate To <Link to="https://hnbgu.ac.in/">HNB Garhwal University</Link></h3>
            <h3>I have a Bachelor of Computer Application Degree</h3>
            <h3>I am Full stack Web Developer</h3>
            <h3>I have knowledge in various Computer Languages and frameworks.</h3>

        </div>
      </div>


      <div className="secondSection">
        
        <div className="progress" style={{"--i":85}}>
          <h5>85<span>%</span></h5>
          <h4>html</h4>
        </div>
        
        <div className="progress" style={{"--i":60}}>
          <h5>60<span>%</span></h5>
          <h4>Css</h4>
        </div>

        <div className="progress" style={{"--i":55}}>
          <h5>55<span>%</span></h5>
          <h4>JavaScript</h4>
        </div>
        
        <div className="progress less" style={{"--i":40,"clr":"#43f94a;"}}>
          <h5>40<span>%</span></h5>
          <h4>ReactJs</h4>
        </div>
        
        <div className="progress less" style={{"--i":30,"clr":"#43f94a;"}}>
          <h5>30<span>%</span></h5>
          <h4>NodeJs</h4>
        </div>
        
        <div className="progress less" style={{"--i":40,"clr":"#43f94a;"}}>
          <h5>40<span>%</span></h5>
          <h4>PHP</h4>
        </div>

      </div>
    </div>
  )
}

export default AboutPage