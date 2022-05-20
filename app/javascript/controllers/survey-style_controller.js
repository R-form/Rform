import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ['survey_id', 'form'];

  select_font(e) {
    const id = this.survey_idTarget.dataset.id;
    const form = this.formTarget;
    const font_style = e.target.value;

    let font_string =["font-mono", "font-serif", "font-sans"].toString()
  
    switch (font_style) {
      case "font-sans":
        form.classList.remove(font_string);
        form.classList.add("font-sans");
        break;
      case "font-mono":
        form.classList.remove(font_string);
        form.classList.add("font-mono");
        break;
      case "font-serif":
        form.classList.remove(font_string);
        form.classList.add("font-serif");
        break;
    }

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
