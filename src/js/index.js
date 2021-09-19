class NavigationMenu {

  constructor(elem) {
    this.elem = elem
    elem.addEventListener('click', event => {
      let target = event.target.closest('button')
      if (!target) return

      let action = target.dataset.status
      if (action) this[action]()
    })

    elem.addEventListener('pointerdown', e => {
      let submit = elem.querySelector('.search__confirm')

      if (!e.target.closest('button')
        && (e.target != submit)
        && (e.target.tagName != 'A')) return

      e.preventDefault()
    })
  }

  open() {
    this.elem.classList.add('sidebar--active')
    button.dataset.status = 'close'

    let main = document.querySelector('main')
    main.style.left = barWidthStandart + 'px'

    search.classList.toggle('disable-hover')
  }

  close() {
    this.elem.classList.remove('sidebar--active')
    button.dataset.status = 'open'

    let main = document.querySelector('main')
    main.style.left = barWidthShort + 'px'

    search.classList.toggle('disable-hover')
  }
}

let barWidthShort = 65
let barWidthStandart = 180

let button = document.querySelector('.burger--btn')
let sidebar = document.querySelector('.sidebar')
let menu = new NavigationMenu(sidebar)
let search = document.querySelector('.sidebar--search')