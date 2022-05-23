import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["show_responses", "show_responses_button"];

  connect() {
    this.show_responses_buttonTarget.addEventListener("click", () => {
        if (this.show_responsesTarget.className === "hidden"){
            this.show_responsesTarget.classList.remove("hidden")
          } else {
            this.show_responsesTarget.classList.add("hidden")
          }
    })
  }
}