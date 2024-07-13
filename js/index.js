let mainContainer = document.querySelector('#main-container');
let mainRow = document.querySelector('#main-row');
let searchFields = document.querySelectorAll('.search-meal');
let loadingScreen = document.querySelector('.loading-screen');
let contactFields = document.querySelectorAll('.contact-field');

async function loadAPI(apiSrc) {
  loadingScreen.classList.replace('d-none', 'd-flex');
  let api = await fetch(apiSrc);
  let data = await api.json();
  return data;
}

async function displayMeals(apiSrc) {
  let data = await loadAPI(apiSrc);
  mainRow.innerHTML = ``;
  let container = ``;
  let items = ``;
  data['meals'].forEach(meal => {
    container += `
      <div class="col-md-3">
          <div class="item-card bg-danger position-relative rounded-2 overflow-hidden" id="${meal.idMeal}">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100">
            <div class="item-card-overlay w-100 h-100 position-absolute top-100 d-flex align-items-center px-2">
              <h2>${meal.strMeal}</h2>
            </div>
          </div>
        </div>
      `
  });
  mainRow.innerHTML = container;
  loadingScreen.classList.replace('d-flex', 'd-none');
  items = document.querySelectorAll('.item-card');
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      let mealId = e.currentTarget.id;
      displayMealDetails(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    });
  });
}

async function displayCategories(apiSrc) {
  let data = await loadAPI(apiSrc);
  mainRow.innerHTML = ``;
  let container = ``;
  let items = ``;
  data['categories'].forEach(category => {
    container += `
      <div class="col-md-3">
          <div class="item-card position-relative rounded-2 overflow-hidden">
            <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="w-100">
            <div class="item-card-overlay w-100 h-100 position-absolute top-100 text-center px-2">
              <h2>${category.strCategory}</h2>
              <p>${category.strCategoryDescription}</p>
            </div>
          </div>
        </div>
      `
  });
  mainRow.innerHTML = container;
  loadingScreen.classList.replace('d-flex', 'd-none');
  items = document.querySelectorAll('.item-card');
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      let category = e.currentTarget.querySelector('h2').textContent;
      displayMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    });
  });
}

async function displayAreas(apiSrc) {
  let data = await loadAPI(apiSrc);
  mainRow.innerHTML = ``;
  let container = ``;
  let items = ``;
  data['meals'].forEach(area => {
    container += `
      <div class="col-md-3">
          <div class="item-card text-white position-relative rounded-2 text-center">
              <i class="fa-solid fa-house-laptop fa-4x"></i>
              <h2>${area.strArea}</h2>
          </div>
        </div>
      `
  });
  mainRow.innerHTML = container;
  loadingScreen.classList.replace('d-flex', 'd-none');
  items = document.querySelectorAll('.item-card');
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      let area = e.currentTarget.querySelector('h2').textContent;
      displayMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    });
  });
}

async function displayIngredients(apiSrc) {
  let data = await loadAPI(apiSrc);
  mainRow.innerHTML = ``;
  let container = ``;
  let items = ``;
  for (let i = 0; i < 20; i++) {
    container += `
      <div class="col-md-3">
          <div class="item-card text-white position-relative rounded-2 text-center overflow-hidden">
              <i class="fa-solid fa-drumstick-bite fa-4x"></i>
              <h2>${data.meals[i].strIngredient}</h2>
              <p class="line-clamp-3">${data.meals[i].strDescription}</p>
          </div>
        </div>
      `
  }
  mainRow.innerHTML = container;
  loadingScreen.classList.replace('d-flex', 'd-none');
  items = document.querySelectorAll('.item-card');
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      let ingredient = e.currentTarget.querySelector('h2').textContent;
      displayMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    });
  });
}

