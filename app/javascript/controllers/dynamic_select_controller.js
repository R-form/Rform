import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["select", "choice", "long"];

  connect() {
    this.selected();
  }

  selected() {
    this.hideFields();
    switch (this.selectTarget.value) {
      case "single_choice":
        this.choiceTarget.classList.remove("hidden");
        break;
      case "multiple_choice":
        this.choiceTarget.classList.remove("hidden");
        break;
      case "satisfaction":
        this.choiceTarget.classList.remove("hidden");
        break;
      case "drop_down_menu":
        this.choiceTarget.classList.remove("hidden");
        break;
      case "satisfaction":
        this.choiceTarget.classList.remove("hidden");
        break;
      case "drop_down_menu":
        this.choiceTarget.classList.remove("hidden");
        break;
      case "image":
        this.imageTarget.classList.remove("hidden");
        break;
    }
  }

  hideFields() {
    this.choiceTarget.classList.add("hidden");
  }
}
