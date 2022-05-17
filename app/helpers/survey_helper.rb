module SurveyHelper
require "rqrcode"
  def qrcode(path)
    rqrcode = RQRCode::QRCode.new(path)
    svg = rqrcode.as_svg(
      color: "000",
      shape_rendering: "crispEdges",
      module_size: 11,
      standalone: true,
      use_path: true
    ).html_safe
  end
end
