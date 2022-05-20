const searchBtn = document.querySelector('.search_btn')
const saveBtn = document.querySelector('.save_btn')
const main = document.querySelector('.main_cards')
const extra = document.querySelector('.extra_cards')
const cardList = document.querySelector('.card_list')

let deck = { 
  //main deck limit =  60 cards
  'main count': 0,
  //extra deck limit 15 cards
  'extra count': 0
}


searchBtn.addEventListener('click', search);

function search(){
  let searchVal = document.querySelector('input').value
  let url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?&fname=${searchVal}` //can change url depending on filters selected such as attribute, type, level, etc

  fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php`)
    .then(response => response.json())
    .then(d => {
      cardList.innerText = ''; //clear on search
      cardList.scrollTop = 0; //return to top of cardList on search

      for(const card of d.data){
        //search for card that contains value in its name or description(effect)
        if(card.name.toLowerCase().includes(document.querySelector('input').value.toLowerCase())
        || card.desc.toLowerCase().includes(document.querySelector('input').value.toLowerCase())){
          // console.log(card)
          let section = document.createElement('section')
          section.classList.add('card')

          //display link/rank/level depending on type of monster
          if(card.type.includes('Link')){
            section.innerHTML = ` 
                            <img src="${card.card_images[0].image_url}" alt="" loading ="lazy">
                            <section class="head">
                              <span>${card.name}</span>
                              <div class = "type">${card.type}</div>
                              <div class = "info"> ${card.attribute} - ${card.race} / Link: ${card.linkval}</div>  
                              <div class="stats"> ATK: ${card.atk}</div>                 
                            </section>`
          }
          else if(card.type.includes('XYZ')){
            section.innerHTML = ` 
                            <img src="${card.card_images[0].image_url}" alt="" loading ="lazy">
                            <section class="head">
                              <span>${card.name}</span>
                              <div class = "type">${card.type} </div>
                              <div class = "info"> ${card.attribute} - ${card.race} / Rank: ${card.level}</div>     
                              <div class="stats"> ATK: ${card.atk} / DEF: ${card.def}</div>                 
                            </section>`
          }
          else if(card.type.includes('Pendulum')){
            section.innerHTML = ` 
                            <img src="${card.card_images[0].image_url}" alt="" loading ="lazy">
                            <section class="head">
                              <span>${card.name}</span>
                              <div class = "type">${card.type} </div>
                              <div class = "info"> ${card.attribute} - ${card.race} / Level: ${card.level}</div> 
                              <div>Scale: ${card.scale}</div>       
                              <div class="stats"> ATK: ${card.atk} / DEF: ${card.def}</div>                 
                            </section>`
          }
          else if(card.type.includes('Monster')){
            section.innerHTML = ` 
                            <img src="${card.card_images[0].image_url}" alt="" loading ="lazy">
                            <section class="head">
                              <span>${card.name}</span>
                              <div class = "type">${card.type} </div>
                              <div class = "info"> ${card.attribute} - ${card.race} / Level: ${card.level}</div>       
                              <div class="stats"> ATK: ${card.atk} / DEF: ${card.def}</div>                 
                            </section>`
          }else{
            section.innerHTML = ` 
                            <img src="${card.card_images[0].image_url}" alt="" loading ="lazy">
                            <section class="head">
                              <span>${card.name}</span>
                              <div class = "type">${card.type} - ${card.race}</div>                         
                            </section>`
          }
          

          // section.innerHTML += `<div class="effect">${card.desc}</div>`  
          
         cardList.appendChild(section)                   
        }
      }
    });
}

//display card information on mouseover of card image
cardList.addEventListener('mouseover', showInfo)
main.addEventListener('mouseover', showInfo)
extra.addEventListener('mouseover', showInfo)

