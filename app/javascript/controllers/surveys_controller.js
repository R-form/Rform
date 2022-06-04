import { Controller } from "stimulus";
import QRCode from "qrcode";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ["short_url", "short_url_in_edit", "tagEditor", "tagValue", "surveyCard", "searchInput"];

  share(e) {
    e.preventDefault()
    const url = `${location.protocol}//${location.host}${e.target.closest("a").dataset.url}`
    this.short_urlTarget.value = url
    let qrcode = document.getElementById("qrcode")
    if (qrcode) {
      qrcode.remove()
    }
  }

  hideAndShowSearchBar() {
    this.searchInputTarget.classList.toggle("hidden")
    this.searchInputTarget.focus()
  }

  search(e) {
    const searchValue = e.target.value.toLowerCase()

    this.surveyCardTargets.forEach((surveyCard, index)=>{
      const surveyTags = this.tagValueTargets[index].value.toLowerCase()
      const surveyTitle = surveyCard.dataset.title.toLowerCase()
      const surveyDescription = surveyCard.dataset.description.toLowerCase()

      surveyCard.classList.add("hidden")
      if (surveyTags.includes(searchValue) || surveyTitle.includes(searchValue) || surveyDescription.includes(searchValue)) {
        surveyCard.classList.remove("hidden")
      }
    })
    
  }
  updateTags(e) {
    const currentTarget = e.target
    const currentTargetId = currentTarget.closest(".tagInput").id
    const tagValues = currentTarget.value
    const surveyId = this.tagEditorTargets[currentTargetId].dataset.id

    const data = new FormData();
    data.append("tag", tagValues);

    Rails.ajax({
      type: "patch",
      url: `/surveys/${surveyId}/tag`,
      data,
      success: ({ message }) => {},
      error: (err) => {},
    });
  }

  copy(e) {
    e.preventDefault()
    const copyText = `${this.short_urlTarget.value}`
    navigator.clipboard
      .writeText(copyText)
      .then((resp) => {})
      .catch((err) => {})
  }

  qrcode(e) {
    e.preventDefault()
    QRCode.toDataURL(this.short_urlTarget.value)
      .then((url) => {
        let img = document.createElement("img")
        img.src = url
        img.id = "qrcode"
        let qrcode = document.getElementById("qrcode")
        if (qrcode) {
          qrcode.remove()
        } else {
          e.target.appendChild(img)
        }
      })
      .catch((url) => {
        console.error(url)
      })
  }

  shareInEdit(e) {
    e.preventDefault()
    let qrcode = document.getElementById("qrcode_in_edit")
    if (qrcode) {
      qrcode.remove()
    }
  }

  copyInEdit(e) {
    e.preventDefault()
    const copyText = `${this.short_url_in_editTarget.value}`
    navigator.clipboard
      .writeText(copyText)
      .then((resp) => {})
      .catch((err) => {})
  }

  qrcodeInEdit(e) {
    e.preventDefault()
    QRCode.toDataURL(this.short_url_in_editTarget.value)
      .then((url) => {
        let img = document.createElement("img")
        img.src = url
        img.id = "qrcodeInEdit"
        let qrcode = document.getElementById("qrcodeInEdit")
        if (qrcode) {
          qrcode.remove()
        } else {
          e.target.appendChild(img)
        }
      })
      .catch((url) => {
        console.error(url)
      })
  }
}
