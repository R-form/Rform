import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import Sortable from "sortablejs";

export default class extends Controller {
  connect() {
    Sortable.create(this.element, {
      onEnd: function ({ item, newIndex }) {
        const { id } = item.dataset;
        const { question_id } = item.dataset;

        const data = new FormData();
        data.append("newIndex", newIndex / 2 + 1);
        data.append("question_id", question_id);

        Rails.ajax({
          type: "patch",
          url: `/surveys/${id}/question_sort`,
          data,
        });
      },
    });
  }
}
