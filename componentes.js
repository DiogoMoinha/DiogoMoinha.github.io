AFRAME.registerComponent("proximity-check", {
  schema: { planetName: {type: "string"}, questions: {type: "array"} },
  tick: function () {
    const cam = document.querySelector("[gps-new-camera]");
    if (!cam.components["gps-new-camera"].currentCoords) return;

    const planet = this.el.getAttribute("gps-new-entity-place");
    const lat = cam.components["gps-new-camera"].currentCoords.latitude;
    const lon = cam.components["gps-new-camera"].currentCoords.longitude;
    const dist = getDistanceFromLatLonInM(lat, lon, planet.latitude, planet.longitude);

    if (dist < 15 && !this.answered) {
      this.answered = true;
      showQuizModal(this.data.planetName, this.data.questions, (correct) => {
        if (correct) showCompletionMark(this.el);
      });
    }
  }
});

// Função auxiliar de distância
function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2-lat1) * Math.PI/180;
  const dLon = (lon2-lon1) * Math.PI/180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
