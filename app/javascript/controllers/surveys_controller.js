import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["short_url"];

  share(e) {
    e.preventDefault();
    const url = `${location.protocol}${location.host}${
      e.target.closest("a").dataset.url
    }`;
    this.short_urlTarget.value = url;
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
    new QRCode(document.getElementById("qrcode"), this.short_urlTarget.value);
  }
}
