function createNewCard() {
  let cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerHTML = `
  <div class="card-down"></div>
  <div class="card-up"></div>
  `
  return cardElement;
}
// createNewCardTest();


function appendNewCard(parentElement) {
  let cardElement = createNewCard();
  parentElement.appendChild(cardElement);
  return cardElement; 

}
// appendNewCardTest();


function shuffleCardImageClasses() {
  let cardClasses = [
    "image-1", "image-1", "image-2", "image-2",
    "image-3", "image-3", "image-4", "image-4",
    "image-5", "image-5", "image-6", "image-6"
  ];
  return _.shuffle(cardClasses);
}
// shuffleCardImageClassesTest()


function createCards(parentElement, shuffledImageClasses) {
  let cards = [];
  for (let i = 0; i < 12; i++) {
    let newCard = appendNewCard(parentElement);
    newCard.classList.add(shuffledImageClasses[i]);
    let cardObject = {
      index: i,
      element: newCard,
      imageClass: shuffledImageClasses[i],
    }
    cards.push(cardObject);
  }
  return cards;

}
// createCardsTest();


function doCardsMatch(cardObject1, cardObject2) {
  if (cardObject1.imageClass === cardObject2.imageClass) {
    return true;
  } else {
    return false;
  }
}
// doCardsMatchTest();

let counters = {};


function incrementCounter(counterName, parentElement) {
  if(counters[counterName] === undefined) {
    counters[counterName] = 0;
  }
  counters[counterName]++;
  parentElement.innerHTML = counters[counterName]; 
}
// incrementCounterTest();

let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {
  let flipped = document.getElementById("flip-count");
  incrementCounter("flip-count",flipped);
  if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }

  if(!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }

  let matched = document.getElementById("match-count");
  incrementCounter("match-count", matched);
  newlyFlippedCard.element.classList.add("border-glow");
  lastCardFlipped.element.classList.add("border-glow");

  if (Number(matched.innerHTML) === 6) {
    winAudio.play();
  } else {
    matchAudio.play();
  }
  lastCardFlipped = null;
}

function resetGame() {
  let resetCard = document.getElementById("card-container");

  while (resetCard.firstElementChild !== null) {
    resetCard.removeChild(resetCard.firstElementChild);
  }
  document.getElementById("match-count").innerHTML = 0;
  document.getElementById("flip-count").innerHTML = 0;
  counters = {};
  lastCardFlipped = null;

  let newGame = createCards(resetCard, shuffleCardImageClasses());
  if (newGame !== null) {
    for (let i = 0; i < newGame.length; i++) {
      flipCardWhenClicked(newGame[i]);
    }
  }

}

setUpGame();