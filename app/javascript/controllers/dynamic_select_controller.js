import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["select", "choice", "addbtn", "image"];
  connect() {
    this.selected();
  }

  selected() {
    const status = this.element.dataset.status;
    if (status == "published" || "draft") {
      switch (this.selectTarget.value) {
        case "單選題":
        case "多選題":
        case "線性問題":
        case "下拉選單":
          this.choiceTarget.classList.remove("hidden");
          this.addbtnTarget.classList.remove("hidden");
          break;
        default:
          this.choiceTarget.classList.add("hidden");
          this.addbtnTarget.classList.add("hidden");
          break;
      }
    }
  }
}
