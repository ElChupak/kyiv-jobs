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
    if (!allLang.includes(hash)) { 
        location.href = window.location.pathname + '#en';
        location.reload();
    }
    select.value = hash;

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
            doc.href = langArr[key][hash];
        }
        if(form) {
            form.placeholder = langArr[key][hash];
        }
    }
}

changeLanguage();
