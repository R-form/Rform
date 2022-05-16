import { Controller } from "stimulus"


export default class extends Controller {
  static targets = [ ];

connect(){
  console.log(123);
  const style = document.querySelector(".fa-palette")
  console.log(style);
}

 show(){
  const style = document.querySelector(".fa-palette")
  style.addEventListener("click", function () {
    console.log("點了");
  });

 }
  
} 