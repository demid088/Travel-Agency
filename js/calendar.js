'use strict'
// ----------------------------------------PARAMS-----------------------------
// названия месяцев
const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]
// ----------------------------------------DATA-------------------------------
// полная текущая дата
const date = new Date()

// получаем блок с номерами дней
const monthDays = document.querySelector('.days')

// календарь
const calendar = document.getElementById('calendar')
const calendarId = calendar.id

// получаем input'ы, для которых нужно включить календарь
const inputs = document.querySelectorAll('input.user-calendar')

// кнопки
const prev = document.querySelector('#prev')
const next = document.querySelector('#next')
const arrowPrevYear = document.querySelector('#prev-year')
const arrowNextYear = document.querySelector('#next-year')
// ----------------------------------------FUNCTION---------------------------
// переключение месяца
function nextMonth() {
  date.setMonth(date.getMonth() + 1)
  render()
}
function prevMonth() {
  date.setMonth(date.getMonth() - 1)
  render()
}
// переключение года
function nextYear() {
  date.setFullYear(date.getFullYear() + 1)
  render()
}
function prevYear() {
  date.setFullYear(date.getFullYear() - 1)
  render()
}
// ----------------------------------------RENDER-----------------------------
function render() {
  // текущий год
  const year = date.getFullYear()

  // текущий месяц
  const month = date.getMonth()

  // последний день месяца
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  // последняя дата предыдущего месяца
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate()

  // последний день недели предыдущего месяца
  const lastDayIndexPrevMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDay()

  // последний день недели текущего месяца
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay()

  // кол-во дней следующего месяца
  const nextDays = 7 - lastDayIndex

  // устанавливаем месяц
  document.querySelector('.date h1').innerHTML = months[month]
  // устанавливаем год
  document.querySelector('.date p').innerHTML = year

  // обертка для элементов
  let fragment = new DocumentFragment()

  // дни предыдущего месяца
  for (let x = lastDayIndexPrevMonth; x > 0; x--) {
    let div = document.createElement('div')
    div.classList.add('prev-date')
    div.append(prevLastDay - x + 1)
    fragment.append(div)
  }

  // дни текущего месяца
  for (let i = 1; i <= lastDay; i++) {
    let div = document.createElement('div')
    // проверяем текущее число
    if (year === new Date().getFullYear()) {
      if (month === new Date().getMonth()) {
        if (i === new Date().getDate()) {
          div.classList.add('today')
        }
      }
    }
    div.classList.add('current-date')
    div.dataset.day = i
    div.append(i)
    fragment.append(div)
  }

  // дни следующего месяца
  if (nextDays < 7) {
    for (let j = 1; j <= nextDays; j++) {
      let div = document.createElement('div')
      div.classList.add('next-date')
      div.append(j)
      fragment.append(div)
    }
  }

  // очищаем календарь
  monthDays.innerHTML = ''
  // заполняем календарь
  monthDays.append(fragment)

  // ВЫБОР ДАТЫ
  // даты текущего месяца
  let currentDates = document.querySelectorAll('.current-date')

  for (const currentDate of currentDates) {
    currentDate.addEventListener('click', () => {
      let inputTarget = document.getElementById(calendar.dataset.call)
      let d = '',
        m = '',
        y = ''

      d = currentDate.dataset.day
      d = d.length < 2 ? '0' + d : d
      m = (date.getMonth() + 1).toString(10)
      m = m.length < 2 ? '0' + m : m
      y = date.getFullYear().toString(10)

      let result = d + '.' + m + '.' + y
      inputTarget.value = result
      // закрываем календарь
      calendar.classList.remove('js-displayBlock')
      calendar.dataset.call = ''
    })
  }

  // даты прошлого месяца
  let prevDates = document.querySelectorAll('.prev-date')

  for (const prevDate of prevDates) {
    prevDate.addEventListener('click', prevMonth)
  }

  // даты следующего месяца
  let nextDates = document.querySelectorAll('.next-date')

  for (const nextDate of nextDates) {
    nextDate.addEventListener('click', nextMonth)
  }
}
// ----------------------------------------INIT-------------------------------
// кнопки переключения МЕСЯЦА
prev.addEventListener('click', prevMonth)
next.addEventListener('click', nextMonth)

// кнопки переключения ГОДА
arrowPrevYear.addEventListener('click', prevYear)
arrowNextYear.addEventListener('click', nextYear)

// КАЛЕНДАРЬ
// показываем календарь при фокусе на input'е
for (const input of inputs) {
  const calendarWidth = parseInt(getComputedStyle(calendar).width, 10)
  const offsetTop = input.offsetTop + input.offsetHeight + 10
  const offsetLeft =
    input.offsetLeft + input.offsetWidth / 2 - calendarWidth / 2

  input.addEventListener('focus', () => {
    calendar.style.top = offsetTop + 'px'
    calendar.style.left = offsetLeft + 'px'
    calendar.dataset.call = input.id
    calendar.classList.add('js-displayBlock')
  })
}

// закрываем календарь при клике по пустому месту
document.addEventListener('mousedown', (ev) => {
  // создаем массив элементов
  const arrElemsTarget = []
  let currentElem = ev.target

  while (currentElem) {
    arrElemsTarget.push(currentElem)
    currentElem = currentElem.parentElement
  }

  if (arrElemsTarget.indexOf(window) === -1 && arrElemsTarget.indexOf(document) === -1)
    arrElemsTarget.push(document)
  if (arrElemsTarget.indexOf(window) === -1)
    arrElemsTarget.push(window)
  // если клик на календаре
  for (const elem of arrElemsTarget) {
    if (elem.id === calendarId) {
      return
    }
  }
  // закрываем календарь
  calendar.classList.remove('js-displayBlock')
  calendar.dataset.call = ''
})

// ОТРИСОВКА
render()