async function displayMealDetails(apiSrc) {
  let data = await loadAPI(apiSrc);
  $('.search').addClass('d-none');
  mainRow.innerHTML = ``;
  let container = ``;
  let ingredientsList = [];
  console.log(data);
  container = `
            <div class="col-md-4">
            <div class="large-img-container">
              <img src="${data.meals[0].strMealThumb}" alt="" class="w-100 rounded">
            </div>
            <h2>${data.meals[0].strMeal}</h2>
          </div>
          <div class="col-md-8">
            <h2>Instructions</h2>
            <p>
            ${data.meals[0].strInstructions}
            </p>
              <h3 class="h2">
                Area : ${data.meals[0].strArea}
              </h3>
              <h3 class="h2">
                Category : ${data.meals[0].strCategory}
              </h3>
              <h3 class="h2">
                Recipes :
              </h3>
              <ul class="meal-ingredients list-unstyled d-flex flex-wrap gap-2">
                
              </ul>
              <h3 class="h2">
                Tags :
              </h3>
              <ul class="list-unstyled d-flex">
                <li class="bg-danger-subtle rounded px-3 py-2 text-black">
                  ${data.meals[0].strTags}
                </li>
              </ul>
              <a href="${data.meals[0].strSource}"><button class="btn btn-success">Source</button></a>
              <a target="_blank" href="${data.meals[0].strYoutube}"><button class="btn btn-danger">Youtube</button></a>
          </div>
  `;
  mainRow.innerHTML = container;
  loadingScreen.classList.replace('d-flex', 'd-none');
  for (let i in data.meals[0]) {
    // console.log(i + ' ' + data.meals[0][i]);
    // console.log(i.toString());
    if (i.toString().startsWith('strIngredient') && data.meals[0][i] != '' && data.meals[0][i] != null) {
      // console.log(i + " " + data.meals[0][i]);
      ingredientsList.push(data.meals[0][i]);
    }
  }
  console.log(ingredientsList);
  let ingredientsContainer = document.querySelector('.meal-ingredients');
  ingredientsList.forEach(element => {
    ingredientsContainer.innerHTML += `
    <li class="bg-info-subtle rounded px-3 py-2 text-black">
        ${element}
    </li>
    `
  });
}

searchFields[0].addEventListener('input', e => {
  displayMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value}`)
});

searchFields[1].addEventListener('input', e => {
  if (e.target.value != '')
    displayMeals(`https://www.themealdb.com/api/json/v1/1/search.php?f=${e.target.value}`);
});

displayMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);

let regex = {
  nameField: /^[a-zA-Z]+$/,
  emailField: /^[A-za-z0-9]+@[A-za-z]+\.(com|org|net)$/,
  phoneField: /^(010|011|012|015)[0-9]{8}$/,
  ageField: /^[0-9]{1,2}$/,
  passwordField: /^([1-9]|[a-z]|[A-Z]){8,}$/
};

function validateInput(element) {

  if (element.id == 'repassword') {
    if (element.value == document.querySelector('#passwordField').value) {
      element.nextElementSibling.classList.replace('d-block', 'd-none');
      return 1;
    } else {
      element.nextElementSibling.classList.replace('d-none', 'd-block');
      return 0;
    }
  } else {

    if (regex[element.id].test(element.value)) {
      element.nextElementSibling.classList.replace('d-block', 'd-none');
      return 1;
    } else {
      element.nextElementSibling.classList.replace('d-none', 'd-block');
      return 0;
    }

  }

}

function validateAllInputs() {
  let allValid = true;
  contactFields.forEach(contactField => {
    allValid *= validateInput(contactField);
  });
  if (allValid) {
    document.querySelector('.contact-submit').removeAttribute('disabled');
  } else {
    document.querySelector('.contact-submit').setAttribute('disabled', 'disabled');
  }
}

document.forms[0].addEventListener('submit', e => {
  e.preventDefault();
});

contactFields.forEach(contactField => {
  contactField.addEventListener('input', e => {
    validateInput(e.target);
    validateAllInputs();
  });
});




