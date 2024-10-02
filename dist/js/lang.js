const select = document.querySelector('select'),
    allLang = ['en', 'ua', 'nl'];


select.addEventListener('change', changeURLLanguage);

// Redirect to url with desired language
function changeURLLanguage() {
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

function changeLanguage() {
    let hash = window.location.hash;
    hash = hash.slice(1);
    if (!allLang.includes(hash)) {  //Повернутися до англійської версії, якщо неправильна URL-адреса
        location.href = window.location.pathname + '#en';
        location.reload();
    }
    select.value = hash;
    // document.querySelector('title').innerHTML = langArr['fav-title'][hash]; //Lang of title page
    // document.querySelector('.lng-first-slide-m').innerHTML = langArr['first-slide-m'][hash];  //Сhanging one line at a time
    for (let key in langArr) {
        let elem = document.querySelector('.lng-' + key);
        if (elem) {
            elem.innerHTML = langArr[key][hash];
        }
    }
    
    for (let key in langArr) {
        let doc = document.querySelector('.doc-' + key),
            form = document.querySelector('.form-' + key)
        if(doc) {
            // doc.setAttribute('href', 'policy.html')
            // doc.setAttribute([key], [hash]);
            doc.href = langArr[key][hash];
        }
        if(form) {
            form.placeholder = langArr[key][hash];
        }
    }
}

changeLanguage();




// // Language Switcher CSS

// const dropdowns = document.querySelectorAll('.navigation__dropdown'),
//     list = document.querySelectorAll('.ua');

// dropdowns.forEach(dropdown => {
//     const select = dropdown.querySelector('.select'),
//         caret = dropdown.querySelector('.caret'),
//         menu = dropdown.querySelector('.menu'),
//         options = dropdown.querySelectorAll('.menu li'),
//         selected = dropdown.querySelector('.selected');

//     select.addEventListener('click', () => {
//         select.classList.toggle('select-clicked');
//         caret.classList.toggle('caret-rotate');
//         menu.classList.toggle('menu-open');
//     });

//     options.forEach(option => {
//         option.addEventListener('click', () => {
//             selected.innerText = option.innerText;
//             selected.classList.add('text-fade-in');
//                 setTimeout(() => {
//                 selected.classList.remove('text-fade-in');
//                 }, 300);
//             select.classList.remove('select-clicked');
//             caret.classList.remove('caret-rotate');
//             menu.classList.remove('menu-open');
//             options.forEach(option => {
//                 option.classList.remove('active');
//             });
//             option.classList.add('active');
//         });
//     });

//     window.addEventListener('click', e => {
//         const size = dropdown.getBoundingClientRect();

//         if (
//             e.clientX < size.left ||
//             e.clientX > size.right ||
//             e.clientY < size.top ||
//             e.clientY > size.bottom
//         ) {
//             select.classList.remove('select-clicked');
//             caret.classList.remove('caret-rotate');
//             menu.classList.remove('menu-open');
//         }
//     });
// });

// // console.log(Object.getPrototypeOf(list));


// let element = document.querySelector(".ua");
// let elementStyle = getComputedStyle(element, "::before")
// console.log(elementStyle.background);