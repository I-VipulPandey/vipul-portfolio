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
      start: "top 25%",
      toggleActions: "play pause pause reverse",
      //  markers: true,

    },
    scale: '1',
    top: '0%',
    borderTopRightRadius: '0',
    borderTopLeftRadius: '0',
    width: '100vw',
    height: '100vh',
    ease: ' Power2.easeOut',
    backgroundImage: "none",
    backgroundColor: "initial",
    boxShadow: 'none',

  })

  gsap.to('#img-box1', {

    scrollTrigger: {
      trigger: '#img-box1',
      scroller: "#main",
      start: "top 24%",
      toggleActions: "play pause pause reverse",

      //  markers: true,

    },
    opacity: '1',
  })


  gsap.to('.section h1', {

    scrollTrigger: {
      trigger: '.section h1',
      scroller: "#main",
      start: "top 75%",
      toggleActions: "play pause pause reverse",
      //  markers: true,

    },
    display: 'initial',

  })


}


function PageColorChange() {

  var container = document.querySelectorAll(".img-box");
  var main = document.querySelector("#main");
  var circleTxt = document.querySelectorAll(".round-txt");


  for (let i = 0; i < container.length; i++) {
    container[i].addEventListener("mouseenter", function (dets) {

      const color = dets.path[0].dataset.color;
      main.style.backgroundColor = color;

      circleTxt[i].style.display = 'initial';


    });
    container[i].addEventListener("mouseleave", function (dets) {

      main.style.backgroundColor = "#15171b";
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
  var AnimateIt = document.querySelectorAll(".txts");

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
      scroller: "body",
      start: "top 65%",
      toggleActions: "play pause pause reverse",
      //  markers: true,

    },
    scale: '1',
    top: '0%',
    borderTopRightRadius: '0',
    borderTopLeftRadius: '0',
    width: '100vw',
    height: '52vh',
    ease: ' Power2.easeOut',
    backgroundImage: "none",
    backgroundColor: "initial",
    boxShadow: 'none',

  })

  gsap.to('#img-box1', {

    scrollTrigger: {
      trigger: '#img-box1',
      scroller: "body",
      start: "top 65%",
      toggleActions: "play pause pause reverse",

      //  markers: true,

    },
    opacity: '1',
  })

  gsap.to('.section h1', {

    scrollTrigger: {
      trigger: '.section h1',
      scroller: "body",
      start: "top 75%",
      toggleActions: "play pause pause reverse",
      //  markers: true,

    },
    display: 'initial',

  })


}

function TextMobileAnimation() {
  var AnimateIt = document.querySelectorAll(".txts");

  for (let i = 0; i < AnimateIt.length; i++) {

    gsap.from(AnimateIt[i], {

      scrollTrigger: {
        trigger: AnimateIt[i],
        scroller: "body",
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


if (window.innerWidth <= 500) {
  CursonAnimation();
  // ProjectsMobileAnimation();
  PageColorChange();
  TextMobileAnimation();
}

else {
  show();
  CursonAnimation();
  ProjectsAnimation();
  PageColorChange();
  TextAnimation();

}


