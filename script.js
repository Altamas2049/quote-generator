const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

// Show Loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

//Hide loading 
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}

//Get Quote From Api 
async function getQuote(){
    loading();

    const proxyUrl='https://warm-crag-53380.herokuapp.com/'
    const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl+apiUrl);
        const data =  await response.json();
        //if author is blank add Unknown
        if(data.quoteAuthor===''){
            authorText.innerText='UnKnown';
        }else{
            authorText.innerText=data.quoteAuthor;
        }
        //reduce font size for long quotes
        if (data.quoteText.length>120){
            quoteText.classList.add('long-quote');

        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText=data.quoteText;
        //stop Loader, show the Quote
        complete();
    } catch(error){
        getQuote();
    }
    
}
//Tweet Quote
function tweetQuote(){
    const quote=quoteText.innerText;
    const author=authorText.innerText;
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quote}-${author}`;
    window.open(twitterUrl,'blank');
}

//Event Listerners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On load 
getQuote();
