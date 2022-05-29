import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'

export default class extends Controller {
  static targets = ['survey_id'];

  open_alert(e) {
    e.preventDefault()
    const survey_id = this.survey_idTarget.dataset.id
    const question_id = e.target.closest(".question").dataset.question_id;
    const answer_id = e.target.closest("#answer").firstElementChild.value;
  
    Rails.ajax({
      type: "get", 
      url: `/surveys/${survey_id}/questions_list`,
      success: ({ message }) => {
        let select_option  = "" 
        message.forEach((element)=>{
          const { title, id } = element;
          if(id != question_id){
          select_option +=`<option value='${id}'>${title}</option>`
          }
        })      
        Swal.fire({
          title: '<strong>請選擇要前往的題目</strong>',
          html: 
          `<select
            data-question_id = '${question_id}'
            data-answer_id = '${answer_id}'
            data-action='change->select-question#get_question'>
            <option>請選擇</option>${select_option}
          </select>`,
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText:'<i class="fa fa-thumbs-up"></i> save',
          cancelButtonText: '移除',
        }) 
    },
      error: () => {
        console.log("失敗");
      },
    });

  }

}

 