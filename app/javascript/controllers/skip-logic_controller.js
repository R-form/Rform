import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ['survey_id','skip_to_question'];

  select_question(e) {
    e.preventDefault()

    // 抓 id: survey/answer/question   
    const id = this.survey_idTarget.dataset.id
    // console.log(id);
    const question_id = e.target.closest(".question").dataset.question_id;
    console.log(question_id);
    const answer_id = e.target.closest(".answer").firstElementChild.value;
    // console.log(answer_id);
    const skip_to_question_id = e.target.value
    console.log(skip_to_question_id);

    const data = new FormData();
    data.append("question_id", question_id);
    data.append("answer_id", answer_id);
    data.append("skip_to_question_id", skip_to_question_id);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/skip_to_question_id`,
      data,
      success: ({ message }) => {
        console.log("成功");
      },
      error: (error) => {
        console.log("失敗");
      },
    });

  }
}
