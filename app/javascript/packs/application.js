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
import {
  Alert,
  Autosave,
  Dropdown,
  Modal,
  Tabs,
  Popover,
  Toggle,
  Slideover,
} from "tailwindcss-stimulus-components";

Rails.start();
Turbolinks.start();
ActiveStorage.start();
const application = Application.start();

application.register("alert", Alert);
application.register("autosave", Autosave);
application.register("dropdown", Dropdown);
application.register("modal", Modal);
application.register("tabs", Tabs);
application.register("popover", Popover);
application.register("toggle", Toggle);
application.register("slideover", Slideover);
// tailwindcss components demo https://excid3.github.io/tailwindcss-stimulus-components/#
