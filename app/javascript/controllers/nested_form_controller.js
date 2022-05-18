import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ["add_item", "template", "question", "question_copy"];
  static values = { index: String };

  duplicate_question(e) {
    e.preventDefault();
    setTimeout(() => {
      const content = e.target.closest(".question").cloneNode(true);
      const question = e.target.closest(".question");
      const id = e.target.closest(".question").dataset.id;
      const question_id = e.target.closest(".question").firstElementChild.value;
      const text = content.querySelector(".question_input").value;
      question.insertAdjacentHTML("afterend", content.outerHTML);

      const new_last = e.target.closest(".question").nextElementSibling;
      const answers = question.querySelectorAll(".answer");
      const new_answers_item = new_last.querySelectorAll(
        ".answer input[placeholder='Answer']"
      );

      new_last.querySelector(".question_input").value = `${text} - 副本`;
      new_last.setAttribute("data-nested-form-target", "question_copy");

      const data = new FormData();
      data.append("question_id", question_id);

      Rails.ajax({
        type: "post",
        url: `/surveys/${id}/duplicate_question`,
        data,
        success: ({ answers }) => {
          let new_answers_length = answers.length;
          for (let i = 0; i < new_answers_length; i++) {
            new_answers_item[i].value = answers[i].title;
          }
        },
        error: (err) => {},
      });
    }, 500);
  }

  add_association(event) {
    event.preventDefault();
    let content = this.templateTarget.innerHTML.replace(
      new RegExp(this.indexValue, "g"),
      new Date().getTime()
    );
    this.add_itemTarget.insertAdjacentHTML("beforebegin", content);
  }

  remove_association(event) {
    event.preventDefault();
    let item = event.target.closest(".fields");
    item.querySelector("input[name*='_destroy']").value = true;
    item.style.display = "none";
  }
}
