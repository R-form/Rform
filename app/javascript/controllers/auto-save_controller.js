import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["form"];

  connect() {
    this.localStorageKey = window.location;
    this.setFormData();
  }

  clearLocalStorage() {
    if (localStorage.getItem(this.localStorageKey) != null) {
      localStorage.removeItem(this.localStorageKey);
    }
  }

  getFormData() {
    const form = new FormData(this.formTarget);

    const data = [];
    for (let pair of form.entries()) {
      if (pair[0] != "authenticity_token") {
        data.push([pair[0], pair[1]]);
      }
    }

    return Object.fromEntries(data);
  }

  saveToLocalStorage() {
    const data = this.getFormData();
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  setFormData() {
    if (localStorage.getItem(this.localStorageKey) != null) {
      const data = JSON.parse(localStorage.getItem(this.localStorageKey));

      const form = this.formTarget;
      Object.entries(data).forEach((word) => {
        let name = word[0];
        let value = word[1];
        let input = form.querySelector(`[name='${name}']`);
        input && (input.value = value);
      });
    }
  }
}
