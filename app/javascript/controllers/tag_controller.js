import { Controller } from "stimulus"
import Choice from "choices.js"
import "choices.js/public/assets/styles/choices"

export default class extends Controller {
  connect() {
    new Choice(this.element, {
      allowHTML: true,
      duplicateItemsAllowed: false,
      paste: false,
      editItems: true,
      removeItemButton: true,
      placeholder: true,
      placeholderValue: "點擊Tag按鈕或輸入Enter更新Tag              ",
    })

    const container = document.querySelector(".container")

    function searchForTargetLevelInContainer(inputItem, targetClassName){
      let tempTargetItem = inputItem.parentElement
      do {
        if (tempTargetItem.className===targetClassName){
          return tempTargetItem
        } else {
          tempTargetItem = tempTargetItem.parentElement
        }
      } while (tempTargetItem.className != "container")
    }

    function searchForTargetItemFromChildren(inputItem, targetName){
      let tempTargetItems = inputItem.children
      let tempReturnValue = null
      
      if (tempTargetItems.length > 0){
        for (let index=0; index<tempTargetItems.length; index++){
          if ((tempTargetItems[index].id === targetName) || (tempTargetItems[index].className === targetName)){
            return tempTargetItems[index]
          } else {
            tempReturnValue = searchForTargetItemFromChildren(tempTargetItems[index], targetName)
            if (tempReturnValue != null){
              return tempReturnValue
            }
          }
        }
      }
      return tempReturnValue
    }

    function hideAndShowTargetItem(targetItem){
      let isHiddenFlag = false

      if (targetItem.className === "hidden"){
        targetItem.classList.remove("hidden")
        isHiddenFlag = false
      } else {
        targetItem.classList.add("hidden")
        isHiddenFlag = true
      }

      return isHiddenFlag
    }

    container.addEventListener("click", (e)=>{
      if (e.target.matches("i")){
        if (e.target.id === "tagIcon"){
          e.preventDefault()
          e.stopImmediatePropagation()

          let surveyCard = searchForTargetLevelInContainer (e.target, "m-3")
          let tagEditor = searchForTargetItemFromChildren (surveyCard, "tagEditor")
          let tagLabel = searchForTargetItemFromChildren (surveyCard, "tagLabel")

          if ((tagEditor != null)&&(tagLabel != null)){
            if (!(hideAndShowTargetItem (tagEditor))) {
              tagEditor.addEventListener("keyup", (e)=>{
                if (e.key === "Enter"){
                  tagEditor.parentElement.submit()
                }
              })
              tagEditor.addEventListener("click", (e)=>{
                e.preventDefault()
              })
            } else {
              tagEditor.parentElement.submit()
            }
            hideAndShowTargetItem (tagLabel)
          }
        }
      }
    })
  }
}