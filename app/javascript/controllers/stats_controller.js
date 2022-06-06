import { Controller } from "stimulus"
import Swal from "sweetalert2"

export default class extends Controller {
  static targets = ["showResponses",
                    "showSingleResponse", 
                    "currentResponse", 
                    "responsesCount", 
                    "showQuestions",
                    "showSingleQuestion",
                    "questionsCount",
                    "currentQuestion",
                    "showCharts",
                    "previousPageButton", 
                    "nextPageButton", 
                    "canvasBar", 
                    "canvasPie", 
                    "canvasLine"];
  connect() {
    this.canvasBarTargets.forEach ((target)=>{
      //default display with bar chart
      target.closest(".canvasArea").classList.remove("hidden")
    })
    //default show the first response
    this.showSingleResponseTargets[0].classList.remove("hidden")
    this.showSingleQuestionTargets[0].classList.remove("hidden")
  }

  hideAndShow(e) {
    const selectedTargetId = e.target.id
    let showCurrentTarget = [
      this.showChartsTarget,
      this.showQuestionsTarget,
      this.showResponsesTarget,
    ].forEach((target)=>{
      target.classList.add("hidden")
    })

    showCurrentTarget = this[`${selectedTargetId.slice(0, selectedTargetId.length-3)}Target`]
    showCurrentTarget.classList.remove("hidden")
  }

  chartTypeSelect(e) {
    const selectedChartType = e.target.value
    const targetIndex = e.target.closest(".canvas-container").id
    let currentCanvasTarget = [
      this.canvasBarTargets[targetIndex],
      this.canvasPieTargets[targetIndex],
      this.canvasLineTargets[targetIndex],
    ].forEach((target)=>{
      target.closest(".canvasArea").classList.add("hidden")
    })

    currentCanvasTarget = this[`canvas${selectedChartType[0].toUpperCase()+selectedChartType.slice(1)}Targets`][targetIndex]
    
    if (currentCanvasTarget.getAttribute("data-chart-type-value") === selectedChartType) {
      currentCanvasTarget.closest(".canvasArea").classList.remove("hidden") // only show the type we selected
    }
  }

  nextPage(target, targetCount, showTargets, currentTarget, targetIndex) {
    let currentResponse = Number(target.textContent)
    const responsesCount = Number(targetCount.textContent)

    this.previousPageButtonTargets[targetIndex].classList.remove("hidden")

    if (currentResponse < responsesCount) {
      showTargets[currentResponse-1].classList.add("hidden")
      showTargets[currentResponse].classList.remove("hidden")
      target.textContent = ++currentResponse
      if (currentResponse == responsesCount) {
        currentTarget.classList.add("hidden")
      }
    }
  }

  previousPage(target, showTargets, currentTarget, targetIndex) {
    let currentResponse = Number(target.textContent)

    this.nextPageButtonTargets[targetIndex].classList.remove("hidden")

    if (currentResponse > 1) {
      showTargets[currentResponse-1].classList.add("hidden")
      showTargets[currentResponse-2].classList.remove("hidden")
      target.textContent = --currentResponse
      if (currentResponse == 1) {
        currentTarget.classList.add("hidden")
      }
    }
  }

  jumpToPage(target, targetCount, showTargets, currentTarget, targetIndex) {
    let currentResponse = Number(target.textContent)
    const responsesCount = Number(targetCount.textContent)
    const jumpToPageNumber = Number(currentTarget.value)

    this.previousPageButtonTargets[targetIndex].classList.remove("hidden")
    this.nextPageButtonTargets[targetIndex].classList.remove("hidden")

    if (jumpToPageNumber > 0 && jumpToPageNumber <= responsesCount) {
      showTargets[currentResponse-1].classList.add("hidden")
      showTargets[jumpToPageNumber-1].classList.remove("hidden")
      target.textContent = jumpToPageNumber
    } else {
      Swal.fire("沒有這頁喔")
    }
    if (target.textContent == 1) {
      this.previousPageButtonTargets[targetIndex].classList.add("hidden")
    }
    if (target.textContent == responsesCount) {
      this.nextPageButtonTargets[targetIndex].classList.add("hidden")
    }
  }

  nextResponse(e) {
    this.nextPage(this.currentResponseTarget, this.responsesCountTarget, this.showSingleResponseTargets, e.target, this.showResponsesTarget.id)
  }

  previousResponse(e) {
    this.previousPage(this.currentResponseTarget, this.showSingleResponseTargets, e.target, this.showResponsesTarget.id)
  }

  jumpToResponse(e) {
    this.jumpToPage(this.currentResponseTarget, this.responsesCountTarget, this.showSingleResponseTargets, e.target, this.showResponsesTarget.id)
  }

  nextQuestion(e) {
    this.nextPage(this.currentQuestionTarget, this.questionsCountTarget, this.showSingleQuestionTargets, e.target, this.showQuestionsTarget.id)
  }

  previousQuestion(e) {
    this.previousPage(this.currentQuestionTarget, this.showSingleQuestionTargets, e.target, this.showQuestionsTarget.id)
  }

  jumpToQuestion(e) {
    this.jumpToPage(this.currentQuestionTarget, this.questionsCountTarget, this.showSingleQuestionTargets, e.target, this.showQuestionsTarget.id)
  }
}