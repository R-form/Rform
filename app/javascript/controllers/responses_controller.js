import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["question", "submit", "survey_title"];
  connect() {
    this.questionTarget.classList.remove("hidden");
    this.survey_titleTarget.classList.remove("hidden");
  }

  next(e) {
    e.preventDefault();

    this.survey_titleTarget.classList.add("hidden");
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
    } else {
      this.survey_titleTarget.classList.remove("hidden");
    }
  }
}
