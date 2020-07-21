import React from 'react';

const SingleUrl = (props) =>(
    <>{props.urls &&
         props.urls.map((url, index)=>(
         <div key={index}>
            <div className="url">
           <span className="original-url">{url.originalURL}</span>
            <span className="shortened-url">{url.shortenURL}</span>
          </div>
            <button onClick={props.handleCopy} data-copy={url.shortenURL} className="copy-btn">copy</button>
        </div> 
        ))}
    </>
)
export default SingleUrl;