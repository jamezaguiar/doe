document.querySelector("header button").addEventListener("click", function() {
  document.querySelector(".form").classList.toggle("hide");
  
  const sad = "😢";
  const happy = "😀";

  if (document.querySelector("span.emote").textContent === sad) {
    document.querySelector("span.emote").innerHTML = happy;
  } else {
    document.querySelector("span.emote").innerHTML = sad;
  }
});
