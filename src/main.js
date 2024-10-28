'use strict'

const display = document.getElementById('display')
const emptyMsg = document.getElementById('empty-msg')

function getStorage() {
  return JSON.parse(localStorage.getItem('storage') || '[]')
}

function addToStorage(text) {
  return localStorage.setItem(
    'storage',
    JSON.stringify([text, ...getStorage()]),
  )
}

function removeToStorage(text) {
  const data = getStorage().filter((el) => el !== text)
  localStorage.setItem('storage', JSON.stringify(data))
  return data
}

function reminder(text) {
  const div = document.createElement('div')
  div.classList.add('reminder')

  const label = document.createElement('label')

  const input = document.createElement('input')
  input.classList.add('remove')
  input.type = 'radio'
  input.onchange = () => {
    const updatedData = removeToStorage(text)

    if (updatedData.length === 0) {
      emptyMsg.style.opacity = 1
    }

    setTimeout(() => {
      div.classList.add('out')
    }, 150)

    setTimeout(() => {
      div.remove()
    }, 600)
  }

  const span = document.createElement('span')
  span.classList.add('custom-input')

  const divtext = document.createElement('div')
  divtext.classList.add('text')
  divtext.textContent = text

  label.appendChild(input)
  label.appendChild(span)
  div.appendChild(label)
  div.appendChild(divtext)

  return div
}

function main(e) {
  e.preventDefault()
  const formData = new FormData(e.target)
  e.target.reset()

  const text = formData.get('reminder')

  const component = reminder(text)
  display.prepend(component)

  addToStorage(text)

  emptyMsg.style.opacity = 0
}

function bootstrap() {
  const storage = getStorage()

  if (storage.length === 0) {
    emptyMsg.style.opacity = 1
    return
  }

  for (let i = 0; i < storage.length; i++) {
    const component = reminder(storage[i], i)
    display.appendChild(component)
  }
}
bootstrap()
