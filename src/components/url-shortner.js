import React from 'react';
import '../styles/url-shortner-container.css';

class URLshortner extends React.Component{
   
   
    render(){
       return(
           <div className="url-shortner-container">
             <input type="url" placeholder="Shorten a link here...."/>
             <button className="btn-primary">Shorten It!</button>
           </div>
       )
   }
}

export default URLshortner;