# Bde-integrator-user-interface

The Integrator User Interface is an iframe application which allows us to easily
show multiple separate user interfaces in a single view, using iframes.  The app
is styled in a way that suits the Big Data Europe style.

Configuration occurs by supplying a JSONAPI compliant response to the
`/user-interfaces` call.  See the supplied file in `/user-interfaces` for
a quick example. You can mount your own custom config in `/config/user-interfaces`.
