// Load all the controllers within this directory and all subdirectories.
// Controller files must be named *_controller.js.

import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"
import Notification from "stimulus-notification"

const application = Application.start()
application.register("notification", Notification)
const context = require.context("controllers", true, /_controller\.js$/)
application.load(definitionsFromContext(context))
