import { Controller } from "stimulus"
import e from "turbolinks";


export default class extends Controller {
  static targets = ['palette'];

connect(){

}

 show(e){
  e.preventDefault();
  const slideover = document.querySelector(".slideover")
  slideover.classList.remove("hidden")
 }  
  
} 