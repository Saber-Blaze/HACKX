document.addEventListener("DOMContentLoaded", function() {
    gsap.set(".img", {y:50});
    gsap.set(".loader-imgs", {x:500});
    gsap.set(".nav-item",{y:25,opacity:0});

    const tl=gsap.timeline({delay:1});

    tl.to(".img",{
        y:0,
        duration:1.5,
        stagger:0.5,
        ease:"power3.inOut",
    }).to(
        ".loader-imgs",
        {
        x:0,
        duration:3,
        ease:"power3.inOut"
    },
    "-=2.5"
);
});
