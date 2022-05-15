import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["short_url"];
  static values = { index: String };

  share(e) {
    e.preventDefault();
    const url = `${location.protocol}${location.host}${e.srcElement.closest("a").dataset.url}`
    console.log(url);
    this.short_urlTarget.value = `${url}`
  }
  copy(e) {
    e.preventDefault()
    console.log("複製成功");
    const copyText = `${this.short_urlTarget.value}`
    navigator.clipboard.writeText(copyText)
        .then(() => {
            console.log('內容已複製');
        })
        .catch((err) => {
            console.error(err);
        });

    }
}