import { Controller } from "stimulus"
import Rails from "@rails/ujs"
import Swal from "sweetalert2"

export default class extends Controller {
  static targets = ["surveyId"]

  openAlert(e) {
    e.preventDefault()

    const survey_id = this.surveyIdTarget.dataset.id
    const question_id = e.target.closest(".question").dataset.question_id
    const answer_id = e.target.closest(".answer").firstElementChild.value

    const query = new URLSearchParams({ question_id, answer_id }).toString()
    Rails.ajax({
      type: "get",
      url: `/surveys/${survey_id}/questions_list?${query}`,
      success: ({ message, params }) => {
        let select_option = ""
        message.forEach((element) => {
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
          title: "<strong>請選擇您的操作</strong>",
          html:
            `使用者選擇此選項後，將會接續到以下題目：<br><br>` +
            `<select
            id = 'select_for_skip_logic'
            data-question_id = '${question_id}'
            data-answer_id = '${answer_id}'
            data-survey_id = '${survey_id}'
            data-action='change->select-question#getQuestion'>
            <option>請選擇</option>${select_option}
          </select>`,
          showDenyButton: true,
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: "儲存變更",
          denyButtonText: '<span data-action="click->select-question#removeQuestion">移除設定</span>',
          cancelButtonText: "取消操作",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("儲存成功!", "", "success")
          } else if (result.isDenied) {
            Swal.fire("您已移除跳題的設定。", "", "info")
          }
        })
      },
    })
  }
}
