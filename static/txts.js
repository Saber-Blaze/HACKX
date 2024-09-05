
// infinite scroll
// gsap.to(".marque",{
//     transform:'translateX(-100%)',
//     ease:"none",
//     duration:2,
//     repeat:-1
// })

window.addEventListener("wheel",function(dets) {
    if(dets.deltaY > 0){

        gsap.to(".marque",{
        transform:"translateX(-200%)",
        repeat:-1,
        duration:2,
        ease:"linear",
  
        })

        gsap.to(".marque img",{
            rotate:180
        })

    }
    else{
        gsap.to(".marque",{
            transform:"translateX(0%)",
            repeat:-1,
            
            duration:2,
           
            ease:"linear",

        })

        gsap.to(".marque img",{
            rotate:0
        })

    }
   
})