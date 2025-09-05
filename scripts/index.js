const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const getData = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayData(json.data));
};

const displayData = (data) => {
  //1. get the container where to append
  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = ``;

  //   2. get every data individually

  data.forEach((datum) => {
    // console.log(datum);
    //   3. create element

    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
  <button   id="lesson-btn-${datum.level_no}"
            class="border-2 lesson-btn border-[#422AD5] hover:bg-[#422AD5]
            hover:text-white py-2 px-10 rounded-md text-[#422AD5]" onClick="loadLevelWord(${datum.level_no})"
>
            <i class="fa-solid fa-book-open"></i> Lesson- ${datum.level_no}</button>
  `;

    //  4. append

    cardContainer.append(btnDiv);
  });
};
getData();

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
  //   console.log(lessonButtons);
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLevelWord = (id) => {
  //   console.log(id);
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      //   console.log(clickBtn);
      displayWord(json.data);
    });
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
      <div>
              <h2> ${word.word} </h2>
            </div>
            <div>
              <p>${word.meaning}</p>
            </div>
            <div>
              <h2>Example</h2>
            </div>
            <div>
              <p>${word.sentence}</p>
            </div>
            <div>
              <p>সমার্থক শব্দ গুলো</p>
              ${createElements(word.synonyms)}
            </div>
            
    `;
  //   console.log(detailsBox);
  document.getElementById("my_modal_5").showModal();
};

const displayWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = ``;

  if (words.length <= 0) {
    wordContainer.innerHTML = `<div class="text-center col-span-full flex flex-col justify-center items-center">
     <img src="./assets/alert-error.png" alt="">
          <p class="text-[#79716B] col-span-full py-5">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <h1 class="col-span-full text-4xl font-bold pb-8">
            নেক্সট Lesson এ যান
          </h1>
        </div>`;
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
    <div class="rounded-sm bg-white py-12 text-center shadow-md">
          <h2 class="font-bold text-xl"> ${
            word.word ? word.word : "শব্দ পাওয়া যায়নি "
          } </h2>
          <p>Meaning /Pronounciation</p>
          <div> ${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি "} / ${
      word.pronunciation
    }</div>
          <div class=" flex justify-between px-10 mt-4">
          <div class="bg-[#1a91ff1a] p-2 rounded-md hover:bg-[#1073d0b7]""><i onClick="loadWordDetails( ${
            word.id
          })" class="fa-solid fa-circle-info "></i></div>
         <div class="bg-[#1a91ff1a] p-2 rounded-md hover:bg-[#1073d0b7]">
          <i class="fa-solid fa-volume-high"></i>
         </div>
          </div>
        </div>
  `;
    wordContainer.appendChild(wordCard);
  });
  manageSpinner(false);
};

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  //   console.log(searchValue);
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      //   console.log(allWords);
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );
      displayWord(filterWords);
    });
});
