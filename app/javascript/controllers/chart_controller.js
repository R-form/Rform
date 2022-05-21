import { Application } from 'stimulus'
import Chart from 'stimulus-chartjs'

const application = Application.start()
application.register('chart', Chart)