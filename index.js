let url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
let cities = new Array()
fetch(url).then(blob => blob.json()).then(data => cities.push(...data))

function match(word, cities){
  return cities.filter(place =>{
    let w = new RegExp(word, 'gi')
    return place.city.match(w) || place.state.match(w)
  })
}

let search = document.querySelector(".search")
let suggestion = document.querySelector(".suggestions")

search.onkeyup = () => {
  let value = search.value
  let matches = match(search.value, cities)
  let html = matches.map(place => {
    let regex = new RegExp(search.value, 'gi')
    let cityname = place.city.replace(regex, `<span class="hl">${search.value}</span>`)
    return `
    <li>
      <span class="name">${cityname}, ${place.state}</span>
      <span class="population">${place.population}</span>
    </li>
    `
  }).join('')
  suggestion.innerHTML = html

}
search.onchange = ()=>{
  search.value = ""
}
