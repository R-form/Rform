import { Controller } from "stimulus"
import Rails from "@rails/ujs"
import Swal from "sweetalert2"
import "sweetalert2/src/sweetalert2.scss"

export default class extends Controller {
  static targets = ["survey_id"]

  open_alert(e) {
    e.preventDefault()

    const survey_id = this.survey_idTarget.dataset.id
    const question_id = e.target.closest(".question").dataset.question_id
    const answer_id = e.target.closest("#answer").firstElementChild.value

    const query = new URLSearchParams({ question_id, answer_id }).toString()
    Rails.ajax({
      type: "get",
      url: `/surveys/${survey_id}/questions_list?${query}`,
      success: ({ message, params }) => {
        let select_option = ""
        message.forEach((element) => {
          // filter
          const { title, id } = element
          if (id != question_id) {
            if (id == params) {
              select_option += `<option selected value='${id}'>${title}</option>`
            } else {
              select_option += `<option value='${id}'>${title}</option>`
            }
          }
        })

        Swal.fire({
          title: "<strong>請選擇要前往的題目</strong>",
          html: `<select
            id = 'select_for_skip_logic'
            data-question_id = '${question_id}'
            data-answer_id = '${answer_id}'
            data-survey_id = '${survey_id}'
            data-action='change->select-question#get_question'>
            <option>請選擇</option>${select_option}
          </select>`,
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: "儲存",
          cancelButtonText: '<span data-action="click->select-question#remove_question">取消</span>',
        })
      },
      error: () => {
        console.log("失敗")
      },
    })
  }
}
