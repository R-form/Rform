import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import huebee from "huebee";
import "huebee/dist/huebee.min";

export default class extends Controller {
  static targets = [
    "survey_id",
    "form",
    "color",
    "background_color",
    "responses",
    "question",
  ];

  connect() {
    new huebee(this.colorTarget, {
      staticOpen: true,
      customColors: [
        "#8E354A",
        "#E62",
        "#EA0",
        "transparent",
        "#6C6",
        "#19F",
        "#2B5F75",
        "#7A7573",
      ],
      shades: 0,
      hues: 4,
    });

    new huebee(this.background_colorTarget, {
      staticOpen: true,
      customColors: [
        "#DC9FB4",
        "#eca38f",
        "#ffc97b",
        "transparent",
        "#bfe8c5",
        "#bfe2e8",
        "#6699A1",
        "#a4b5c4",
      ],
      shades: 0,
      hues: 4,
    });
  }

  pick_color(e) {
    const id = this.survey_idTarget.dataset.id;
    const colorMap = {
      "#8E354A": "brightRed",
      "#E62": "brightOrange",
      "#EA0": "brightYellow",
      transparent: "transparent",
      "#6C6": "brightGreen",
      "#19F": "brightBlue",
      "#2B5F75": "brightNavy",
      "#7A7573": "brightGray",
    };

    const theme = colorMap[this.colorTarget.value];
    const classList = [...this.survey_idTarget.classList];

    const classArray = classList
      .filter((className) => !className.includes("border-"))
      .filter((className) => !className.includes("focus-within:outline-"));
    classArray.push(`border-${theme}`, `focus-within:outline-${theme}`);
    this.survey_idTarget.classList = classArray.join(" ");

    this.questionTargets.forEach((question) => {
      const questionList = [...question.classList];
      const questionArray = questionList.filter(
        (className) => !className.includes("focus-within:outline-")
      );
      questionArray.push(`focus-within:outline-${theme}`);
      question.classList = questionArray.join(" ");
    });

    const data = new FormData();
    data.append("theme", theme);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/theme`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }

  pick_background_color() {
    const id = this.survey_idTarget.dataset.id;

    const bgColorMap = {
      "#DC9FB4": "softRed",
      "#eca38f": "softOrange",
      "#ffc97b": "softYellow",
      transparent: "transparent",
      "#bfe8c5": "softGreen",
      "#bfe2e8": "softBlue",
      "#6699A1": "softNavy",
      "#a4b5c4": "softGray",
    };
    const background_color = bgColorMap[this.background_colorTarget.value];

    this.element.classList.forEach((className, _, classArray) => {
      if (className.includes("bg-")) {
        classArray.remove(className);
      }
    });
    this.element.classList.add(`bg-${background_color}`);

    const data = new FormData();
    data.append("background_color", background_color);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/background_color`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }

  select_font(e) {
    const id = this.survey_idTarget.dataset.id;
    const form = this.formTarget;
    const font_style = e.target.value;
    const new_font_style = form.setAttribute("class", font_style);

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

  update_status(e) {
    const id = this.survey_idTarget.dataset.id;
    const status_value = e.target.value;

    const data = new FormData();
    data.append("status_value", status_value);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/update_status`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }

  update_opentime(e) {
    const id = this.survey_idTarget.dataset.id;
    const opentime = e.target.value;

    const data = new FormData();
    data.append("opentime", opentime);
    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/update_opentime`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }

  update_closetime(e) {
    const id = this.survey_idTarget.dataset.id;
    const closetime = e.target.value;

    const data = new FormData();
    data.append("closetime", closetime);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/update_closetime`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }
}
