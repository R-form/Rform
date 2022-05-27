// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";
import "controllers";
import "stylesheets/application";
import { Application } from "@hotwired/stimulus";
import { Modal } from "tailwindcss-stimulus-components";
import TextareaAutogrow from 'stimulus-textarea-autogrow';


Rails.start();
Turbolinks.start();
ActiveStorage.start();
const application = Application.start();
application.register('textarea-autogrow', TextareaAutogrow);
application.register("modal", Modal);

// tailwindcss components demo https://excid3.github.io/tailwindcss-stimulus-components/#

