import { Controller } from "stimulus"
// import Chart from "chart.js"

export default class extends Controller {
  static targets = ["showResponses", "showSingleResponse", "currentResponse", "canvasBar", "canvasPie", "canvasLine"];

  connect() {
    this.canvasBarTargets.forEach ((target)=>{
      target.closest(".canvasArea").classList.remove("hidden") //default display with bar chart
    })

    this.showSingleResponseTargets[0].classList.remove("hidden") //default show the first response
  }

  hideAndShow() {
    if (this.showResponsesTarget.className === "hidden"){
      this.showResponsesTarget.classList.remove("hidden")
    } else {
      this.showResponsesTarget.classList.add("hidden")
    }
  }

  chartTypeSelect(e) {
    const selectedChartType = e.target.value // get type from select
    const targetIndex = e.target.closest(".canvasContainer").id // check which container we got
    let currentCanvasTarget = this.canvas_barTarget // just a initial value

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

  nextPage() {
    let currentResponse = Number(this.currentResponseTarget.textContent)

    this.showSingleResponseTargets[currentResponse-1].classList.add("hidden")
    this.showSingleResponseTargets[currentResponse].classList.remove("hidden")
    this.currentResponseTarget.textContent = currentResponse + 1
  }

  previousPage() {
    let currentResponse = Number(this.currentResponseTarget.textContent)

    this.showSingleResponseTargets[currentResponse-1].classList.add("hidden")
    this.showSingleResponseTargets[currentResponse-2].classList.remove("hidden")
    this.currentResponseTarget.textContent = currentResponse - 1
  }
}