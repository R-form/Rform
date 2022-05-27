import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["show_responses", "canvas_bar", "canvas_pie", "canvas_line"];

  connect() {
    this.canvas_barTarget.forEach ((target)=>{
      target.closest(".canvas_area").classList.remove("hidden")//default display with bar chart
    }) 
  }

  hideAndShow() {
    if (this.show_responsesTarget.className === "hidden"){
      this.show_responsesTarget.classList.remove("hidden")
    } else {
      this.show_responsesTarget.classList.add("hidden")
    }
  }

  chartTypeSelect(e) {
    const selectedChartType = e.target.value // get type from select
    const targetIndex = e.target.closest(".canvas_container").id // check which container we got
    let currentCanvasTarget = this.canvas_barTarget // just a initial value

    // clear all charts first
    this.canvas_barTargets[targetIndex].closest(".canvas_area").classList.add("hidden")
    this.canvas_pieTargets[targetIndex].closest(".canvas_area").classList.add("hidden")
    this.canvas_lineTargets[targetIndex].closest(".canvas_area").classList.add("hidden")
      
    switch (selectedChartType) {
      case 'pie':
        currentCanvasTarget = this.canvas_pieTargets[targetIndex]
        break
      case 'line':
        currentCanvasTarget = this.canvas_lineTargets[targetIndex]
        break
      case 'bar':
      default:
        currentCanvasTarget = this.canvas_barTargets[targetIndex]
        break
    }
      
    if (currentCanvasTarget.getAttribute("data-chart-type-value")===selectedChartType) {
      currentCanvasTarget.closest(".canvas_area").classList.remove("hidden") // only show the type we selected
    }
  }
}