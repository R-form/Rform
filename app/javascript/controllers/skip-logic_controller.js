import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'
window.Swal = Swal;

export default class extends Controller {
  static targets = ['survey_id','question_title'];

  open_alert(e) {
    e.preventDefault()
    const id = this.survey_idTarget.dataset.id
    const question_id = e.target.closest(".question").dataset.question_id;
    
    const data = new FormData();
    Rails.ajax({
      type: "get", 
      url: `/surveys/${id}/questions_list`,
      data,
      success: ({ message }) => {
        let select_option  = "" 
        const questions = message
        const count = message.length;
        for (let i= 0 ; i < count ; i++){
          const question_title = message[i]["title"]
          const question_id_all = message[i]["id"]
          if(question_id_all != question_id)
          select_option = select_option +
            "<option>"+question_title+"</option>"
        }      
        Swal.fire({
          title: '<strong><u>請選擇要前往的題目</u></strong>',
          icon: 'info',
          html: 
          "<select data-action='change->skip-logic#skip_to_question_id'>" +
          "<option>打開下拉選單</option>"+
          select_option +
          "</select>"   ,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> 儲存',
          confirmButtonAriaLabel: 'Thumbs up, great!',
          cancelButtonText:
            '<span>取消</span>',
          cancelButtonAriaLabel: 'Thumbs down'
        })  
    },
      error: (error) => {
        console.log("失敗");
      },
    });

  }
  
  skip_to_question_id(){
    console.log(123);
    
    // const id = this.survey_idTarget.dataset.id
    // console.log(id);

    // const question_id = e.target.closest(".question").dataset.question_id;
    // console.log(question_id);

    // const answer_id = e.target.closest(".answer").firstElementChild.value;
    // console.log(answer_id);

    // const data = new FormData();
    // data.append("question_id", question_id);
    // data.append("answer_id", answer_id);

    // const skip_to_question_id = e.target.value
    // console.log(skip_to_question_id);

    // data.append("skip_to_question_id", skip_to_question_id);
    // Rails.ajax({
    //   type: "patch", 
    //   url: `/surveys/${id}/skip_to_question_id`,
    //   data,
    //   success: ({ message }) => {
    //     console.log(message);
    //   },
    //   error: (error) => {
    //     console.log("失敗");
    //   },
    //   });


  }



}

