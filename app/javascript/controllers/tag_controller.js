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

    function LevelInContainer(inputItem, targetClassName){
      let tempTargetItem = inputItem.parentElement
      do {
        if (tempTargetItem.className===targetClassName){
          return tempTargetItem
        } else {
          tempTargetItem = tempTargetItem.parentElement
        }
      } while (tempTargetItem.className != "container")
    }

    function ItemFromChildren(inputItem, targetName){
      let tempTargetItems = inputItem.children
      let tempReturnValue = null
      
      if (tempTargetItems.length > 0){
        for (let index=0; index<tempTargetItems.length; index++){
          if ((tempTargetItems[index].id === targetName) || (tempTargetItems[index].className === targetName)){
            return tempTargetItems[index]
          } else {
            tempReturnValue = ItemFromChildren(tempTargetItems[index], targetName)
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

    // function railsajax(){
    //   const data = new FormData();
    //     data.append("newIndex", newIndex + 1);
    //     Rails.ajax({
    //       type: "patch",
    //       url: `/surveys/${id}/tag`,
    //       data
    // }
    

    container.addEventListener("click", (e)=>{
      if (e.target.matches("i")){
        if (e.target.id === "tagIcon"){
          e.preventDefault()
          e.stopImmediatePropagation()

          let surveyCard = LevelInContainer (e.target, "m-3")
          let tagEditor = ItemFromChildren (surveyCard, "tagEditor")
          let tagLabel = ItemFromChildren (surveyCard, "tagLabel")

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