import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import Sortable from "sortablejs";

export default class extends Controller {
  connect() {
    Sortable.create(this.element, {
      // onEnd: function ({ newIndex }) {
      //   console.log(newIndex);
      //   const data = new FormData();
      //   data.append("newIndex", newIndex + 1);
      //   Rails.ajax({
      //     type: "patch",
      //     url: `/surveys/question_sort`,
      //     data: data,
      //     success: (resp) => {
      //       console.log(resp);
      //     },
      //     error: (err) => {
      //       console.log(err);
      //     },
      //   });
      // },
    });
  }
}
