import { Application } from 'stimulus'
import Chart from 'stimulus-chartjs'

const application = Application.start()
application.register('chart', Chart)

// require 'csv'
// class Admin::EventRegistrationsController < AdminController
//      before_action :find_event

//      def index

//       respond_to do |format|
//         format.html
//         format.csv {
//           @registrations = @registrations.reorder("id ASC")
//           csv_string = CSV.generate do |csv|
//             csv << ["報名ID", "票種", "姓名", "狀態", "Email", "報名時間"]
//             @registrations.each do |r|
//               csv << [r.id, r.ticket.name, r.name, t(r.status, :scope => "registration.status"), r.email, r.created_at]
//             end
//           end
//           send_data csv_string, :filename => "#{@event.friendly_id}-registrations-#{Time.now.to_s(:number)}.csv"
//         }
//       end
//     end