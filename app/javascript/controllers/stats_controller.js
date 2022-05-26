import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["show_responses"];

  hideAndShow() {
    if (this.show_responsesTarget.className === "hidden"){
      this.show_responsesTarget.classList.remove("hidden")
    } else {
      this.show_responsesTarget.classList.add("hidden")
    }
  }
}