import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ["form", "survey_id", "question"];

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
        new_question_item.value = new_question_id;
      },
      error: (err) => {},
    });
  }

  selected(e) {
    const id = this.survey_idTarget.dataset.id;
    const question_id = e.target.closest(".question").firstElementChild.value;
    const select = e.target.value;

    const data = new FormData();
    data.append("select", select);
    data.append("question_id", question_id);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/update_select`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }

  add_question(e) {
    const id = this.survey_idTarget.dataset.id;
    const question_id = e.target.closest(".question").firstElementChild.value;
    const question_value = e.target.value;

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

  checked(e) {
    const id = this.survey_idTarget.dataset.id;
    const question_id = e.target.closest(".question").firstElementChild.value;

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
    const question_id = e.target.closest(".question").firstElementChild.value;

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
    const question_id = e.target.closest(".question").firstElementChild.value;

    const data = new FormData();
    data.append("question_id", question_id);

    Rails.ajax({
      type: "post",
      url: `/surveys/${id}/add_answer_item`,
      data,
      success: (answer_id) => {
        // const question_count = this.questionTargets.length - 1;
        // const new_question_item = this.questionTargets[question_count];
        // new_question_item.value = question_id;
        // TODO del
        console.log(answer_id);
      },
      error: (err) => {},
    });
  }

  add_answer(e) {
    const id = this.survey_idTarget.dataset.id;
    const question_id = e.target.closest(".question").firstElementChild.value;
    const time = e.target.closest("section .question").firstElementChild.name;
    const timestamp = time.match(/\d/g).join("");
    const answer_id = e.target.closest("section").nextElementSibling.value;
    const answer_time = e.target.closest(".form-group").firstElementChild.name;
    const answer_timestamp = answer_time.match(/\d/g).join("").slice(1);
    const answer_value = e.target.value;

    const data = new FormData();
    if (question_id != "") {
      data.append("question_id", question_id);
      if (answer_id != undefined || "") {
        data.append("answer_id", answer_id);
      } else {
        data.append("answer_timestamp", answer_timestamp);
      }
    } else {
      data.append("timestamp", timestamp);
      if (answer_id != undefined || "") {
        data.append("answer_id", answer_id);
      } else {
        data.append("answer_timestamp", answer_timestamp);
      }
    }
    data.append("answer_value", answer_value);

    Rails.ajax({
      type: "post",
      url: `/surveys/${id}/add_answer`,
      data: data,
      success: (resp) => {},
      error: (err) => {},
    });
  }

  remove_answer(e) {
    e.preventDefault();
    let item = e.target.closest(".nested-fields");
    item.style.display = "none";

    const id = this.survey_idTarget.dataset.id;
    const question_id = e.target.closest(".question").firstElementChild.value;
    const time = e.target.closest("section .question").firstElementChild.name;
    const timestamp = time.match(/\d/g).join("");
    const answer_id = e.target.closest("section").nextElementSibling.value;
    const answer_time = e.target.closest(".form-group").firstElementChild.name;
    const answer_timestamp = answer_time.match(/\d/g).join("").slice(1);

    const data = new FormData();
    if (question_id != "") {
      data.append("question_id", question_id);
      if (answer_id != undefined || "") {
        data.append("answer_id", answer_id);
      } else {
        data.append("answer_timestamp", answer_timestamp);
      }
    } else {
      data.append("timestamp", timestamp);
      if (answer_id != undefined || "") {
        data.append("answer_id", answer_id);
      } else {
        data.append("answer_timestamp", answer_timestamp);
      }
    }

    Rails.ajax({
      type: "delete",
      url: `/surveys/${id}/remove_answer`,
      data: data,
      success: (resp) => {},
      error: (err) => {},
    });
  }

  submitForm() {
    this.formTarget.submit();
  }
}
