import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["form_post"];
  post(e) {
    e.preventDefault();
    this.form_postTarget.submit()
  }
}
