import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["question", "submit"];
  connect() {
    this.questionTarget.classList.remove("hidden");
  }

  next(e) {
    e.preventDefault();
    // TODO del
    console.log(e.target);
    e.target.closest(".question_field").classList.add("hidden");
    e.target
      .closest(".question_field")
      .nextElementSibling.classList.remove("hidden");
  }

  last(e) {
    e.preventDefault();
    if (
      e.target.closest(".question_field").previousElementSibling.nodeName ==
      "DIV"
    ) {
      e.target.closest(".question_field").classList.add("hidden");
      e.target
        .closest(".question_field")
        .previousElementSibling.classList.remove("hidden");
    }
  }
}
