function loco() {
  gsap.registerPlugin(ScrollTrigger);


  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    getDirection: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  locoScroll.on('scroll', (instance) => {
    document.documentElement.setAttribute('data-direction', instance.direction)
  });

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

function skillsAnimation() {
  var RightJayega = document.querySelectorAll(".right-jayega");
  var LeftJayega = document.querySelectorAll(".left-jayega");


  for (let i = 0; i < RightJayega.length; i++) {

    gsap.from(RightJayega[i], {

      scrollTrigger: {
        trigger: RightJayega[i],
        scroller: "#main",
        scrub: true,
        // markers: true,
      },
      x: '25%',


    })
  }

  for (let i = 0; i < LeftJayega.length; i++) {

    gsap.from(LeftJayega[i], {

      scrollTrigger: {
        trigger: LeftJayega[i],
        scroller: "#main",
        scrub: true,
      },
      x: '-25%',

    })

  }



}

function circleAnimation() {


  gsap.from(".circle", {

    scrollTrigger: {
      trigger: ".circle",
      scroller: "#main",
      start: "top 80%",
      end: "top 50%",
      scrub: "true",
      // markers: true,
    },
    opacity: 0,
    y: '40',

  })


}

function footerBackground() {
  VANTA.BIRDS({
    el: ".contact-me",
    mouseControls: true,
    touchControls: true,
    gyroControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: '#15171b',
  })
}


function OpenCloseButton() {

  let menu = document.querySelector(".menu");
  let full = document.querySelector(".menubar");
  let line1 = document.querySelector("#line1");
  let line2 = document.querySelector("#line2");


  var clickCounter = 1;

  menu.addEventListener("click", function () {
    if (clickCounter === 1) {

      full.style.transform = `translateY(0%)`;

      line1.style.transform = `rotate(45deg) translate(-8px, 13px)`;
      line2.style.transform = `rotate(-42deg) translate(-8px, -13px)`;
      line2.style.width = `3.6vw`;

      gsap.to(".parent .child", {
        y: '0%',
        duration: 1,
        delay: .5,
        
      })

      clickCounter = 0;
    } else {
      full.style.transform = `translateY(-100%)`;

      line1.style.transform = `initial`;
      line2.style.transform = `initial`;

      line2.style.width = `2.6vw`;

      gsap.to(".parent .child", {
        y: '100%',
        duration: 1,
        
      })

      clickCounter = 1;
    }

  })

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

function elemSpanStructure() {
  document.querySelectorAll('.reveal').forEach(function (elem) {
    let parent = document.createElement('span')
    let child = document.createElement('span')


    parent.classList.add('parent')
    child.classList.add('child')

    child.textContent = elem.textContent;
    parent.appendChild(child);

    elem.innerHTML = "";
    elem.appendChild(parent);

  })
}

loco();
elemSpanStructure();
TextAnimation();
OpenCloseButton();
footerBackground();
circleAnimation();
skillsAnimation();