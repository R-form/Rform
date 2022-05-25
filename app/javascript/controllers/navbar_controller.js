import { Controller } from "stimulus"
import e from "turbolinks";


export default class extends Controller {
  static values ={ index: Boolean }

 show(e){
  e.preventDefault();
  this.indexValue = !this.indexValue
  const slideover = document.querySelector(".slideover")

  if(this.indexValue == true){
    slideover.classList.remove("invisible")
  }else{
    slideover.classList.add("invisible")
  }
  
 }   
  
} 