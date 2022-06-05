import { Controller } from "stimulus"
import Rails from "@rails/ujs"
import Swal from "sweetalert2"

export default class extends Controller {
  static targets = ["surveyId", "question", "answer", "select"]

  setDisabled(allTargets) {
    allTargets.forEach((target) => {
      target.setAttribute("disabled", "")
    })
  }

  get surveyId() {
    return this.surveyIdTarget.dataset.id
  }

  connect() {
    const { status } = this.surveyIdTarget.dataset
    const disabledInputs = this.element.querySelectorAll("input")
    const disabledButtons = this.element.querySelectorAll("a")
    const disabledSelects = this.selectTargets
    const disabledTextareas = this.element.querySelectorAll("textarea")

    if (status == "closed") {
      this.setDisabled(disabledInputs)
      this.setDisabled(disabledTextareas)
      this.setDisabled(disabledSelects)

      disabledButtons.forEach((button) => {
        button.classList.add("hidden")
      })
    }
  }

  create_event(id) {
    this.question_imageEvent = new CustomEvent("question_image", {
      detail: {
        id,
      },
    })
  }

  add_survey_title(e) {
    const surveyTitle = e.target.value

    const data = new FormData()
    data.append("survey_title", surveyTitle)

    Rails.ajax({
      type: "patch",
      url: `/surveys/${this.surveyId}/add_survey_title`,
      data,
    })
  }

  add_survey_description(e) {
    const surveyDescription = e.target.value

    const data = new FormData()
    data.append("survey_description", surveyDescription)

    Rails.ajax({
      type: "patch",
      url: `/surveys/${this.surveyId}/add_survey_description`,
      data,
    })
  }

  add_question_item() {
    Rails.ajax({
      type: "post",
      url: `/surveys/${this.surveyId}/add_question_item`,

      success: ({ new_question_id: newQuestionId }) => {
        const questionCount = this.questionTargets.length - 1

        const newQuestionItem = this.questionTargets[questionCount]
        newQuestionItem.dataset.question_id = newQuestionId
      },
    })
  }

  selected(e) {
    const { question_id } = e.target.closest(".question").dataset
    const select = e.target.value
    const selectValue = e.target.querySelector("option[selected='selected']")
    selectValue.removeAttribute("selected")

    const data = new FormData()
    data.append("select", select)
    data.append("question_id", question_id)

    Rails.ajax({
      type: "patch",
      url: `/surveys/${this.surveyId}/update_select`,
      data,
      success: ({ params }) => {
        const selectedOption = e.target.querySelector(`option[value=${params.select}]`)
        selectedOption.setAttribute("selected", "selected")
      },
    })
  }

  add_question(e) {
    const { question_id } = e.target.closest(".question").dataset

    const questionValue = e.target.value
    e.target.setAttribute("value", questionValue)

    const data = new FormData()
    data.append("question_id", question_id)
    data.append("question_value", questionValue)

    Rails.ajax({
      type: "patch",
      url: `/surveys/${this.surveyId}/add_question`,
      data,
    })
  }

  add_question_description(e) {
    const { question_id } = e.target.closest(".question").dataset
    const questionDescription = e.target.value
    e.target.innerHTML = questionDescription

    const data = new FormData()
    data.append("question_id", question_id)
    data.append("question_description", questionDescription)

    Rails.ajax({
      type: "patch",
      url: `/surveys/${this.surveyId}/add_question_description`,
      data,
    })
  }

  checked(e) {
    const { question_id } = e.target.closest(".question").dataset

    const data = new FormData()
    data.append("question_id", question_id)

    Rails.ajax({
      type: "patch",
      url: `/surveys/${this.surveyId}/save_checkbox`,
      data,
    })
  }

  remove_question(e) {
    e.preventDefault()
    let item = e.target.closest(".question")
    const { question_id } = e.target.closest(".question").dataset

    Swal.fire({
      title: "請確認是否刪除此問題",
      text: "刪除後的「問題選項」將無法復原",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "確定",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(456)
        item.style.display = "none"

        const data = new FormData()
        data.append("question_id", question_id)

        Rails.ajax({
          type: "delete",
          url: `/surveys/${this.surveyId}/remove_question`,
          data,
        })
        Swal.fire("問題選項已刪除!", "", "success")
      }
    })
  }

  add_answer_item(e) {
    const { question_id } = e.target.closest(".question").dataset

    const data = new FormData()
    data.append("question_id", question_id)

    Rails.ajax({
      type: "post",
      url: `/surveys/${this.surveyId}/add_answer_item`,
      data,
      success: ({ new_answer_id: newAnswerId }) => {
        const answerCount = this.answerTargets.length - 1
        const newAnswerItem = this.answerTargets[answerCount]
        newAnswerItem.value = newAnswerId
      },
    })
  }

  add_answer(e) {
    const { question_id } = e.target.closest(".question").dataset
    const answerId = e.target.closest(".answer").firstElementChild.value
    const answerValue = e.target.value
    e.target.setAttribute("value", answerValue)

    const data = new FormData()
    data.append("question_id", question_id)
    data.append("answer_id", answerId)
    data.append("answer_value", answerValue)

    Rails.ajax({
      type: "patch",
      url: `/surveys/${this.surveyId}/add_answer`,
      data,
    })
  }

  remove_answer(e) {
    e.preventDefault()
    let item = e.target.closest(".answer")
    const { question_id } = e.target.closest(".question").dataset
    const answerId = e.target.closest(".answer").firstElementChild.value

    Swal.fire({
      title: "請確認是否刪除此答案",
      text: "刪除後的「答案選項」將無法復原",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "確定",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        item.style.display = "none"

        const data = new FormData()
        data.append("question_id", question_id)
        data.append("answer_id", answerId)

        Rails.ajax({
          type: "delete",
          url: `/surveys/${this.surveyId}/remove_answer`,
          data,
        })
        Swal.fire("答案選項已刪除!", "", "success")
      }
    })
  }
  change_question_image(event) {
    this.create_event(event.target.dataset.id)
    document.dispatchEvent(this.question_imageEvent)
  }
}
