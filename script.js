let personArray = []

function createTableApp(container, table, key) {
    const appForm = createAddFormAndButton()
    const appTable = createTable()

    container.append(appForm)
    table.append(appTable)

    drawStudendFromLocalStorage()
    addSortingListeners()
}

//Функция, создающая форму для добавления студентов и кнопку
function createAddFormAndButton() {
    const container = document.createElement('container')
    const formWrapper = document.createElement('form')
    const wrapper = document.createElement('form')
    const divName = document.createElement('div')
    const divDate = document.createElement('div')
    const divYear = document.createElement('div')
    const divFaculty = document.createElement('div')

    divName.textContent = 'ФИО'
    divDate.textContent = 'Дата рождения'
    divYear.textContent = 'Дата поступления'
    divFaculty.textContent = 'Факультет'

    wrapper.classList.add('input-group', 'head')
    divName.classList.add('form-control')
    divDate.classList.add('form-control')
    divYear.classList.add('form-control')
    divFaculty.classList.add('form-control')

    const form = document.createElement('form')
    const inputFullName = document.createElement('input')
    const inputDate = document.createElement('input')
    const inputYearOfStudy = document.createElement('input')
    const inputFaculty = document.createElement('input')
    const button = document.createElement('button')

    inputDate.type = 'date'
    inputDate.min = '1900-01-01'
    inputDate.max = '2022-06-14'

    inputYearOfStudy.type = 'number'
    inputYearOfStudy.min = '2000'
    inputYearOfStudy.max = '2022'

    formWrapper.classList.add('input-group')
    form.classList.add('input-group', 'form')
    inputFullName.classList.add('form-control')
    inputDate.classList.add('form-control')
    inputYearOfStudy.classList.add('form-control')
    inputFaculty.classList.add('form-control')
    button.classList.add('btn', 'btn-primary')
    container.classList.add('container')

    inputFullName.placeholder = 'Иванов Иван Иванович'
    inputFaculty.placeholder = 'Юридический'
    button.innerText = 'Добавить студента'
    inputYearOfStudy.placeholder = '2018'

    form.append(inputFullName, inputDate, inputYearOfStudy, inputFaculty)
    wrapper.append(divName, divDate, divYear, divFaculty)

    formWrapper.append(wrapper, form)
    container.append(formWrapper, button)

    focusInput(inputFullName, inputDate, inputYearOfStudy, inputFaculty, button)
    blockButton(button, inputFullName, inputDate, inputYearOfStudy, inputFaculty)


    button.addEventListener('click', function() {
        createObjPerson(inputFullName, inputDate, inputYearOfStudy, inputFaculty)
        clearingInput(inputFullName, inputDate, inputYearOfStudy, inputFaculty)
        blockButton(button, inputFullName, inputDate, inputYearOfStudy, inputFaculty)

    });
    return container
}

// Создание таблицы
function createTable() {
    const tableOfStudent = document.createElement('table')
    tableOfStudent.classList.add('table')

    const thead = document.createElement('thead')
    thead.id = 'tableHead'
    const tbody = document.createElement('tbody')
    tbody.id = 'tableBody'

    const name = document.createElement('th')
    const date = document.createElement('th')
    const year = document.createElement('th')
    const faculty = document.createElement('th')
    const empty = document.createElement('th')
    empty.classList.add('btn-wrapper')


    name.textContent = 'ФИО'
    date.textContent = 'Дата рождения'
    year.textContent = 'Дата поступления'
    faculty.textContent = 'Факультет'

    thead.append(name, date, year, faculty, empty)

    tableOfStudent.append(thead)
    tableOfStudent.append(tbody)

    return tableOfStudent
}

// Функция добавляющая студента в таблицу
function addStudent(inputFullName, inputDate, inputYearOfStudy, inputFaculty, id) {
    const table = document.getElementsByClassName('table')[0]
    const tr = document.createElement('tr')
    const name = document.createElement('td')
    const date = document.createElement('td')
    const year = document.createElement('td')
    const faculty = document.createElement('td')
    const wrapperButtonDelete = document.createElement('td')

    tr.classList.add('tr')

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Удалить'
    deleteBtn.classList.add('btn', 'btn-primary', 'mb', 'btn-danger')

    wrapperButtonDelete.classList.add('btn-wrapper')

    name.textContent = inputFullName
    date.textContent = inputDate
    year.textContent = inputYearOfStudy
    faculty.textContent = inputFaculty

    wrapperButtonDelete.append(deleteBtn)
    tr.append(name, date, year, faculty, wrapperButtonDelete)

    let body = document.getElementById('tableBody')
    body.append(tr)
    table.append(body)

    tr.id = id

    deleteTodoItem(tr, deleteBtn)
}

