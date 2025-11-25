

const sectionmain = document.getElementById('sectionMain')
const boxinput = document.getElementById('boxInput')
const movie = document.getElementById('sectionMovie')
const search = document.getElementById('search')
const searchinput = document.getElementById('searchinput')
const card = document.querySelector('card')

search.addEventListener('click',getmovie)
searchinput.addEventListener('keydown',handler)
function handler(event){
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
        ? summary.replace(/<[^>]*>/g, '').slice(0, 200) + '...'
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
                element.addEventListener('click',()=>{
                    const {name, rating, image, summary, genres, premiered, language} = item.show
                                    const fullSummary = summary ? summary.replace(/<[^>]*>/g, '').slice(0, 300) + (summary.length > 300 ? '...' : '')
        : 'No description available';
                    movie.style.display = 'none'
                    const elementbig = document.createElement('div')
                    elementbig.classList.add('fullinfo')
                                    elementbig.innerHTML = `
                    <div class="fullcard">
                        <button class="back-btn">← Назад</button>
                        <div class="boxinfo">
                            <p class="title">${name}</p>
                            <div class="radio">
                                <p class="rating">${rating?.average || 'N/A'}</p>
                            </div>
                        </div>
                        <img src='${image?.original || image?.medium || ''}' class="full-image"/>
                        <div class="full-details">
                            ${premiered ? `<p><strong>Release Date:</strong> ${premiered}</p>` : ''}
                            ${language ? `<p><strong>Language:</strong> ${language}</p>` : ''}
                            ${genres && genres.length ? `<p><strong>Genres:</strong> ${genres.join(', ')}</p>` : ''}
                        </div>
                        <div class="full-summary">${fullSummary}</div>
                    </div>
                `
                document.body.appendChild(elementbig)

                const backBtn = document.querySelector('.back-btn')
                backBtn.addEventListener('click',()=>{
                    movie.style.display = 'flex'
                    elementbig.remove()
                })
                
                })
                movie.appendChild(element)
        });


    }catch{
        console.log('ошибка запроса',error)
    }
}
