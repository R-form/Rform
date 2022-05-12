import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ["form"];

  create_survey() {
    const id = this.element.children[2].dataset.id;
    if (id == null) {
      this.formTarget.submit();
    }
  }

  selected(e) {
    const id = this.element.children[2].dataset.id;
    const question_id = e.target.closest("section").firstElementChild.value;
    const time = e.target.closest("section").firstElementChild.name;
    const timestamp = time.match(/\d/g).join("");
    const select = e.target.value;

    const data = new FormData();
    if (question_id != "") {
      data.append("question_id", question_id);
    } else {
      data.append("timestamp", timestamp);
    }
    data.append("select", select);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/update_select`,
      data: data,
      success: (resp) => {},
      error: (err) => {},
    });
  }

  // TODO del
  // find_by_id(id, question_id, question_value) {
  //   const data = new FormData();
  //   data.append("question_id", question_id);
  //   data.append("question_value", question_value);
  //   this.debounce(Rails.ajax)({
  //     type: "post",
  //     url: `/surveys/${id}/add_question`,
  //     data: data,
  //     success: (resp) => {
  //       console.log(resp);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  add_question(e) {
    const id = this.element.children[2].dataset.id;
    const question_id = e.target.closest("section").firstElementChild.value;
    const time = e.target.closest("section").firstElementChild.name;
    const timestamp = time.match(/\d/g).join("");
    const question_value = e.target.value;
    // this.find_by_id(id, question_id, question_value);

    const data = new FormData();
    if (question_id != "") {
      data.append("question_id", question_id);
    } else {
      data.append("timestamp", timestamp);
    }
    data.append("question_value", question_value);

    Rails.ajax({
      type: "post",
      url: `/surveys/${id}/add_question`,
      data: data,
      success: (resp) => {},
      error: (err) => {},
    });
  }

  // TODO del
  // debounce(find_by_id, delay = 3000) {
  //   let timeoutID;
  //   return (...arg) => {
  //     clearTimeout(timeoutID);
  //     timeoutID = setTimeout(() => {
  //       find_by_id(...arg);
  //     }, delay);
  //   };
  // }

  remove_question(e) {
    e.preventDefault();
    let item = e.target.closest(".nested-fields");
    item.style.display = "none";

    const id = this.element.children[2].dataset.id;
    const question_id = e.target.closest("section").firstElementChild.value;
    const time = e.target.closest("section").firstElementChild.name;
    const timestamp = time.match(/\d/g).join("");

    const data = new FormData();
    if (question_id != "") {
      data.append("question_id", question_id);
    } else {
      data.append("timestamp", timestamp);
    }

    Rails.ajax({
      type: "delete",
      url: `/surveys/${id}/remove_question`,
      data: data,
      success: (resp) => {},
      error: (err) => {},
    });
  }

  add_answer(e) {
    const id = this.element.children[2].dataset.id;
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

    const id = this.element.children[2].dataset.id;
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
