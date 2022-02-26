let timer;
let deleteFirstImgDelay;

const dogApi = async () => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const jsonRes = await response.json(); //Returns message, success
    console.log(jsonRes.message);
    createBreedList(jsonRes.message); //gives
  } catch (e) {
    document.getElementById(
      "slideshow"
    ).innerHTML = `There was a problem fetching the breed list.`;
  }
};

dogApi();

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
    <select id="selectBreed" style="" onchange = "loadByBreed(this.value)">
          <option value="avoid">Choose a dog breed</option>
          ${Object.keys(breedList)
            .map((breed) => {
              return `<option >${breed}</option>`;
            })
            .join("")}
        </select>
    `;
}
async function loadByBreed(breed) {
  //let val = breed.toLowerCase();
  if (breed != "avoid") {
    //using the value defined in choose a dog breed(to avoid rendering)
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
      const jsonRes = await response.json();
      createSlideShow(jsonRes.message);
    } catch (e) {
      document.getElementById(
        "slideshow"
      ).innerHTML = `There was a problem fetching the breed list.`;
    }
  }
}

function createSlideShow(images) {
  console.log(images);
  let currentImage = 0;
  clearInterval(timer);
  clearTimeout(deleteFirstImgDelay);
  console.log(images);

  if (images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide" style="background-image: url('${images[1]}')"></div>
    `;
    if (images.length == 2) currentImage = 0;
    currentImage += 2;

    timer = setInterval(nextSlide, 2500);
  } else {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide"></div>
    `;
    currentImage += 2;

    timer = setInterval(nextSlide, 2500);
  }
  //This function has scope for this overall function
  function nextSlide() {
    document
      .getElementById("slideshow")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="slide" style="background-image: url('${images[currentImage]}')"></div>`
      );
    deleteFirstImgDelay = setTimeout(() => {
      document.querySelector(".slide").remove();
    }, 1000);
    if (currentImage + 1 >= images.length) {
      currentImage = 0;
    } else {
      currentImage += 1;
    }
  }
}
