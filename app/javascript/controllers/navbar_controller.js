import { Controller } from "stimulus"
import e from "turbolinks";


export default class extends Controller {
 show(e){
   console.log(this.closeAsideTarget);
  e.preventDefault();
  const slideover = document.querySelector(".slideover")
  slideover.classList.remove("invisible")
 }  
  
} 