function showInfo(e){
  fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
    .then(response => response.json())
    .then (d => {
      for(const card of d.data){
        if(card.card_images[0].image_url === e.target.src){
          document.querySelector('#card_info_img').src = card.card_images[0].image_url
          let text = document.querySelector('#card_info_text')
          if(card.type.includes('Link')){
            text.innerHTML = `
                          <div>${card.name}</div>
                          <div>${card.type} - ${card.attribute} - ${card.race} </div>
                          <div>Link ${card.linkval}</div>
                          <div> ATK: ${card.atk}</div>
                          <div class = 'effect'>${card.desc}</div>
                            `
                         
          }
          else if(card.type.includes('XYZ')){
            text.innerHTML = ` 
                          <div>${card.name}</div>
                          <div>${card.type} - ${card.attribute} - ${card.race} </div>
                          <div>Rank ${card.level}</div>
                          <div> ATK: ${card.atk} / DEF: ${card.def}</div>
                          <div class = 'effect'>${card.desc}</div>
                          
                            `
          }
          else if(card.type.includes('Pendulum')){
            text.innerHTML = ` 
                          <div>${card.name}</div>
                          <div>${card.type} - ${card.attribute} - ${card.race} </div>
                          <div>Level ${card.level}</div>
                          <div>Scale: ${card.scale}</div>
                          <div> ATK: ${card.atk} / DEF: ${card.def}</div>
                          <div class = 'effect'>${card.desc}</div>
                          
                            `
          }
          else if(card.type.includes('Monster')){
            text.innerHTML = ` 
                          <div>${card.name}</div>
                          <div>${card.type} - ${card.attribute} - ${card.race} </div>
                          <div>Level ${card.level}</div>
                          <div> ATK: ${card.atk} / DEF: ${card.def}</div>
                          <div class = 'effect'>${card.desc}</div>
                          
                            `
          }
          else{
            text.innerHTML = ` 
                          <div>${card.name}</div>
                          <div>${card.type} - ${card.race} </div>
                          <div class = 'effect'>${card.desc}</div>
                          `
          }
        }
      }
    })
}



//add card from search list to deck section
cardList.addEventListener('click', addCard)
function addCard(e){
  fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php`)
    .then(response => response.json())
    .then(d => {
      
      for(const card of d.data){
        if(card.card_images[0].image_url === e.target.src){
          //max copies of a card in the deck is 3
          if (deck[card.name] === 3){
            return
          }
          //add card to deck list if not yet added
          else if(!deck[card.name]){
            deck[card.name] = 1
            let image = document.createElement('img')
            image.src = card.card_images[0].image_url
            if(card.type.includes('Fusion') || card.type.includes('Synchro') || card.type.includes('XYZ') || card.type.includes('Link')){
              if(deck['extra count'] === 15){
                return
              }
              deck['extra count']++
              extra.appendChild(image)
            }
            else{
              if(deck['main count'] === 60){
                return
              }
              deck['main count']++
              main.appendChild(image)
            }
          }
          //if card is already in deck, add another copy and count the copies
          else{
            deck[card.name]++
            let image = document.createElement('img')
            image.src = card.card_images[0].image_url
            if(card.type.includes('Fusion') || card.type.includes('Synchro') || card.type.includes('XYZ') || card.type.includes('Link')){
              if(deck['extra count'] === 15){
                return
              }
              deck['extra count']++
              extra.appendChild(image)
            }
            else{
              if(deck['main count'] === 60){
                return
              }              
              deck['main count']++
              main.appendChild(image)
              
            }
          }
        }
    }
  })
}

//delete cards from deck on clicks
main.addEventListener('click', deleteMainDeckCard)
extra.addEventListener('click', deleteExtraDeckCard)

function deleteMainDeckCard(e){
  
  fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php`)
    .then(response => response.json())
    .then(d =>{
      for (const card of d.data){
        if(card.card_images[0].image_url === e.target.src){
          main.removeChild(e.target)
          deck[card.name]--
          deck['main count']--
        }
      }
    })
}

function deleteExtraDeckCard(e){
  fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php`)
    .then(response => response.json())
    .then(d =>{
      for (const card of d.data){
        if(card.card_images[0].image_url === e.target.src){
          extra.removeChild(e.target)
          deck[card.name]--
          deck['extra count']--
        }
      }
    })
}

//Save deck into local storage
saveBtn.addEventListener('click', saveDeck)

function saveDeck(){
  let deck_serialized = JSON.stringify(deck)
  localStorage.setItem('myDeck', deck_serialized)
  localStorage.setItem('mainDeckCards', main.innerHTML)
  localStorage.setItem('extraDeckCards', extra.innerHTML)

  //remove key from deck if it is 0
  for(const card in deck){
    if(deck[card] === 0  
      && card !== 'main count' 
      && card !== 'extra count'){
      delete deck[card]
    }
  }
}

//if there is a deck obj stored in localstorage, set the deck to that obj
if(localStorage.getItem('myDeck')){
  deck = JSON.parse(localStorage.getItem('myDeck'))
  main.innerHTML = localStorage.getItem('mainDeckCards')
  extra.innerHTML = localStorage.getItem('extraDeckCards')
}








