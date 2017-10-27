/*
 global Enabler, studio, $, 
 */
var preloadPath;
var preloadImages;
var stopWatch;
preloadPath = "assets/";
preloadImages = [
    "machine.png",
    "cafe.png",
    "cafe2.png",
    "legal.png",
    "logo.png",
    "price.png"
];
//Preload all assets beforehead
function preload(preloadPath, preloadImages) {
    var lastLoadedImage = 0;
    loadNext();
    function loadNext() {
        if (lastLoadedImage >= preloadImages.length) {
            mainInit();
        } else {
            var img = new Image();
            img.src = preloadPath + preloadImages[lastLoadedImage];
            img.onload = loadNext;
        }
        lastLoadedImage++;
    }
}
function mainInit() {
    setInitialStates();
    $(".container").show();
    seq01();
}
//Set the initial states
function setInitialStates() {
    hideAll([
      ]);
}

function seq01() {
    stopWatch=new Date().getTime();
    var twnDelay=0;
    TweenMax.set($(".machine"), {x: 44, y: 329});
    TweenMax.set($(".cafeDiv2"), {x: 73, y: 452,});
    TweenMax.set($(".cafe2"), {x: 0, y: -30,});
    TweenMax.set($(".logo"), {x: 17, y: 23,});
    TweenMax.set($(".legal"), {x: 0, y: 0,});
    TweenMax.set($(".price"), {x: 3, y: 158,});

    twnDelay+=0.25;
    TweenMax.from($(".cafe"), 0.5, {y: -64, ease:Power0.easeOut, rotationZ: '0.01deg', force3D:true, delay:twnDelay});
    TweenLite.delayedCall(twnDelay, priceAnimation);
    TweenMax.delayedCall(twnDelay, createSteam);
    twnDelay+=0.5;
    TweenMax.to($(".cafeDiv2"), 1.5, {y: 425, ease:Power1.easeOut, rotationZ: '0.01deg', force3D:true, delay:twnDelay});
    TweenMax.to($(".cafe2"), 1.5, {y: 0, ease:Power1.easeOut, rotationZ: '0.01deg', force3D:true, delay:twnDelay});
    twnDelay+=1;
    TweenMax.to($(".cafe"), 0.5, {y: 64, ease:Power0.easeOut, rotationZ: '0.01deg', force3D:true, delay:twnDelay});
    twnDelay+=7;
    TweenMax.to($(".steamContainer"), 2, {opacity: 0, ease:Power0.easeOut, rotationZ: '0.01deg', force3D:true, delay:twnDelay});
}
var TL = new TimelineMax({repeat: 5});
function priceAnimation() {
    TL.to($(".price"), 0.25, {alpha: 0.7, ease:Power0.none});
    TL.to($(".price"), 0.25, {alpha: 1, ease:Power0.none});
    
}
//SET IDs IN DOM TO GLOBAL VARIABLES
function IDsToVars(){
    var allElements = document.getElementsByTagName("*");
    
    for (var q = 0; q<allElements.length; q++){
         var el = allElements[q];
         if (el.id){
            window[el.id]=document.getElementById(el.id);
        }
    }
}
// Steam maker
function createSteam() {
    var duration = getRandomFN(6, 8);
    var animDelay = getRandomFN(0.05, 0.1);
    var steamImg = document.createElement('img');
    $(steamImg).addClass(".steam").attr('src', 'assets/steam' + Math.floor(getRandomFN(3, 4)) + '.png');
    $(".steamContainer").append(steamImg);

    TweenMax.set(steamImg, { x: 0, y: 20, alpha: getRandomFN(0.2, 0.5), rotationZ: 0.01, scale: getRandomFN(0.2, 0.8), force3D: true, overwrite: false });
    TweenMax.from(steamImg, 0.75, { alpha: 0, overwrite: false });
    TweenMax.to(steamImg, duration, { bezier: { curviness: 0.8, values: [{ x: getRandomFN(0, 20), y: getRandomFN(0, 20) }, { x: getRandomFN(0, 20), y: getRandomFN(-2, 10) }, { x: getRandomFN(0, 20), y: getRandomFN(5, 5) }], autoRotate: false }, ease: Power0.easeNone, overwrite: false });
    TweenMax.to(steamImg, duration, { rotation: getRandomFN(0, 20) });
    TweenMax.to(steamImg, 2, { alpha: 0, delay: duration - 2, overwrite: false });

    steamTween = TweenMax.delayedCall(animDelay, function() {
        createSteam();
    });
    TweenMax.delayedCall(duration, function() {
        $(steamImg).remove();
    });
}
function getRandomFN(min, max) {
    return Math.random() * (max - min) + min;
}

function returnTimer(){
    stopWatch=((new Date().getTime())-stopWatch)*0.001;
    console.log(stopWatch+" seconds");
}
function hideAll(whichOnes) {
    for (var q = 0; q < whichOnes.length; q++) {
        $(whichOnes[q]).hide();
    }
}
window.onload = preload(preloadPath, preloadImages);