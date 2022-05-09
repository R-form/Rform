import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ["form", "button", "question_value"];

  connect() {
    // console.log(this.question_valueTarget);
  }

  getFormData() {
    const form = new FormData(this.formTarget);

    const data = [];
    for (let pair of form.entries()) {
      if (pair[0] != "authenticity_token") {
        data.push([pair[0], pair[1]]);
        // TODO del
        // console.log(pair);
      }
    }

    return Object.fromEntries(data);
  }

  // removeQuestion() {
  //   // TODO del
  //   console.log(this.buttonTarget);
  // }

  autoSaveToSurvey(e) {
    const data = this.getFormData();

    // TODO del
    // console.log(data);

    const id = this.element.children[2].dataset.id;
    if (id == null) {
      this.formTarget.submit();
    } else {
      // if () {

      // }
      this.formTarget.submit();
    }
  }
}
