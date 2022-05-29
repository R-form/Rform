import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["form_post"];
  connect(){
    console.log("觸發");
  }
  post(e) {
    e.preventDefault();
    console.log("觸發");
    this.form_postTarget.submit()
  }
}
