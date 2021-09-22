class NavigationMenu {

  constructor(elem) {
    this.elem = elem
    this.fixIcon()

    window.addEventListener('resize', this.adaptSmallScreen.bind(this))

    window.addEventListener('load', this.adaptSmallScreen.bind(this))

    elem.addEventListener('click', event => {

      if (!document.querySelector('.sidebar--active')
      && event.target.closest('form')) {

        let form = event.target.closest('form')
        form.classList.add('disable-transition')

        this.open()
        search.querySelector('.search__text').focus()

        form.classList.remove('disable-transition')
      }

      let target = event.target.closest('button')
      if (!target) return

      let action = target.dataset.status
      if (action) this[action]()
    })

    elem.addEventListener('pointerdown', e => {

      if (e.target.closest('li')) {
        let link = e.target.closest('li')
        let place = link.getBoundingClientRect()
        let top = e.clientY
        let left = e.clientX
        let shiftX = place.left
        let shiftY = place.top
        let bubble = document.createElement('span')

        bubble.className = 'bubble'
        bubble.style.top = top - shiftY + 'px'
        bubble.style.left = left - shiftX + 'px'

        e.target.closest('li').append(bubble)
      }

      let submit = elem.querySelector('.search__confirm')

      if (!e.target.closest('button')
      && (e.target != submit)
      && (e.target.tagName != 'A')) return

      e.preventDefault()
    })

    document.addEventListener('pointerup', this.removeBubble.bind(this))
  }

  open() {
    this.elem.classList.add('sidebar--active')
    button.dataset.status = 'close'

    let main = document.querySelector('main')
    main.style.left = barWidthStandart + 'px'

    search.classList.toggle('disable-hover')
    this.toggleSearch()
  }

  close() {
    this.elem.classList.remove('sidebar--active')
    button.dataset.status = 'open'

    let main = document.querySelector('main')
    main.style.left = barWidthShort + 'px'

    search.classList.toggle('disable-hover')
    this.toggleSearch()
  }

  toggleSearch() {
    search.querySelectorAll('input').forEach(input => {

      if (input.getAttribute('type') == 'submit') {
        input.hidden = !input.hidden
      }

    })
  }

  fixIcon() {
    let icon = this.elem.querySelector('.icon--outOfFlow')

    icon.style.left = barWidthShort / 2 - icon.offsetWidth / 2 + 'px'
  }

  adaptSmallScreen() {
    let smallIcons = this.elem.querySelectorAll('.icon--small')
    let index = 0

    if (this.checkHeight(410)) {
      smallIcons.forEach(icon => {
        icon.classList.add(`icon--${index++}`)
      })
    } else {
      smallIcons.forEach(icon => {
        icon.classList.remove(`icon--${index++}`)

      })
    }
  }

  removeBubble() {
    if (!this.elem.querySelector('.bubble')) return
      this.elem.querySelector('.bubble').remove()
  }

  checkHeight(point) {
    return document.documentElement.clientHeight <= point
  }
}

let barWidthShort = 65
let barWidthStandart = 180

let button = document.querySelector('.burger--btn')
let sidebar = document.querySelector('.sidebar')
let menu = new NavigationMenu(sidebar)
let search = document.querySelector('.sidebar--search')