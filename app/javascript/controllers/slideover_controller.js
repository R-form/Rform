import { Controller } from "stimulus"


export default class extends Controller {
  static targets = ['closeAside'];

  connect(){

  }

  close(){
    console.log(this.closeAsideTarget);
    const close = this.closeAsideTarget.classList.add("hidden")
   
  }




  
} 