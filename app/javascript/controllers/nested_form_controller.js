import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ["add_item", "template", "question", "question_copy","add_answer","change_bg"];
  static values = { index: String };

  duplicate_question(e) {
    e.preventDefault();
    const question = e.target.closest(".question");
    question.setAttribute("data-nested-form-target", "question_copy");

    if (this.question_copyTarget) {
      const id = question.dataset.id;
      const question_id = question.dataset.question_id;
      question.insertAdjacentHTML("afterend", question.outerHTML);
      const new_question = question.nextElementSibling;
      const new_question_answers = new_question.querySelectorAll(
        ".answer input[placeholder='Answer']"
      );

      const new_question_title = new_question.querySelector(".question_input");
      new_question_title.value = `${new_question_title.value} - 副本`;

      const data = new FormData();
      data.append("question_id", question_id);
      Rails.ajax({
        type: "post",
        url: `/surveys/${id}/duplicate_question`,
        data,
        success: ({ copy_question, question_description, answers }) => {
          new_question.dataset.question_id = copy_question.id;
          for (let i = 0; i < new_question_answers.length; i++) {
            new_question_answers[i].value = answers[i].title;
          }
          new_question.querySelector(".forminput").value = question_description;
        },
        error: (err) => {},
      });
    }
    question.removeAttribute("data-nested-form-target", "question_copy");
  }

  add_association(event) {
    event.preventDefault();
    let content = this.templateTarget.innerHTML.replace(
      new RegExp(this.indexValue, "g"),
      new Date().getTime()
    );
    this.add_itemTarget.insertAdjacentHTML("beforebegin", content);
    this.add_itemTarget.previousElementSibling.querySelector('.q_title').focus()
  }

  add_answer(event) {
    event.preventDefault();
    let content = this.templateTarget.innerHTML
    this.add_itemTarget.insertAdjacentHTML("beforeend", content);
  }


  remove_association(event) {
    event.preventDefault();
    let item = event.target.closest(".group");
    item.querySelector("input[name*='_destroy']").value = true;
    item.style.display = "none";
  }

  change_background(event) {
    console.log(this.change_bgTarget);
    this.change_bgTarget.submit();
    event.value = "";
  }
}
