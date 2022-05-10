import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["select", "choice"];

  connect() {
    this.selected();
  }
  selected() {
    switch (this.selectTarget.value) {
      case "single_choice":
      case "multiple_choice":
      case "satisfaction":
      case "drop_down_menu":
        this.choiceTarget.classList.remove("hidden");
        break;
      default:
        this.choiceTarget.classList.add("hidden");
      break;
    };
  }
}
