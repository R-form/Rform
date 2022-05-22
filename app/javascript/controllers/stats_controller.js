import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["show_responses", "show_responses_button"];

  connect() {
    function hide_and_show_target_item(targetItem){
      if (targetItem.className === "hidden"){
        targetItem.classList.remove("hidden")
      } else {
        targetItem.classList.add("hidden")
      }
    }

    this.show_responses_buttonTarget.addEventListener("click", (e)=>{
      hide_and_show_target_item(this.show_responsesTarget)
    })
  }
}