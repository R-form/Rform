import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import huebee from "huebee";
import "huebee/dist/huebee.min";

export default class extends Controller {
  static targets = ['survey_id', 'form', 'color', 'background_color', 'responses'];

  connect() {
    console.log(this.colorTarget);
    new huebee(this.colorTarget,{
      staticOpen: true,
      customColors: [ '#C25', '#E62', '#EA0', 'transparent', '#6C6', '#19F', '#258', '#7A7573' ],
      shades: 0,
      hues: 4,
      
    })

    new huebee(this.background_colorTarget,{
      staticOpen: true,
      customColors: [ '#C25', '#E62', '#EA0', 'transparent', '#6C6', '#19F', '#258', '#7A7573' ],
      shades: 0,
      hues: 4,
      
    })
  }

  pick_color(e){
    const id = this.survey_idTarget.dataset.id
    const theme = this.colorTarget.value
    console.log(theme);

    this.survey_idTarget.style.borderColor = theme
   
    const data = new FormData();
    data.append("theme", theme);


    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/theme`,
      data: data,
      success: ({ message }) => {},
      error: () => {
        console.log("失敗");
      },
    });
  }

  pick_background_color(){
    const id = this.survey_idTarget.dataset.id
    const background_color = this.background_colorTarget.value
    console.log(background_color);

    this.element.style.backgroundColor = background_color

    const data = new FormData();
    data.append("background_color", background_color);


    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/background_color`,
      data: data,
      success: ({ message }) => {},
      error: () => {
        console.log("失敗");
      },
    });
  }

  select_font(e) {
    const id = this.survey_idTarget.dataset.id;
    const form = this.formTarget;
    const font_style = e.target.value;

    const new_font_style = form.setAttribute("class",font_style)

    const data = new FormData();
    data.append("font_style", font_style);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/font_style`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }

}
