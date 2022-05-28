import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["select", "choice", "addbtn", "image"];
  connect() {
    this.selected();
  }

  selected() {
    const status = this.element.dataset.status;

    switch (this.selectTarget.value) {
      case "單選題":
      case "多選題":
      case "滿意度":
      case "下拉選單":
        this.choiceTarget.classList.remove("hidden");
        if (status == "published" || status == "draft") {
          this.addbtnTarget.classList.remove("hidden");
        }
        break;
      default:
        this.choiceTarget.classList.add("hidden");
        this.addbtnTarget.classList.add("hidden");
        break;
    }
  }
}
