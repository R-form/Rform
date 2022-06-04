import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["question", "previousQuestion", "nextQuestion", "submit", "surveyTitle"]

  connect() {
    this.surveyTitleTarget.classList.remove("hidden")
    this.questionTarget.classList.remove("hidden")
    // this.nextQuestionTargets.forEach((target) => {
    //   target.setAttribute("disabled", "")
    // })

    this.nextQuestionTargets[this.nextQuestionTargets.length - 1].classList.add("hidden")
    this.previousQuestionTarget.classList.add("hidden")
    this.skipToQuestionId = ""
    this.skipFromQuestionId = []
    this.questionTargets.forEach((target, index) => {
      if (target.dataset.required == "true") {
        this.nextQuestionTargets[index].setAttribute("disabled", "")
      }
    })
  }

  checked(e) {
    if (e.target.checked) {
      this.skipToQuestionId = e.target.dataset.skipToQuestionId
      const nextQuestionButton = e.target.closest(".question_field").lastElementChild
      nextQuestionButton.removeAttribute("disabled")
    }
  }

  required(e) {
    // TODO del
    console.log(e.target.textContent)
  }

  next(e) {
    e.preventDefault()
    const question = e.target.closest(".question_field")
    const question_id = question.dataset.question_id

    question.classList.add("hidden")
    this.skipFromQuestionId.push(question_id)

    const nextQuestion = question.nextElementSibling
    const skip_question = this.element.querySelector(`div [data-question_id='${this.skipToQuestionId}']`)
    const final_question_id = this.questionTargets[this.questionTargets.length - 1].dataset.question_id

    if (this.skipToQuestionId && this.skipToQuestionId != 0 && this.skipToQuestionId != question_id) {
      skip_question.classList.remove("hidden")
      if (this.skipToQuestionId == final_question_id) {
        this.submitTarget.classList.remove("hidden")
      }
    } else {
      nextQuestion.classList.remove("hidden")
      if (nextQuestion.dataset.question_id == final_question_id) {
        this.submitTarget.classList.remove("hidden")
      }
    }
    this.skipToQuestionId = ""
    this.surveyTitleTarget.classList.add("hidden")
  }

  previous(e) {
    e.preventDefault()
    this.submitTarget.classList.add("hidden")
    const question_count = this.skipFromQuestionId.length
    const previous_question_id = this.skipFromQuestionId[Number(question_count) - 1]

    const question = e.target.closest(".question_field")
    question.classList.add("hidden")
    const skip_from_question = this.element.querySelector(`div [data-question_id='${previous_question_id}']`)
    skip_from_question.classList.remove("hidden")
    if (previous_question_id == this.skipFromQuestionId[0]) {
      this.surveyTitleTarget.classList.remove("hidden")
    }
    this.skipFromQuestionId.splice(-1)
  }
}
