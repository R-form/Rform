import { Controller } from "stimulus"
import QRCode from "qrcode"

export default class extends Controller {
  static targets = ["short_url", "short_url_in_edit", "surveyCard", "searchInput"]

  share(e) {
    e.preventDefault()
    const url = `${location.protocol}//${location.host}${e.target.closest("a").dataset.url}`
    this.short_urlTarget.value = url
    let qrcode = document.getElementById("qrcode")
    if (qrcode) {
      qrcode.remove()
    }
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

hideAndShowSearchBar() {
  this.searchInputTarget.classList.toggle("hidden")
  this.searchInputTarget.focus()
}

search(e) {
  let searchValue = e.target.value

  this.surveyCardTargets.forEach((surveyCard)=>{
    let surveyTitle = surveyCard.dataset.title
    let surveyDescription = surveyCard.dataset.description

    surveyCard.classList.add("hidden")
    if (surveyTitle.includes(searchValue) || surveyDescription.includes(searchValue)) {
      surveyCard.classList.remove("hidden")
    }
  }) 
}}