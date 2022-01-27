import React from 'react';
import './loading.css';

//Loading baseado no código: https://codepen.io/abrahamrkj1/pen/NGZPPX
function Loading() {
  return (
  <div className="loadingWrapper">
		<section className="the-demo">
			<div className="example-item"  id="animate">
				<div className="gradient" id="saberShawdow"></div>
				<div className="lightsaber">
					<label htmlFor="yoda-example"></label>
					<input type="checkbox" id="yoda-example" disabled checked />
					<div className="switch"></div>
					<div className="plasma yoda"></div>
				</div>
			</div>
		
		</section>
	</div>
  )
}

export default Loading;
