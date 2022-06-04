import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["select", "choice", "addbtn", "image"]
  connect() {
    this.selected()
  }

  selected() {
    const { status } = this.element.dataset

    this.choiceTarget.classList.add("hidden")
    this.addbtnTarget.classList.add("hidden")

    const quesitonTypes = ["單選題", "多選題", "滿意度", "下拉選單"]
    if (quesitonTypes.includes(this.selectTarget.value)) {
      this.choiceTarget.classList.remove("hidden")
      if (status == "published" || status == "draft") {
        this.addbtnTarget.classList.remove("hidden")
      }
    }
  }
}
