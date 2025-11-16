const sectionmain = document.getElementById('sectionMain')
const boxinput = document.getElementById('boxInput')
const movie = document.getElementById('sectionMovie')
const search = document.getElementById('search')
const searchinput = document.getElementById('searchinput')


search.addEventListener('click',getmovie)
searchinput.addEventListener('keydown',handler)
function handler(){
 if(event.key === 'Enter'){
    getmovie()
 }
}
async function getmovie() {
    const valueinput = searchinput.value.trim()
    if(!searchinput.value){
        console.log('введите текст')
        return;
    }
    try{
        movie.innerHTML = ''
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${valueinput}`)
        const data = await response.json()
        data.forEach(item => {
            const {name,rating,image,summary} = item.show
                const cleanSummary = summary 
        ? summary.replace(/<[^>]*>/g, '').slice(0, 270) + '...'
        : 'No description available';
            const element = document.createElement('div')
                element.classList.add('card')
                element.innerHTML = `
                    <div class="boxinfo">
                    <p class="title">${name}</p>
                    <div class="radio">
                    <p class="rating">${rating?.average || 'N/A'}</p>
                    </div>
                    </div>
                    <img src='${image?.medium || ''}'/>
                    <div class="summary">${cleanSummary}</div>
                `
                movie.appendChild(element)
        });


    }catch{
        console.log('ошибка запроса',error)
    }
}
