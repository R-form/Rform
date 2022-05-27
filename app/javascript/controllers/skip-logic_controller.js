import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'
window.Swal = Swal;

export default class extends Controller {
  static targets = ['survey_id'];

  open_alert(e) {
    e.preventDefault()

    // 抓 id: survey/answer/question   
    const id = this.survey_idTarget.dataset.id
    console.log(id);

    const question_id = e.target.closest(".question").dataset.question_id;
    console.log(question_id);

    // const answer_id = e.target.closest(".answer").firstElementChild.value;
    // console.log(answer_id);
    
    const data = new FormData();
    // data.append("question_id", question_id);
    // data.append("answer_id", answer_id);
    
    Rails.ajax({
      type: "get", 
      url: `/surveys/${id}/questions_list`,
      data,
      success: ({ message }) => {
        let questions = message
        message.forEach((element,index)=>{
        let question_id = message[index]["id"]
        let question_title =  message[index]["title"]
        console.log(question_title);
        Swal.fire({
          title: '<strong>HTML <u>example</u></strong>',
          icon: 'info',
          html:
          "<select>"+
          "<option>請選擇要前往的題目</option>"+
          "<option>${question_title???}</option>"+
          "</select>",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Great!',
          confirmButtonAriaLabel: 'Thumbs up, great!',
          cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down'
        })
      })
      },
      error: (error) => {
        console.log("失敗");
      },
    });

  }
}

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
// });