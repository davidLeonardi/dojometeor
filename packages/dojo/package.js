Package.describe({
  summary: "A package to wrap dojo 1.8"
});

Package.on_use(function (api) {
  api.add_files("dojo/dojo.js", "client");
  api.add_files("bootstrap.js", "client");
});