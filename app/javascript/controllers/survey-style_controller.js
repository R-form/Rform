import { Controller } from "stimulus"
import Rails from "@rails/ujs"
import Huebee from "huebee"
import "huebee/dist/huebee.min"

export default class extends Controller {
  static targets = ["surveyId", "form", "color", "backgroundColor", "responses", "question"]

  connect() {
    this.theme = new Huebee(this.colorTarget, {
      staticOpen: true,
      customColors: ["#8E354A", "#E62", "#EA0", "#6A4C9C", "#6C6", "#19F", "#2B5F75", "#7A7573"],
      shades: 0,
      hues: 4,
    })

    this.backgroundColor = new Huebee(this.backgroundColorTarget, {
      staticOpen: true,
      customColors: ["#DC9FB4", "#eca38f", "#ffc97b", "#B28FCE", "#bfe8c5", "#bfe2e8", "#6699A1", "#a4b5c4"],
      shades: 0,
      hues: 4,
    })
  }

  resetStyle(target, classes) {
    target.className = ""
    target.classList.add(...classes)
  }

  pickColor(e) {
    e.preventDefault()
    const { id } = this.surveyIdTarget.dataset

    const colorMap = {
      "#8E354A": "brightRed",
      "#E62": "brightOrange",
      "#EA0": "brightYellow",
      "#6A4C9C": "brightPurple",
      "#6C6": "brightGreen",
      "#19F": "brightBlue",
      "#2B5F75": "brightNavy",
      "#7A7573": "brightGray",
      "#6A4C9C": "brightPurple",
    }

    const theme = colorMap[this.colorTarget.value]
    const classList = [...this.surveyIdTarget.classList]

    const classArray = classList
      .filter((className) => !className.includes("border-"))
      .filter((className) => !className.includes("focus-within:outline-"))
    classArray.push(`border-${theme}`, `focus-within:outline-${theme}`)
    this.resetStyle(this.surveyIdTarget, classArray)

    this.questionTargets.forEach((question) => {
      const questionList = [...question.classList]
      const questionArray = questionList.filter((className) => !className.includes("focus-within:outline-"))
      questionArray.push(`focus-within:outline-${theme}`)
      this.resetStyle(question, questionArray)
    })

    const data = new FormData()
    data.append("theme", theme)

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/theme`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    })
  }

  pickBackgroundColor(e) {
    e.preventDefault()
    const { id } = this.surveyIdTarget.dataset

    const bgColorMap = {
      "#DC9FB4": "softRed",
      "#eca38f": "softOrange",
      "#ffc97b": "softYellow",
      "#B28FCE": "softPurple",
      "#bfe8c5": "softGreen",
      "#bfe2e8": "softBlue",
      "#6699A1": "softNavy",
      "#a4b5c4": "softGray",
      "#B28FCE": "softPurple",
    }
    const backgroundColor = bgColorMap[this.backgroundColorTarget.value]
    const classList = [...this.element.classList]

    const classArray = classList.filter((className) => !className.includes("bg-"))
    classArray.push(`bg-${backgroundColor}`)
    this.resetStyle(this.element, classArray)

    const data = new FormData()
    data.append("background_color", backgroundColor)

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/background_color`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    })
  }

  selectFont(e) {
    const { id } = this.surveyIdTarget.dataset
    const form = this.formTarget
    const fontStyle = e.target.value

    const data = new FormData()
    data.append("font_style", fontStyle)

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/font_style`,
      data,
      success: () => {
        form.setAttribute("class", fontStyle)
      },
      error: (err) => {},
    })
  }

  update_status(e) {
    const { id } = this.surveyIdTarget.dataset
    const status_value = e.target.value

    const data = new FormData()
    data.append("status_value", status_value)

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/update_status`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    })
  }

  update_opentime(e) {
    const { id } = this.surveyIdTarget.dataset
    const opentime = e.target.value
    const notice = e.target.closest("div")
    const previousNotice = e.target.previousElementSibling

    const data = new FormData()
    data.append("opentime", opentime)
    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/update_opentime`,
      data,
      success: ({ message }) => {
        if (previousNotice) {
          previousNotice.remove()
        }
        notice.insertAdjacentHTML("afterbegin", `<p style="color:red;font-size: smaller;">${message}</p>`)
      },
      error: (err) => {},
    })
  }

  update_closetime(e) {
    const { id } = this.surveyIdTarget.dataset
    const closetime = e.target.value
    const notice = e.target.closest("div")
    const previousNotice = e.target.previousElementSibling

    const data = new FormData()
    data.append("closetime", closetime)

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/update_closetime`,
      data,
      success: ({ message }) => {
        if (previousNotice) {
          previousNotice.remove()
        }
        notice.insertAdjacentHTML("afterbegin", `<p style="color:red;font-size: smaller;">${message}</p>`)
      },
      error: (err) => {},
    })
  }

  disconnect() {
    this.theme.remove()
    this.backgroundColor.remove()
  }
}
