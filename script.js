
function loco() {
  gsap.registerPlugin(ScrollTrigger);


  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    getDirection: true,

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

function heroBackground() {
  VANTA.NET({
    el: "#page1",
    mouseControls: true,
    touchControls: true,
    gyroControls: true,
    Height: 200.00,
    Width: 200.00,
    scale: .50,
    scaleMobile: 1.00,
    maxDistance: 19.00,
    spacing: 15.00,
    color: '#ffa500',
    backgroundColor: "#15171b",
  });
}

function elemSpanStructure() {
  document.querySelectorAll('.reveal').forEach(function (elem) {
    let parent = document.createElement('span')
    let child = document.createElement('span')


    parent.classList.add('parent')
    child.classList.add('child')

    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    elem.innerHTML = "";
    elem.appendChild(parent);

  })
}

function heroBackgroundMobile() {
  VANTA.NET({
    el: "#page1",
    mouseControls: true,
    touchControls: true,
    gyroControls: true,
    Height: 200.00,
    Width: 200.00,
    scale: .70,
    scaleMobile: 1.00,
    maxDistance: 20.00,
    spacing: 25.00,
    color: '#ffa500',
    backgroundColor: "#15171b",
  });
}



function CursonAnimation() {

  let section = document.querySelector(".section");
  section.addEventListener("mousemove", function (e) {

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

  var sec = document.querySelector('.section');

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
    backgroundColor: "#15171b",
    boxShadow: 'none',
    onComplete: sec.style.pointerEvents = 'all',


  })

  gsap.to('#master-1', {

    scrollTrigger: {
      trigger: '#master-1',
      scroller: "#main",
      start: "top 32.5%",
      toggleActions: "play pause pause reverse",

      //  markers: true,

    },
    pointerEvents: 'all',
    opacity: '1',
  })

  gsap.to('.img-box', {

    scrollTrigger: {
      trigger: '#master-1',
      scroller: "#main",
      start: "top 40.5%",
      toggleActions: "play pause pause reverse",

      //  markers: true,

    },

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
      section.style.backgroundColor = "#15171b";

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
      start: "top 38%",
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
    backgroundColor: "#15171b",
    boxShadow: 'none',
    onComplete() {
      document.querySelector('.section').style.pointerEvents = 'all';
    }

  })


  gsap.to('#master-1', {

    scrollTrigger: {
      trigger: '#master-1',
      scroller: "#main",
      start: "top 45.5%",
      toggleActions: "play pause pause reverse",
      //  markers: true,

    },

    opacity: '1',
    pointerEvents: "all",
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


function circleAnimation() {


  gsap.from(".circle", {

    scrollTrigger: {
      trigger: ".circle",
      scroller: "#main",
      start: "top 75%",
      end: "top 50%",
      scrub: "true",
      // markers: true,
    },
    opacity: 0,
    y: '40',

  })


}

function circleMobileAnimation() {


  gsap.from(".circle", {

    scrollTrigger: {
      trigger: ".circle",
      scroller: "#main",
      start: "top 95%",
      end: "top 80%",
      scrub: "true",
      // markers: true,
    },
    opacity: 0,
    y: '40',

  })


}

function OpenCloseButton() {

  var menu = document.querySelector("#menu");
  var full = document.querySelector(".menubar");
  var line1 = document.querySelector("#line1");
  var line2 = document.querySelector("#line2");

  var clickCounter = 1;

  menu.addEventListener("click", function () {
    if (clickCounter === 1) {

      full.style.width = '25vw';
      line1.style.transform = `rotate(45deg) translate(-1px, 10px)`;
      line2.style.transform = `rotate(-45deg) translate(-1px, -10px)`;
      full.style.right = '-38%';
      full.style.display = '',

        line1.style.marginLeft = '15px';
      line2.style.marginLeft = '15px';


      clickCounter = 0;
    } else {
      full.style.width = '0vw';
      full.style.display = 'none',
        full.style.right = '-70%';


      line1.style.transform = ``;
      line2.style.transform = ``;

      line1.style.marginLeft = '';
      line2.style.marginLeft = '';

      clickCounter = 1;
    }

  })

}

function SmallCircleMoving() {
  document.querySelector(".circle")
    .addEventListener("mousemove", function (dets) {
      var bndrectvals = document.querySelector(".circle").getBoundingClientRect()
      var xVal = dets.clientX - bndrectvals.x;
      var yVal = dets.clientY - bndrectvals.y;

      document.querySelector("#moving-circle").style.top = yVal + "px";
      document.querySelector("#moving-circle").style.left = xVal + "px";
      document.getElementById("#moving-circle").style.transition = "all cubic-bezier(0.19, 1, 0.22, 1) 0.4s";

    })

  document.querySelector(".circle")
    .addEventListener("mouseleave", function (dets) {
      document.querySelector("#moving-circle").style.top = 'initial';
      document.querySelector("#moving-circle").style.left = 'initial';

    })
}


function loaderAnimation() {
  var tl = gsap.timeline();

  tl
    .to(".parent .child", {
      y: '0%',
      duration: 1,
      delay: .5,

    })
    .to(".loader1", {
      height: 0,
      duration: 1,
      top: '-50vh',
      delay: .4,
      ease: Circ.easeInOut,
    })

    .to(".loader2", {
      height: 0,
      duration: 1,
      top: '-100vh',
      delay: -1,
      ease: Circ.easeInOut,

    })

  tl.eventCallback('onComplete', function () {
    document.querySelector('.nav').style.opacity = "1";

  });

}

function OpenCloseButtonMobile() {

  var menu = document.querySelector("#menu");
  var full = document.querySelector(".menubar");
  var line1 = document.querySelector("#line1");
  var line2 = document.querySelector("#line2");

  var clickCounter = 1;

  menu.addEventListener("click", function () {
    if (clickCounter === 1) {

      full.style.width = '58vw';
      line1.style.transform = `rotate(45deg) translate(-2.5px, 9px)`;
      line2.style.transform = `rotate(-45deg) translate(-2px, -10px)`;
      full.style.right = '-18%';
      full.style.display = '',

        line1.style.marginLeft = '15px';
      line2.style.marginLeft = '15px';


      clickCounter = 0;
    } else {
      full.style.width = '0vw';
      full.style.display = 'none',
      full.style.right = '-70%';


      line1.style.transform = ``;
      line2.style.transform = ``;

      line1.style.marginLeft = '';
      line2.style.marginLeft = '';

      clickCounter = 1;
    }

  })

}

if (window.innerWidth <= 500) {
  loco();
  loaderAnimation();
  heroBackgroundMobile();
  CursonAnimation();
  ProjectsMobileAnimation();
  PageColorChange();
  TextMobileAnimation();
  circleMobileAnimation();
  SmallCircleMoving();
  OpenCloseButtonMobile();
}

else {
  elemSpanStructure();
  loco();
  loaderAnimation();
  heroBackground();
  OpenCloseButton();
  CursonAnimation();
  ProjectsAnimation();
  PageColorChange();
  TextAnimation();
  circleAnimation();
  SmallCircleMoving();

}


