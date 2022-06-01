import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ["form", "survey_id", "question", "answer", "select"];

  connect() {
    const status = this.survey_idTarget.dataset.status;
    const disabled_inputs = this.element.querySelectorAll("input");
    const disabled_buttons = this.element.querySelectorAll("a");
    const disabled_selects = this.selectTargets;
    const disabled_textareas = this.element.querySelectorAll("textarea");

    if (status == "closed") {
      disabled_inputs.forEach((input) => {
        input.setAttribute("disabled", "");
      });
      disabled_buttons.forEach((button) => {
        button.classList.add("hidden");
      });
      disabled_textareas.forEach((textarea) => {
        textarea.setAttribute("disabled", "");
      });
      disabled_selects.forEach((select) => {
        select.setAttribute("disabled", "");
      });
    }
  }

  creat_event(id){
   this.question_imageEvent = new CustomEvent("question_image", {
      detail: {
        id
      }
    })
  }



  add_survey_title(e) {
    const id = this.survey_idTarget.dataset.id;
    const survey_title = e.target.value;

    const data = new FormData();
    data.append("survey_title", survey_title);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/add_survey_title`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }

  add_survey_description(e) {
    const id = this.survey_idTarget.dataset.id;
    const survey_description = e.target.value;

    const data = new FormData();
    data.append("survey_description", survey_description);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/add_survey_description`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }

  add_question_item(e) {
    const id = this.survey_idTarget.dataset.id;

    Rails.ajax({
      type: "post",
      url: `/surveys/${id}/add_question_item`,

      success: ({ new_question_id }) => {
        const question_count = this.questionTargets.length - 1;

        const new_question_item = this.questionTargets[question_count];
        new_question_item.dataset.question_id = new_question_id;
      },
      error: (err) => {},
    });
  }

  selected(e) {
    const id = this.survey_idTarget.dataset.id;
    const question_id = e.target.closest(".question").dataset.question_id;
    const select = e.target.value;
    const select_value = e.target.querySelector("option[selected='selected']");
    select_value.removeAttribute("selected");

    const data = new FormData();
    data.append("select", select);
    data.append("question_id", question_id);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/update_select`,
      data,
      success: ({ message, params }) => {
        const new_select_value = e.target.querySelector(
          `option[value=${params.select}]`
        );
        new_select_value.setAttribute("selected", "selected");
      },
      error: (err) => {},
    });
  }

  add_question(e) {
    const id = this.survey_idTarget.dataset.id;
    const question_id = e.target.closest(".question").dataset.question_id;
    const question_value = e.target.value;
    e.target.setAttribute("value", question_value);

    const data = new FormData();
    data.append("question_id", question_id);
    data.append("question_value", question_value);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/add_question`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }

  add_question_description(e) {
    const id = this.survey_idTarget.dataset.id;
    const question_id = e.target.closest(".question").dataset.question_id;
    const question_description = e.target.value;
    e.target.innerHTML = question_description;

    const data = new FormData();
    data.append("question_id", question_id);
    data.append("question_description", question_description);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/add_question_description`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }

  checked(e) {
    const id = this.survey_idTarget.dataset.id;
    const question_id = e.target.closest(".question").dataset.question_id;

    const data = new FormData();
    data.append("question_id", question_id);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/save_checkbox`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }

  remove_question(e) {
    e.preventDefault();
    let item = e.target.closest(".question");
    item.style.display = "none";

    const id = this.survey_idTarget.dataset.id;
    const question_id = e.target.closest(".question").dataset.question_id;

    const data = new FormData();
    data.append("question_id", question_id);

    Rails.ajax({
      type: "delete",
      url: `/surveys/${id}/remove_question`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }

  add_answer_item(e) {
    const id = this.survey_idTarget.dataset.id;
    const question_id = e.target.closest(".question").dataset.question_id;

    const data = new FormData();
    data.append("question_id", question_id);

    Rails.ajax({
      type: "post",
      url: `/surveys/${id}/add_answer_item`,
      data,
      success: ({ new_answer_id }) => {
        const answer_count = this.answerTargets.length - 1;
        const new_answer_item = this.answerTargets[answer_count];
        new_answer_item.value = new_answer_id;
      },
      error: (err) => {},
    });
  }

  add_answer(e) {
    const id = this.survey_idTarget.dataset.id;
    const question_id = e.target.closest(".question").dataset.question_id;
    const answer_id = e.target.closest("#answer").firstElementChild.value;
    const answer_value = e.target.value;
    e.target.setAttribute("value", answer_value);
    const data = new FormData();
    data.append("question_id", question_id);
    data.append("answer_id", answer_id);
    data.append("answer_value", answer_value);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/add_answer`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }

  remove_answer(e) {
    e.preventDefault();
    let item = e.target.closest("#answer");
    item.style.display = "none";

    const id = this.survey_idTarget.dataset.id;
    const question_id = e.target.closest(".question").dataset.question_id;
    const answer_id = e.target.closest("#answer").firstElementChild.value;

    const data = new FormData();
    data.append("question_id", question_id);
    data.append("answer_id", answer_id);

    Rails.ajax({
      type: "delete",
      url: `/surveys/${id}/remove_answer`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }
  change_question_image(event) {
    console.log("點到");
    this.creat_event(event.target.dataset.id);
    document.dispatchEvent(this.question_imageEvent);
  }
}
