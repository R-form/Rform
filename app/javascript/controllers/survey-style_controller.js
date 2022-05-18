import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {

  option(e) {
    const id = document.querySelector("form").children[2].dataset.id;
    const form = document.querySelector("form");
    const font_style = e.target.value;

    switch (font_style) {
      case "font-sans":
        form.classList.remove("font-mono", "font-serif");
        form.classList.add("font-sans");
        break;
      case "font-mono":
        form.classList.remove("font-serif", "font-sans");
        form.classList.add("font-mono");
        break;
      case "font-serif":
        form.classList.remove("font-mono", "font-sans");
        form.classList.add("font-serif");
        break;
    }

    const data = new FormData();
    data.append("font_style", font_style);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/font_style`,
      data: data,
      success: (resp) => {},
      error: (err) => {},
    });
  }
}
