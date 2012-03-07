# Use the app.rb file to load Ruby code, modify or extend the models, or
# do whatever else you fancy when the theme is loaded.

module Nesta
  class App
    # Uncomment the Rack::Static line below if your theme has assets
    # (i.e images or JavaScript).
    #
    # Put your assets in themes/etn-theme/public/etn-theme.
    #
    use Rack::Static, :urls => ["/etn-theme"], :root => "themes/etn-theme/public"

    helpers do
      # Add new helpers here.
      def pages_in(path)
        Nesta::Page.find_by_path(path).pages
      end
    end

    # Add new routes here.
  end
end
