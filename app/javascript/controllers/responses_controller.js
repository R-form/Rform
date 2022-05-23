import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["question", "submit"];

  connect() {
    this.questionTarget.classList.remove("hidden");
  }

  next(e) {
    e.preventDefault();
    // e_question = e.target.closest(".question_field");
    e.target.closest(".question_field").classList.add("hidden");

    e.target
      .closest(".question_field")
      .nextElementSibling.classList.remove("hidden");
  }
}
