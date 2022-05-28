import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["showResponses", "canvasBar", "canvasPie", "canvasLine"];

  connect() {
    this.canvasBarTargets.forEach ((target)=>{
      target.closest(".canvasArea").classList.remove("hidden")//default display with bar chart
    }) 
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
}