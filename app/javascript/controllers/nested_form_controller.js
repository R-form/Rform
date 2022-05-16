import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ["add_item", "template","question", "question_copy"];
  static values = { index: String };

  duplicate_question(e) {
    e.preventDefault();
    
    setTimeout(() => {
      const content = e.target.closest("section").cloneNode(true);
      const q_last = e.target.closest("section").parentElement.querySelector('.question:last-of-type')
      const id = document.querySelector(".survey_id").dataset.id
      const question_id = e.target.closest(".question").firstElementChild.value;
      const time = e.target.closest("section .question").firstElementChild.name;
      const question_timestamp = time.match(/\d/g).join("");
      const text = content.querySelector('#question_title').value

      q_last.insertAdjacentHTML('afterend', content.outerHTML)
      
      const new_last = e.target.closest("section").parentElement.querySelector('.question:last-of-type')
      const answers = new_last.querySelectorAll("section")
  
      new_last.querySelector('#question_title').value = `${text} - 副本`
      new_last.setAttribute("data-nested-form-target","question_copy")
            
      const data = new FormData();
      data.append("question_id", question_id);
      data.append("question_timestamp", question_timestamp);

      Rails.ajax({
        type: "post",
        url: `/surveys/${id}/duplicate_question`,
        data: data,
        success: (resp) => {
          let new_question_id = resp[0].id
          let new_answers = resp[1]
          let new_answers_length = resp[1].length
          this.question_copyTarget.firstElementChild.value = `${new_question_id}`
          for (let i = 0; i < new_answers_length; i++) {
            answers[i].nextElementSibling.value = `${new_answers[i].id}`
          }
        },
        error: (err) => {
        },
      });

    }, 500)
    
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
