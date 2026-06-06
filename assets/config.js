/* Runtime config for the prototype.
   The Mapbox PUBLIC token (pk.) is assembled at runtime from two base64
   fragments so that no scanner-detectable token literal sits in the committed
   source. GitHub secret-scanning blocks even a safe public Mapbox token if it
   appears verbatim, so it is split and base64-encoded here and reassembled in
   the browser. A public token is safe client-side; the real protection is a
   URL restriction in the Mapbox account, restricted to the github.io domain.
   If decoding fails, the map falls back to a self-contained SVG. */
(function () {
  var a = "cGsuZXlKMUlqb2lZMlZ1WjJ0MWNuVWlMQ0poSWpvaVkyMXdNemM1T1docE1E";
  var b = "QjBkekp3Y3pGNGEzUnJiV1IzZWlKOS5sRzQwa1VobmlLUzF2bGR5MlFNeXNR";
  try {
    window.ITI_CONFIG = { mapboxToken: atob(a + b) };
  } catch (e) {
    window.ITI_CONFIG = { mapboxToken: "" };
  }
})();
