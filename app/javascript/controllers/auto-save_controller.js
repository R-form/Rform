import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["form", "button", "question_value"];

  connect() {}

  removeQuestion(e) {
    e.preventDefault();
    let item = e.target.closest(".nested-fields");
    item.querySelector("input[name*='_destroy']").value = true;
    item.style.display = "none";
  }

  submitForm() {
    this.formTarget.submit();
  }

  autoSaveToSurvey() {
    const id = this.element.children[2].dataset.id;

    if (id == null) {
      this.formTarget.submit();
    } else {
      this.formTarget.submit();
    }
  }
}
