## cute but not part of the assignment.


# require 'rack'
# require 'rack/server'

# class DivvyFlakeDev
#   def self.call(env)
#     puts env
#     response = Rack::Response.new
#     response.write(`cat ./index.html`)
#     [200, {"Content-Type" => "text/html"}, response]
#   end
# end

# class MiddleWare

#   def initialize(app)
#     @app = app
#   end

#   def call(env)
#     status, headers, body = @app.call(env)
#     # do stuff if needed
#     [status, headers, body]
#   end
# end

# use MiddleWare
# run DivvyFlakeDev
