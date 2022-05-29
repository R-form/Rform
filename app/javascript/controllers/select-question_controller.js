import { Controller } from "stimulus";
import Rails from "@rails/ujs";


export default class extends Controller {
  static targets = ['survey_id'];

    get_question(e){
      const survey_id = this.survey_idTarget.dataset.id
      const question_id = e.target.dataset.question_id
      const answer_id = e.target.dataset.answer_id
      const skip_to_question_id = e.target.value

      const data = new FormData();
      data.append("question_id", question_id);
      data.append("answer_id", answer_id);
      data.append("skip_to_question_id", skip_to_question_id);
      
      Rails.ajax({
        type: "patch", 
        url: `/surveys/${survey_id}/skip_to_question_id`,
        data,
        success: () => {
          console.log("儲存成功");
        },
        error: () => {
          console.log("儲存失敗");
        },
        }); 

        // localStorage.setItem('selectedItem', skip_to_question_id);
        // let selectedItem = localStorage.getItem('selectedItem')
        // if (selectedItem) {
        //   console.log("保留選中值");
        //   this.select_formTarget.options[e.target.selectedIndex].setAttribute("selected", true)
        //   console.log(this.select_formTarget);
        // } 

        const cancel_button = this.element.querySelector(".swal2-cancel")
        cancel_button.addEventListener("click",(e)=>{
          if (e.target.nodeName === "BUTTON") { 
            data.append("question_id", question_id);
            data.append("answer_id", answer_id);
            data.append("skip_to_question_id", skip_to_question_id);
            
            Rails.ajax({
              type: "delete", 
              url: `/surveys/${survey_id}/remove_skip_to_question_id`,
              data,
              success: () => {
                console.log("移除成功");
              },
              error: () => {
                console.log("移除失敗");
              },
            }); 
          }       
        })
    } 

}
