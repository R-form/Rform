import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["question", "submit"];

  connect() {
    this.questionTarget.classList.remove("hidden");
  }

  next(e) {
    e.preventDefault();
    const question = e.target.closest(".question_field");
    question.classList.add("hidden");
    e.target
      .closest(".question_field")
      .nextElementSibling.classList.remove("hidden");
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
