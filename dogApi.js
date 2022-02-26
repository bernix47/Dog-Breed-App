const dogApi = async () => {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const jsonRes = await response.json(); //Returns message, success
  console.log(jsonRes.message);
  createBreedList(jsonRes.message); //gives
};

dogApi();

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
    <select style="text-transform:capitalize" onchange = "loadByBreed(this.value)">
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
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const jsonRes = await response.json();
    createSlideShow(jsonRes.message);
  }
}

function createSlideShow(images) {
    console.log(images);
  document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    `
}
