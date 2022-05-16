import { Controller } from "stimulus"


export default class extends Controller {
  static targets = ['closeAside'];

  connect(){

  }

  close(){
      this.closeAsideTarget.classList.add("hidden")
  }




  
} 