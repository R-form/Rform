import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["question", "survey_title"];
  connect() {
    this.questionTarget.classList.remove("hidden");
    this.survey_titleTarget.classList.remove("hidden");
  }

  next(e) {
    e.preventDefault();
    this.survey_titleTarget.classList.add("hidden");
    const question = e.target.closest(".question_field");
    question.classList.add("hidden");
    question.nextElementSibling.classList.remove("hidden");
  }

  last(e) {
    e.preventDefault();
    const question = e.target.closest(".question_field");
    if (question.previousElementSibling.nodeName == "DIV") {
      question.classList.add("hidden");
      question.previousElementSibling.classList.remove("hidden");
    }
  }
}
