import Swal from "sweetalert2"
import Rails from "@rails/ujs"

Rails.confirm = function (message, element) {
  Swal.fire({
    title: "請確認您的操作",
    html: message,
    showCancelButton: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  }).then((result) => {
    if (result.value) {
      element.removeAttribute("data-confirm")
      element.click()
    }
  })
}
