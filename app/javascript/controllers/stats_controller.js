import { Controller } from "stimulus"
// import Chart from "chart.js"

export default class extends Controller {
  static targets = ["showResponses", "showSingleResponse", "currentResponse", "responsesCount", "previousPageButton", "nextPageButton", "canvasBar", "canvasPie", "canvasLine"];
  connect() {
    this.canvasBarTargets.forEach ((target)=>{
      target.closest(".canvasArea").classList.remove("hidden") //default display with bar chart
    })

    this.showSingleResponseTargets[0].classList.remove("hidden") //default show the first response
  }

  hideAndShow(e) {
    if (this.showResponsesTarget.className === "hidden"){
      this.showResponsesTarget.classList.remove("hidden")
      e.target.textContent = "隱藏所有回應"
    } else {
      this.showResponsesTarget.classList.add("hidden")
      e.target.textContent = "顯示所有回應"
    }
  }

  chartTypeSelect(e) {
    const selectedChartType = e.target.value // get type from select
    const targetIndex = e.target.closest(".canvasContainer").id // check which container we got
    let currentCanvasTarget = this.canvasBarTarget // just a initial value

    // clear all charts first
    this.canvasBarTargets[targetIndex].closest(".canvasArea").classList.add("hidden")
    this.canvasPieTargets[targetIndex].closest(".canvasArea").classList.add("hidden")
    this.canvasLineTargets[targetIndex].closest(".canvasArea").classList.add("hidden")

    switch (selectedChartType) {
      case 'pie':
        currentCanvasTarget = this.canvasPieTargets[targetIndex]
        break
      case 'line':
        currentCanvasTarget = this.canvasLineTargets[targetIndex]
        break
      case 'bar':
      default:
        currentCanvasTarget = this.canvasBarTargets[targetIndex]
        break
    }

    if (currentCanvasTarget.getAttribute("data-chart-type-value")===selectedChartType) {
      currentCanvasTarget.closest(".canvasArea").classList.remove("hidden") // only show the type we selected
    }
  }

  nextPage(e) {
    let currentResponse = Number(this.currentResponseTarget.textContent)
    let responsesCount = Number(this.responsesCountTarget.textContent)

    if (currentResponse >= 1) {
      this.previousPageButtonTarget.classList.remove("hidden")
    }
    if (currentResponse < responsesCount) {
      this.showSingleResponseTargets[currentResponse-1].classList.add("hidden")
      this.showSingleResponseTargets[currentResponse].classList.remove("hidden")
      this.currentResponseTarget.textContent = ++currentResponse
      if (currentResponse == responsesCount) {
        e.target.classList.add("hidden")
      }
    }
  }

  previousPage(e) {
    let currentResponse = Number(this.currentResponseTarget.textContent)
    let responsesCount = Number(this.responsesCountTarget.textContent)

    if (currentResponse <= responsesCount) {
      this.nextPageButtonTarget.classList.remove("hidden")
    }
    if (currentResponse > 1) {
      this.showSingleResponseTargets[currentResponse-1].classList.add("hidden")
      this.showSingleResponseTargets[currentResponse-2].classList.remove("hidden")
      this.currentResponseTarget.textContent = --currentResponse
      if (currentResponse == 1) {
        e.target.classList.add("hidden")
      }
    }
  }

  jumpToPage(e) {
    let jumpToPageNumber = e.target.value
    let currentResponse = Number(this.currentResponseTarget.textContent)
    let responsesCount = Number(this.responsesCountTarget.textContent)

    if (jumpToPageNumber > 0 && jumpToPageNumber <= responsesCount) {
      this.showSingleResponseTargets[currentResponse-1].classList.add("hidden")
      this.showSingleResponseTargets[jumpToPageNumber-1].classList.remove("hidden")
      this.currentResponseTarget.textContent = jumpToPageNumber
    } else {
      alert("沒有這頁喔")
    }
  }
}