import { Controller } from "stimulus"

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
      target.closest(".canvasArea").classList.remove("hidden") //default display with bar chart
    })

    this.showSingleResponseTargets[0].classList.remove("hidden") //default show the first response
    this.showSingleQuestionTargets[0].classList.remove("hidden")
  }

  hideAndShow(e) {
    this.showChartsTarget.classList.add("hidden") //clear all first
    this.showQuestionsTarget.classList.add("hidden")
    this.showResponsesTarget.classList.add("hidden")

    switch (e.target.id) {
      case "showResponsesBtn":
        console.log("showResponsesBtn")
        this.showResponsesTarget.classList.remove("hidden")
        break
      case "showQuestionsBtn":
        console.log("showQuestionsBtn")
        this.showQuestionsTarget.classList.remove("hidden")
        break
      case "showChartsBtn":
        console.log("showChartsBtn")
        this.showChartsTarget.classList.remove("hidden")
        break
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
    const jumpToPageNumber = currentTarget.value

    this.previousPageButtonTargets[targetIndex].classList.remove("hidden")
    this.nextPageButtonTargets[targetIndex].classList.remove("hidden")

    if (jumpToPageNumber > 0 && jumpToPageNumber <= responsesCount) {
      showTargets[currentResponse-1].classList.add("hidden")
      showTargets[jumpToPageNumber-1].classList.remove("hidden")
      target.textContent = jumpToPageNumber
    } else {
      alert("沒有這頁喔")
    }
    if (jumpToPageNumber == 1) {
      this.previousPageButtonTargets[targetIndex].classList.add("hidden")
    }
    if (jumpToPageNumber == responsesCount) {
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