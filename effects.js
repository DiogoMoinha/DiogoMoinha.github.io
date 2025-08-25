function showCompletionMark(planetEl) {
  const check = document.createElement("a-text");
  check.setAttribute("value", "✓");
  check.setAttribute("color", "lime");
  check.setAttribute("align", "center");
  check.setAttribute("scale", "3 3 3");
  check.setAttribute("position", `0 ${parseFloat(planetEl.getAttribute("radius")) + 1} 0`);
  check.setAttribute("side", "double");
  check.setAttribute("animation", "property=rotation; to=0 360 0; loop=true; dur=3000; easing=linear");
  planetEl.appendChild(check);

  const ring = document.createElement("a-torus");
  ring.setAttribute("radius", parseFloat(planetEl.getAttribute("radius")) + 0.5);
  ring.setAttribute("radius-tubular", 0.05);
  ring.setAttribute("rotation", "90 0 0");
  ring.setAttribute("material", "color: lime; emissive: lime; emissiveIntensity: 1; opacity: 0.7; transparent: true");
  ring.setAttribute("animation", "property=rotation; to=90 360 0; loop=true; dur=4000; easing=linear");
  planetEl.appendChild(ring);
}
