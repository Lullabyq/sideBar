class NavigationMenu {

  constructor(elem) {
    this.elem = elem
    this.burger = this.elem.querySelector('.burger--btn')
    this.search = this.elem.querySelector('.sidebar--search')
    this.widthShort = 65
    this.widthStandart = 180
    this.classes = this.elem.classList

    this.fixIcon()
    this.close()

    window.addEventListener('resize', this.adaptSmallScreen.bind(this))

    window.addEventListener('load', this.adaptSmallScreen.bind(this))

    elem.addEventListener('click', event => {

      if (!document.querySelector('.sidebar--active')
      && event.target.closest('form')) {

        let form = event.target.closest('form')
        form.classList.add('disable-transition')

        this.open()
        this.search.querySelector('.search__text').focus()

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

        let hyperLink = link.querySelector('A').getAttribute('href')
        window.location = hyperLink
      }

      let submit = elem.querySelector('.search__confirm')

      if (!e.target.closest('button')
      && (e.target != submit)
      && (e.target.tagName != 'A')) return

      e.preventDefault()
  })

    document.addEventListener('touchstart', evt => {
      let touch = evt.touches[0]
      this.swipeStart = touch.clientX
    })

    elem.addEventListener('touchend', evt => {
      let tap = evt.changedTouches[0]
      this.swipeEnd = tap.clientX

      let swipe = this.processSwipe()

      if (swipe.isLong && swipe.isProper) this[swipe.action]()
    })

    document.addEventListener('pointerup', this.removeBubble.bind(this))
  }

  open() {
    this.classes.add('sidebar--active')
    this.burger.dataset.status = 'close'
    this.adjustMain()

    if (this.classes.contains('jsSmallScreen')) {
      this.classes.remove('sidebar--folded')
    }

    this.search.classList.toggle('disable-hover')
    this.toggleSearch()

    this.tabOptimize()
    this.stopScroll()
  }

  close() {
    this.classes.remove('sidebar--active')
    this.burger.dataset.status = 'open'
    this.adjustMain()

    if (this.classes.contains('jsSmallScreen')) {
      this.classes.add('sidebar--folded')
    }

    this.search.classList.toggle('disable-hover')
    this.toggleSearch()

    this.tabOptimize()
    this.stopScroll()
  }

  toggleSearch() {
    this.search.querySelectorAll('input').forEach(input => {

      if (input.getAttribute('type') == 'submit') {
        input.hidden = !input.hidden
      }

    })
  }

  fixIcon() {
    let icon = this.elem.querySelector('.icon--outOfFlow')

    icon.style.left = this.widthShort / 2 - icon.offsetWidth / 2 + 'px'
  }

  adaptSmallScreen() {
    let smallIcons = this.elem.querySelectorAll('.icon--small')
    let index = 0

    if (this.checkSize('height', 410)) {
      smallIcons.forEach(icon => {
        icon.classList.add(`icon--${index++}`)
      })
    } else {
      smallIcons.forEach(icon => {
        icon.classList.remove(`icon--${index++}`)

      })
    }

    if (this.checkSize('width', 690)) {
      this.classes.add('jsSmallScreen')
      this.adjustMain()
      if (!this.classes.contains('sidebar--active')) {
        this.classes.add('sidebar--folded')
      }
    } else {
      this.classes.remove('jsSmallScreen')
      this.classes.remove('sidebar--folded')
      this.adjustMain()
    }

    this.stopScroll()
  }

  removeBubble() {
    if (!this.elem.querySelector('.bubble')) return
      this.elem.querySelector('.bubble').remove()
  }

  checkSize(axis, point) {
    switch (axis) {
      case 'width':
        return document.documentElement.clientWidth <= point
      case 'height':
        return document.documentElement.clientHeight <= point
    }
  }

  adjustMain() {
    let main = document.querySelector('main')

    if (this.classes.contains('jsSmallScreen')) {
      main.style.left = 0 + 'px'
    } else if (this.classes.contains('sidebar--active')) {
      main.style.left = this.widthStandart + 'px'
    } else {
      main.style.left = this.widthShort + 'px'
    }
  }

  tabOptimize() {
    let loupe = this.elem.querySelector('.icon--outOfFlow')

    if (!this.classes.contains('sidebar--active')) {
      loupe.setAttribute('tabindex', '2')
    } else {
      loupe.removeAttribute('tabindex')
    }
  }

  stopScroll() {
    let html = document.documentElement

    if (this.classes.contains('jsSmallScreen')
    && this.classes.contains('sidebar--active')) {
      html.classList.add('stop__scroll')
    } else if (html.classList.contains('stop__scroll')) {
      html.classList.remove('stop__scroll')
    }
  }

  processSwipe() {
    let swipeInfo = {}

    swipeInfo.length = this.swipeEnd - this.swipeStart

    swipeInfo.action = this.classes.contains('sidebar--active') ? 'close' : 'open'

    if ((swipeInfo.length < 0 && swipeInfo.action == 'close')
    || (swipeInfo.length > 0 && swipeInfo.action == 'open')) {
      swipeInfo.isProper = true
    } else {
      swipeInfo.isProper = false
    }

    swipeInfo.isLong = Math.abs(swipeInfo.length) > 80

    return swipeInfo
  }

}

let sidebar = document.querySelector('.sidebar')
let menu = new NavigationMenu(sidebar)