function sortTableByColumn(tableBody, column, ascending = true) {
    const tableHead = document.getElementById('tableHead')
    const dirModifier = ascending ? 1 : -1;
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    const sortedRows = rows.sort((a, b) => {

        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent;
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent;

        return aColText > bColText ? (dirModifier) : (dirModifier * -1);
    });

    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild)
    };

    tableBody.append(...sortedRows);

    tableHead.querySelectorAll('th').forEach(th => th.classList.remove('ascending-th', 'descending-th'));
    tableHead.querySelector(`th:nth-child(${column + 1})`).classList.toggle('ascending-th', ascending);
    tableHead.querySelector(`th:nth-child(${column + 1})`).classList.toggle('descending-th', !ascending);
};

function addSortingListeners() {
    const tableBody = document.getElementById('tableBody')

    document.querySelectorAll('.table th').forEach(header => {

        header.addEventListener('click', () => {
            const headerIndex = Array.prototype.indexOf.call(header.parentElement.children, header);
            const currentlyAscending = header.classList.contains('ascending-th');
            sortTableByColumn(tableBody, headerIndex, !currentlyAscending);
        })
    })
};


function deleteTodoItem(form, btn) {
    btn.addEventListener('click', () => {
        // Получаем существующий объект из Local storage
        personArray = JSON.parse(localStorage.getItem(key))
            // Нажимая на кнопку удалить мы должны искать этот объект по id  и удалять его из Local storage
        const neaList = personArray.filter(obj => obj.id != form.id)
        localStorage.setItem(key, JSON.stringify(neaList))
        form.remove()
    })
}



// Функция создающая объект в Local storage
function createObjPerson(inputFullName, inputDate, inputYearOfStudy, inputFaculty) {
    let person = {
        name: inputFullName.value,
        date: inputDate.value,
        year: inputYearOfStudy.value,
        faculty: inputFaculty.value,
    }
    const randomId = Math.floor(Math.random() * 7575.75)
    person.id = randomId

    personArray.push(person)

    localStorage.setItem(key, JSON.stringify(personArray))
    addStudent(inputFullName.value, inputDate.value, inputYearOfStudy.value, inputFaculty.value, person.id)
}

// Функция отрисовывающая Local storage
function drawStudendFromLocalStorage() {
    if (localStorage.getItem(key)) {
        personArray = JSON.parse(localStorage.getItem(key))
        for (const obj of personArray) {
            let name = obj.name
            let date = obj.date
            let year = obj.year
            let faculty = obj.faculty
            let id = obj.id
            addStudent(name, date, year, faculty, id)
        }
    }
}

// Блокировка кнопки
function blockButton(button, inputFullName, inputDate, inputYearOfStudy, inputFaculty) {
    button.disabled = !inputFullName.value.length
    button.disabled = !inputDate.value.length
    button.disabled = !inputYearOfStudy.value.length
    button.disabled = !inputFaculty.value.length

    inputFullName, inputDate, inputYearOfStudy, inputFaculty.addEventListener('input', () => {
        button.disabled = !inputFullName.value.length
        if ((inputDate.value < inputDate.min) || (inputDate.value > inputDate.max)) {
            alert(`Дата рождения не может быть меньше ${inputDate.min} и больше ${inputDate.max}`)

        } else button.disabled = !inputDate.value.length
        button.disabled = !inputYearOfStudy.value.length
        button.disabled = !inputFaculty.value.length

    })
}

// Переведение фокуса при вводе в input
function focusInput(inputFullName, inputDate, inputYearOfStudy, inputFaculty, button) {
    inputFullName.addEventListener('keydown', function(e) {
        if (e.code === "Enter") {
            inputDate.focus()
        }
    })
    inputDate.addEventListener('keydown', function(e) {
        if (e.code === "Enter") {
            if ((inputDate.value < inputDate.min) || (inputDate.value > inputDate.max)) {
                alert(`Дата рождения не может быть меньше ${inputDate.min} и больше ${inputDate.max}`)
            } else inputYearOfStudy.focus()
        }
    })
    inputYearOfStudy.addEventListener('keydown', function(e) {
        if (e.code === "Enter") {
            if ((inputYearOfStudy.value < inputYearOfStudy.min) || (inputYearOfStudy.value > inputYearOfStudy.max)) {
                alert(`Дата поступления в университет не может быть меньше ${inputYearOfStudy.min} и больше ${inputYearOfStudy.max}`)
            } else inputFaculty.focus()
        }
    })
    inputFaculty.addEventListener('keydown', function(e) {
        if (e.code === "Enter") {
            button.focus()
        }
    })
    button.addEventListener('click', function(e) {
        inputFullName.focus()
    })
}

// Функция очищающая поле для ввода
function clearingInput(inputFullName, inputDate, inputYearOfStudy, inputFaculty) {
    inputFullName.value = ''
    inputDate.value = ''
    inputYearOfStudy.value = ''
    inputFaculty.value = ''
}