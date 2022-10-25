function show() {
  gsap.registerPlugin(ScrollTrigger);


  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });



  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
show();

function CursonAnimation() {

  document.addEventListener("mousemove", function (e) {

    var elem = document.createElement('div');
    elem.setAttribute("class", "trail")

    elem.setAttribute("style", `left: ${e.clientX - 10}px; top:${e.clientY - 10}px;`);

    elem.onanimationend = () => {


      elem.remove();
    }

    document.body.insertAdjacentElement('beforeend', elem);
  })
}


function ProjectsAnimation() {

  gsap.to('.section', {

    scrollTrigger: {
      trigger: '.section',
      scroller: "#main",
      start: "top 23%",
      toggleActions: "play pause pause reverse",
      //  markers: true,

    },

    scale: '1',
    top: '0%',
    borderTopRightRadius: '0',
    borderTopLeftRadius: '0',
    width: '100vw',
    height: '700vh',
    ease: ' Power2.easeOut',
    backgroundImage: "none",
    backgroundColor: "#fff",
    boxShadow: 'none',
  })

  gsap.to('#master-1', {

    scrollTrigger: {
      trigger: '#master-1',
      scroller: "#main",
      start: "top 32.5%",
      toggleActions: "play pause pause reverse",

      //  markers: true,

    },

    opacity: '1',
    pointerEvents: "all",
  })

}


function PageColorChange() {

  let container = document.querySelectorAll(".img-box");
  let main = document.querySelector("#main");
  let section = document.querySelector(".section");

  let circleTxt = document.querySelectorAll(".round-txt");


  for (let i = 0; i < container.length; i++) {
    container[i].addEventListener("mouseenter", function (dets) {

      const color = dets.path[0].dataset.color;
      main.style.backgroundColor = color;
      section.style.backgroundColor = color;


      circleTxt[i].style.display = 'initial';


    });
    container[i].addEventListener("mouseleave", function (dets) {

      main.style.backgroundColor = "#15171b";
      section.style.backgroundColor = "#fff";

      circleTxt[i].style.display = 'none';



    });

  }

  // arrow and round text movement

  for (let i = 0; i < container.length; i++) {
    container[i].addEventListener("mousemove", function (e) {


      var bndrectvals = container[i].getBoundingClientRect()
      var xVal = Math.abs(e.clientX - bndrectvals.x);
      var yVal = Math.abs(e.clientY - bndrectvals.y);

      circleTxt[i].style.left = xVal + "px";
      circleTxt[i].style.top = yVal + "px";

    })


  }

}

function TextAnimation() {
  let AnimateIt = document.querySelectorAll(".txts");

  for (let i = 0; i < AnimateIt.length; i++) {

    gsap.from(AnimateIt[i], {

      scrollTrigger: {
        trigger: AnimateIt[i],
        scroller: "#main",
        start: "top 70%",
        end: "top 50%",
        scrub: .3,
        // markers:true,
      },
      opacity: 0,
      y: '40',
      autoAlpha: 1,
      stagger: .5,

    })

  }
}

function ProjectsMobileAnimation() {
  gsap.to('.section', {

    scrollTrigger: {
      trigger: '.section',
      scroller: "#main",
      start: "top 65%",
      toggleActions: "play pause pause reverse",
      //  markers: true,

    },
    scale: '1',
    top: '0%',
    borderTopRightRadius: '0',
    borderTopLeftRadius: '0',
    width: '100vw',
    height: '60vh',
    ease: ' Power2.easeOut',
    backgroundImage: "none",
    backgroundColor: "initial",
    boxShadow: 'none',

  })

  gsap.to('#img-box1', {

    scrollTrigger: {
      trigger: '#img-box1',
      scroller: "#main",
      start: "top 70%",
      toggleActions: "play pause pause reverse",

      //  markers: true,

    },
    opacity: '1',
  })

}

function TextMobileAnimation() {
  let AnimateIt = document.querySelectorAll(".txts");

  for (let i = 0; i < AnimateIt.length; i++) {

    gsap.from(AnimateIt[i], {

      scrollTrigger: {
        trigger: AnimateIt[i],
        scroller: "#main",
        start: "top 70%",
        end: "top 50%",
        scrub: .3,
        // markers: true,
      },
      opacity: 0,
      y: '40',
      autoAlpha: 1,
      stagger: .5,

    })

  }
}

function heroImgAnimation() {
  let photu = document.querySelector('#photu');

  window.addEventListener('mousemove', function (dets) {

    photu.style.transform = ` translateY(${1 - dets.clientY * 0.09}px) translateX(${1 - dets.clientX * 0.09}px) `

  })

}


if (window.innerWidth <= 500) {
  CursonAnimation();
  ProjectsMobileAnimation();
  PageColorChange();
  TextMobileAnimation();
}

else {
  CursonAnimation();
  ProjectsAnimation();
  PageColorChange();
  TextAnimation();
  heroImgAnimation();


}


