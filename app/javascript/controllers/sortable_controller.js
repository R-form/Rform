import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import Sortable from "sortablejs";

export default class extends Controller {
  connect() {
    Sortable.create(this.element, {
      onEnd: function ({ newIndex, item }) {
        const id = item.dataset.id;

        const data = new FormData();
        data.append("newIndex", newIndex + 1);
        Rails.ajax({
          type: "patch",
          url: `/surveys/${id}/sort`,
          data: data,
          success: (resp) => {},
          error: (err) => {},
        });
      },
    });
  }
}
