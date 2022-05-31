import { Controller } from "stimulus";
import QRCode from "qrcode";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ["short_url", "short_url_in_edit", "tagEditor", "tagLabel", "tagValues"];

  share(e) {
    e.preventDefault();
    const url = `${location.protocol}${location.host}${
      e.target.closest("a").dataset.url}`;
    this.short_urlTarget.value = url;
    let qrcode = document.getElementById("qrcode");
    if (qrcode) {
      qrcode.remove();
    }
  }

  hideAndShowTagInput(e) {
    const currentTarget = e.target.closest("button")
    const tagEditor = this.tagEditorTargets[currentTarget.id]
    const tagLabel = this.tagLabelTargets[currentTarget.id]
    const tagValues = this.tagValuesTargets[currentTarget.id].value
    const id = currentTarget.dataset.id

    tagEditor.classList.toggle("hidden")
    tagLabel.classList.toggle("hidden")

    console.log(e.target.closest("form"))
    // tagEditor.addEventListener("keyup", (e)=>{
    //   if (e.key === "Enter"){
    //     const data = new FormData();
    //     data.append("tag", tagValues);

    //     Rails.ajax({
    //       type: "patch",
    //       url: `/surveys/${id}/tag`,
    //       data,
    //       success: ({ message }) => {},
    //       error: (err) => {},
    //     });
    //   }
    // })
    const data = new FormData();
    data.append("tag", tagValues);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${id}/tag`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }

  copy(e) {
    e.preventDefault();
    const copyText = `${this.short_urlTarget.value}`;
    navigator.clipboard
      .writeText(copyText)
      .then((resp) => {})
      .catch((err) => {});
  }

  qrcode(e) {
    e.preventDefault();
    QRCode.toDataURL(this.short_urlTarget.value)
      .then((url) => {
        let img = document.createElement("img");
        img.src = url;
        img.id = "qrcode";
        let qrcode = document.getElementById("qrcode");
        if (qrcode) {
          qrcode.remove();
        } else {
          e.target.appendChild(img);
        }
      })
      .catch((url) => {
        console.error(url);
      });
  }

  share_in_edit(e){
    e.preventDefault();
    let qrcode = document.getElementById("qrcode_in_edit");
    if (qrcode) {
      qrcode.remove();
    }
  }

  copy_in_edit(e){
    e.preventDefault();
    const copyText = `${this.short_url_in_editTarget.value}`;
    navigator.clipboard
      .writeText(copyText)
      .then((resp) => {})
      .catch((err) => {});
  }

  qrcode_in_edit(e){
    e.preventDefault();
    QRCode.toDataURL(this.short_url_in_editTarget.value)
    .then((url) => {
      let img = document.createElement("img");
      img.src = url;
      img.id = "qrcode_in_edit";
      let qrcode = document.getElementById("qrcode_in_edit");
      if (qrcode) {
        qrcode.remove();
      } else {
        e.target.appendChild(img);
      }
    })
    .catch((url) => {
      console.error(url);
    });
  }
}
