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
  <button
            class="border-2 border-[#422AD5] hover:bg-[#422AD5] hover:text-white py-2 px-10 rounded-md text-[#422AD5]" onClick="loadLevelWord(${datum.level_no})"
>
            <i class="fa-solid fa-book-open"></i> Lesson- ${datum.level_no}</button>
  `;

    //  4. append

    cardContainer.append(btnDiv);
  });
};
getData();

const loadLevelWord = (id) => {
  //   console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayWord(json.data));
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
          <div class="bg-[#1a91ff1a] p-2 rounded-md hover:bg-[#1073d0b7]""><i class="fa-solid fa-circle-info "></i></div>
         <div class="bg-[#1a91ff1a] p-2 rounded-md hover:bg-[#1073d0b7]">
          <i class="fa-solid fa-volume-high"></i>
         </div>
          </div>
        </div>
  `;
    wordContainer.appendChild(wordCard);
  });
};
