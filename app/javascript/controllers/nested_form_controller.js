import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["add_item", "template", "copy_item","question"];
  static values = { index: String };

  duplicate_question(event) {
    event.preventDefault();
    let content = event.target.closest("#question_fields")
    // let contentid = event.target.closest("#question_fields").nextElementSibling
    let change = content.querySelectorAll(".form-group")
    console.log(change);
    // console.log(contentid);

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
    let item = event.target.closest(".nested-fields");
    item.querySelector("input[name*='_destroy']").value = true;
    item.style.display = "none";
  }
}
