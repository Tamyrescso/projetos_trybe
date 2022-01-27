import React from 'react'
import star from'../images/star.svg';
import wars from'../images/wars.svg';
import './opening.css';

//Abertura baseada no código: https://css-tricks.com/snippets/css/star-wars-crawl-text/


function Opening() {
  return (
    <div className="starwars">
      <img src={star} alt="Star" className="star"/>
      <img src={wars} alt="Wars" className="wars"/>
      <h2 className="byline" id="byline">Planets DataTable</h2>
    </div>
  )
}

export default Opening
