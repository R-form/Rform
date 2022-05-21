import { Controller } from "stimulus"
import Choice from "choices.js"
import "choices.js/public/assets/styles/choices"

export default class extends Controller {
  connect() {
    new Choice(this.element, {
      allowHTML: true,
      duplicateItemsAllowed: false,
      paste: false,
      editItems: true,
      removeItemButton: true,
    })
  }
} 