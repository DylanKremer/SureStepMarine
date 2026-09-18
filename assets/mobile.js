document.addEventListener("DOMContentLoaded",function(){
  var nav=document.querySelector("header nav");
  var desktopLinks=nav&&nav.querySelector(".nav-links");
  if(!nav||!desktopLinks||nav.querySelector(".mobile-menu-toggle")) return;

  var toggle=document.createElement("button");
  toggle.className="mobile-menu-toggle";
  toggle.type="button";
  toggle.setAttribute("aria-label","Open menu");
  toggle.setAttribute("aria-expanded","false");
  toggle.innerHTML="<span></span>";

  var menu=document.createElement("div");
  menu.className="mobile-menu";

  var home=document.createElement("a");
  home.href="index.html";
  home.textContent="Home";
  menu.appendChild(home);

  desktopLinks.querySelectorAll("a").forEach(function(link){
    menu.appendChild(link.cloneNode(true));
  });

  var quote=nav.querySelector(".nav-cta");
  if(quote){
    var quoteLink=quote.cloneNode(true);
    quoteLink.classList.remove("nav-cta","btn","btn-primary");
    quoteLink.classList.add("mobile-quote");
    menu.appendChild(quoteLink);
  } else {
    var q=document.createElement("a");
    q.href="quote.html";
    q.textContent="Get a Quote";
    q.className="mobile-quote";
    menu.appendChild(q);
  }

  nav.appendChild(toggle);
  nav.appendChild(menu);

  function closeMenu(){
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded","false");
    toggle.setAttribute("aria-label","Open menu");
  }

  toggle.addEventListener("click",function(e){
    e.stopPropagation();
    var open=!menu.classList.contains("is-open");
    menu.classList.toggle("is-open",open);
    toggle.setAttribute("aria-expanded",String(open));
    toggle.setAttribute("aria-label",open?"Close menu":"Open menu");
  });

  menu.addEventListener("click",function(e){
    if(e.target.closest("a")) closeMenu();
  });

  document.addEventListener("click",function(e){
    if(!nav.contains(e.target)) closeMenu();
  });

  window.addEventListener("resize",function(){
    if(window.innerWidth>980) closeMenu();
  });
});