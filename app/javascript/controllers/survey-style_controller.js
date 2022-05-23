import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import Huebee from "huebee"
import "huebee/dist/huebee.min"

export default class extends Controller {
  static targets = ['survey_id', 'form'];

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

  pick_color(){
    const id = document.querySelector("form").children[2].dataset.id;
    const theme_color = this.colorTarget.value
    const color_field = this.themeTarget
    color_field.style['background-color'] = theme_color

    // console.log(color_field);

    console.log(theme_color);

    const data = new FormData();
    data.append("theme", theme_color);


    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/theme`,
      data: data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }

}
