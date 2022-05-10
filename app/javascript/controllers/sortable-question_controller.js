import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import Sortable from "sortablejs";

export default class extends Controller {
  connect() {
    Sortable.create(this.element, {
      onEnd: function ({ item, newIndex }) {
        const id = item.dataset.id;
        const question_id = item.children[0].defaultValue;

        const data = new FormData();
        data.append("newIndex", newIndex + 1);
        data.append("question_id", question_id);

        Rails.ajax({
          type: "patch",
          url: `/surveys/${id}/question_sort`,
          data: data,
          success: (resp) => {
            console.log(resp);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }
}
