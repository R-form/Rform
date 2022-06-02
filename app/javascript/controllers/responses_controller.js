import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["question", "previous_question", "next_question", "submit", "survey_title"]

  connect() {
    this.survey_titleTarget.classList.remove("hidden")
    this.questionTarget.classList.remove("hidden")
    this.next_questionTargets[this.next_questionTargets.length - 1].classList.add("hidden")
    this.previous_questionTarget.classList.add("hidden")
    this.skip_to_question_id = ""
    this.skip_from_question_id = []
  }

  checked(e) {
    if (e.target.checked) {
      this.skip_to_question_id = e.target.dataset.skipToQuestionId
    }
  }

  next(e) {
    e.preventDefault()
    const question = e.target.closest(".question_field")
    const question_id = question.dataset.question_id

    question.classList.add("hidden")
    this.skip_from_question_id.push(question_id)

    const next_question = question.nextElementSibling
    const skip_question = this.element.querySelector(`div [data-question_id='${this.skip_to_question_id}']`)
    const final_question_id = this.questionTargets[this.questionTargets.length - 1].dataset.question_id

    if (this.skip_to_question_id && this.skip_to_question_id != 0 && this.skip_to_question_id != question_id) {
      skip_question.classList.remove("hidden")
      if (this.skip_to_question_id == final_question_id) {
        this.submitTarget.classList.remove("hidden")
      }
    } else {
      next_question.classList.remove("hidden")
      if (next_question.dataset.question_id == final_question_id) {
        this.submitTarget.classList.remove("hidden")
      }
    }
    this.skip_to_question_id = ""
    this.survey_titleTarget.classList.add("hidden")
  }

  previous(e) {
    e.preventDefault()
    this.submitTarget.classList.add("hidden")
    const question_count = this.skip_from_question_id.length
    const previous_question_id = this.skip_from_question_id[Number(question_count) - 1]

    const question = e.target.closest(".question_field")
    question.classList.add("hidden")
    const skip_from_question = this.element.querySelector(`div [data-question_id='${previous_question_id}']`)
    skip_from_question.classList.remove("hidden")
    if (previous_question_id == this.skip_from_question_id[0]) {
      this.survey_titleTarget.classList.remove("hidden")
    }
    this.skip_from_question_id.splice(-1)
  }
}
