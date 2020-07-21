import React from 'react';
import SingleUrl from '../components/singleURLContainer';
import cloudNotAvaliable from '../images/cloud-not-avaliable.png';
import '../styles/rect-loader.css';
import '../styles/url-shortner-container.css';

class URLshortner extends React.Component{
    state = {
        emptyUrlInput: false,
        loading: false,
        error: null,
        urls: []
    }
    
    shortenURL = async (e) =>{
        let urlInput = document.getElementById('input-url');
        let urlInputValue = urlInput.value.trim();
        if(!urlInputValue){
          return  this.setState(() =>({emptyUrlInput: true, error: ''}))
        }else if(urlInputValue){
            this.setState(()=>( {emptyUrlInput: false, loading: true, error: ''}))
           const response = await fetch(`https://rel.ink/api/links/`, {
                method : "POST",
                body : JSON.stringify({url : urlInputValue}),
                headers:{
                  "content-type" : "application/json"
                }
              }).then(res => res.json())
              .then(response => response)
              .catch(e => console.log(e))
                if(!response){
                    return this.setState(()=> ({error: 'network error', loading: false}));
                }else if(response.url[0] === 'Enter a valid URL.'){
                    return this.setState(()=> ({error: 'enter a valid url', loading: false}))
                }
                else if(response){
                    this.setState(()=>({loading: false, error: ''}));
                    urlInput.value = '';
                    return this.setState((prevState)=>({urls: prevState.urls.concat({originalURL: response["url"], shortenURL: `https://rel.ink/${response["hashid"]}`}) }))
                }
        }
    }

    handleCopy = (e) =>{
        const button = e.target;
        const text = e.target.getAttribute('data-copy');
       
        const el = document.createElement('textarea');
        el.value = text;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        const selected =
          document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
          document.getSelection().removeAllRanges();
          document.getSelection().addRange(selected);
        }
            
            button.classList.add('copy-active');
            button.innerText = 'copied !';
            setTimeout(()=>{
                button.classList.remove('copy-active');
                button.innerText = 'copy';
            }, 2000)
    }

    componentDidMount(){
       try{
          const urlFromLocalStorage = localStorage.getItem('urls');
          const urls = JSON.parse(urlFromLocalStorage);
          if(urls){
             return this.setState({ urls });
          }
       } catch(e){
           console.log(e);
       }
    }

    componentDidUpdate(){
       localStorage.setItem('urls', JSON.stringify(this.state.urls));
    }

    render(){
        const {emptyUrlInput, loading ,urls , error} = this.state;
       return(
           <div className="url-shortner-container">
            <div className="url-input-container" >
                <div id="url-label">URL</div>
                <input className={emptyUrlInput ? 'empty-border-style' : '' } title="url" aria-label="url" aria-labelledby="url-label" name="url" id="input-url" type="url" placeholder="Shorten a link here...."/>
                {emptyUrlInput && <span className="empty-warn-span">Please add a link</span>}
                <button  onClick={this.shortenURL} className="btn-primary">Shorten It!</button>
             </div>
            {(error === 'network error') ?  <span className="network-error-span"> <img src={cloudNotAvaliable} alt="network error"/> Network error, please check your internet connection</span> :
            (error === 'enter a valid url')  ? <span className="network-error-span">Please enter a valid url</span> 
             : ''}

             <div className="url-result-container">
                    {loading && 
                     <div className="spinner">
                        <div className="rect1"></div>
                        <div className="rect2"></div>
                        <div className="rect3"></div>
                        <div className="rect4"></div>
                        <div className="rect5"></div>
                    </div>
                    }
                <div className="url-result">
                <SingleUrl handleCopy={this.handleCopy} urls={urls}/>
                </div>
             </div>
           </div>
       )
   }
}

export default URLshortner;