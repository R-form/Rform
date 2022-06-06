import { Controller } from "stimulus"

export default class extends Controller {
  static values = { isOpen: Boolean }

  showNavbar(e) {
    e.preventDefault()
    this.isOpenValue = !this.isOpenValue
    const slideover = document.querySelector(".slideover")

    if (this.isOpenValue) {
      slideover.classList.remove("invisible")
    } else {
      slideover.classList.add("invisible")
    }
  }
}
