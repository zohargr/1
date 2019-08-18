var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  // menuBarDropdown();
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);

    

  
};

$(document).ready(function(){
  var slider = new IdealImageSlider.Slider('#slider');
	slider.start();
  AOS.init();
  menuBarDropdown();
  
  $.post('php/likes.php' , {'getCounter':'1'} , function(dataCounter){
        console.log("is " + dataCounter);
        $('#likeCount').html("Page likes: " + dataCounter);
});
  $('#clickLike').click(function(){
       $.post('php/likes.php', {'ipLike':'1'}, function(ip){
           console.log("before "+ip);
             if(ip != "l1"){
                   $.post('php/likes.php' , {'getCounter':'1'} , function(dataCounter){
                        if(dataCounter){
                            counterLike = dataCounter;
                            console.log("is " + counterLike);
                            $('#likeCount').html("Page likes: " + counterLike);
                        }else{
                            $('#likeCount').html("Page s: ");
                        }
                    });
             }else{
                 console.log('You alerady like the page before!');
                 if(ip == "l1")
                    $('#likeCount').html("You alerady like the page before!");
             }
        });
  });
  function menuBarDropdown(){
    var newSize = -60;
    var id = setInterval(frame, 40);
    function frame() {
      if (newSize == 0) {
        clearInterval(id);
      } else {
        newSize++; 
        console.log(newSize);
        $( "header" ).css( "top", newSize + 'px' );
      }
    }
  }
    Program_Languages = [ ' C/C# ' ,
    ' Java ' , ' Python ' , ' Assembler ' , 
    ' PHP ' , ' AndroidStudio ' ];
    Client_Side = [ ' jQuery ' , 
    ' JavaScript ' , ' HTML/CSS ' ];
    Server_Side_and_DB = [ ' MySQL ' , 
    ' MongoDB ' , ' Linux ' , ' PHP ' ];
  $('#runcode').click(function(){
    var array = [];
    var temp = 0;
    var arrayTest = [];
    array.push(Program_Languages);
    array.push(Client_Side);
    array.push(Server_Side_and_DB);
    array.forEach(function(data){
        switch(temp){
            case 0:arrayTest.push("* Program_Languages *");break;
            case 1:arrayTest.push("* Client_Side *");break;
            case 2:arrayTest.push("* Server_Side_and_DB *");break;
        }
        temp++;
    	data.forEach(function(data1){
    		arrayTest.push(data1);
        });

    });

    var timesPrint = 0;
    var idRow = "";
    var consoleId = setInterval(consoleLog, 500);
    function consoleLog() {
      if (timesPrint == 16) {
        clearInterval(consoleLog);
      } else {
        idRow = "#row" + (timesPrint + 1);
        $(idRow).html(arrayTest[timesPrint]);
        timesPrint++;
      }
    }
    
    
  });
  
  $("#send").click(function(){
     $.post('php/main.php', {'send':1,'userName':$('#userName').val(),'userEmail':$('#userEmail').val(),'phoneNumber':$('#phoneNumber').val(),'userMessage':$('#userMessage').val()},function(data){ 
       if(data == "3")
       {
           $('#userName').val("");
           $('#userEmail').val("");
           $('#phoneNumber').val("");
           $('#userMessage').val("");
           $('#sendText').html("<b style='color:#477aab;'>Thank you!</b><br> i’ll respond as soon as possible");
            console.log("true");
        } else {
            console.log(data);
            switch(data){
                case "1": $('#sendText').html("<b style='color:#477aab;'>Incorrect Email..</b><br> please try agian");
                    break;
                case "2": $('#sendText').html("<b style='color:#477aab;'>All fields are a must..</b><br> please try agian");
                    break;
                case "4": $('#sendText').html("<b style='color:#477aab;'>Incorrect Phone..</b><br> please try agian");
                    break;
            }
            
           console.log("false"); 
        }
     });
  });
  // Wrap every letter in a span
$('.ml12').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

anime.timeline({loop: true})
  .add({
    targets: '.ml12 .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: function(el, i) {
      return 500 + 30 * i;
    }
  }).add({
    targets: '.ml12 .letter',
    translateX: [0,-30],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1100,
    delay: function(el, i) {
      return 100 + 30 * i;
    }
  });   
 //loading BAR start page
    function progressBar(){
        var prg = document.getElementById('progressId');
        // var percent = document.getElementById('loadBarId');
        var bodyBarBox = document.getElementById('loadBarBody');
        var counterBar = 1;
        var progress = 25;
        var idLoadBar = setInterval(loadFrame , 150);
        console.log(document.getElementById('loadBar').offsetWidth + "width");
        function loadFrame(){
            if(progress >= document.getElementById('loadBar').offsetWidth){
                bodyBarBox.style.display = 'none';
                 $('#loadDiv').css('z-index','14');
                 $('.grid-item').css('z-index','14');
              $('body').css('overflow', 'scroll');
              $('body').css('zoom', '100%');
            //   $('body').css('height', '1403px');
                clearInterval(idLoadBar);
            }else{
                progress += 4;
                counterBar += 25;
                prg.style.width = progress + 'px';
                // percent.innerHTML = counterBar + '%';
                
                
            }
        }

    }
    progressBar();
    //on click projects
    $('.grid-item').click(function(){
        var whatProject = this.id;
        switch(whatProject){
            case "prj1":whatProject = "#projectOne";
            break;
            case "prj2":whatProject = "#projectTwo";
            break;
            case "prj3":whatProject = "#projectThree";
            break;
            case "prj4":whatProject = "#projectFour";
            break;
        }
        $(whatProject).css('display','block');
        var opacityId = setInterval( changeOpacity ,1);
        var i = 0;
        function changeOpacity(){
            if(i >= 1)
              clearInterval(opacityId);
             else{
                 i += 0.05;
                 $(whatProject).css('opacity',i);
             }
        }

    });
    $('.backPrj').click(function(){
        var whatProject = this.id;
        switch(whatProject){
            case "prj1C":whatProject = "#projectOne";
            break;
            case "prj2C":whatProject = "#projectTwo";
            break;
            case "prj3C":whatProject = "#projectThree";
            break;
            case "prj4C":whatProject = "#projectFour";
            break;
        }
        var opacityIdOut = setInterval( changeOpacityOut ,1);
        var i = 1;
        function changeOpacityOut(){
            if(i <= 0){
                $(whatProject).css('display','none');
                clearInterval(opacityIdOut);
            }
             else{
                 i -= 0.05;
                //  console.log(i);
                 $(whatProject).css('opacity',i);
             }
        }

    });
    
    
$('#playMusic').click(function(){
    var aud = document.getElementById("audio");
    aud.play();
});
$('#pauseMusic').click(function(){
    var aud = document.getElementById("audio");
    aud.pause();
});
function closeNavMenu(){
    var opacityNew = 1;
    
    $("#burger").removeClass('rotated');
    $("#burger").addClass('rotatedBack');
    var navIdClose = setInterval(navFuncClose , 1);
    function navFuncClose(){
        if(opacityNew <= 0){
            console.log('doneMenu');
            $(".navMenu").css("display","none");
            clearInterval(navIdClose);
        }else{
            opacityNew -= 0.1;
            // console.log(topPos);
            $(".navMenu").css("opacity",opacityNew);
        }
    }
}
function getNavMenu(){
    var topPos = 0;
    $(".navMenu").css("display","flex");
    var navId = setInterval(navFunc , 1);
    function navFunc(){
        if(topPos >= 0.7){
            console.log('doneMenu');
            clearInterval(navId);
        }else{
            topPos += 0.1;
            // console.log(topPos);
            $(".navMenu").css("opacity",topPos);
        }
    }

}
var navFlag = true;

document.querySelectorAll('.nav-btn').forEach(function (el) {
  el.addEventListener('click', function () {
    var nav    = this.parentElement.parentElement,
        _class = 'open';
      nav.classList.contains(_class)
    ? nav.classList.remove  (_class)
    : nav.classList.add     (_class)
  });
});
var x = $('#middleMainInfo').position();
$("#burger").click(function(){
    
    if(navFlag == true){
        $("#burger").removeClass('rotatedBack');
        $("#burger").addClass('rotated');
        if ( $('#navBar').hasClass("nav-bar") ) {
		    getNavMenu();
	    }
        
        navFlag = false;
        console.log(navFlag);
    }else{
        closeNavMenu();
        $("#burger").removeClass('rotated');
        $("#burger").addClass('rotatedBack');
        
         navFlag = true;
         console.log(navFlag);
    }

    scroll_pos = $(document).scrollTop();
    if(scroll_pos >= x.top) {
        $(".nav .nav-btn .btn-bar").css('background', 'black');
    } else {
        $(".nav .nav-btn .btn-bar").css('background', 'white');
    }
    console.log('click');
    console.log("scr " + scroll_pos);
    if(scroll_pos >= x.top && navFlag == false) {

        $(".nav .nav-btn .btn-bar").css('background', 'white');
    } 
    if(scroll_pos >= x.top && navFlag == true) {
        $(".nav .nav-btn .btn-bar").css('background', 'black');
    } 

});
$(".navMenu").click(function(){
    closeNavMenu();
    document.querySelectorAll('.nav-btn').forEach(function (el) {
      $(el).trigger('click');
    });
});

// console.log(x.top);
var scroll_pos = 0;
$(document).scroll(function() { 
    scroll_pos = $(this).scrollTop();
    
    
    if(scroll_pos >= x.top) {
        $(".nav .nav-btn .btn-bar").css('background', 'black');
    } else {
        $(".nav .nav-btn .btn-bar").css('background', 'white');
    }
    if(scroll_pos >= x.top && navFlag == false) {
        console.log(x.top);
        console.log(scroll_pos);
        $(".nav .nav-btn .btn-bar").css('background', 'white');
    } 

});

// moving menu scrolling
$('.scrollTo').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    closeNavMenu();
     document.querySelectorAll('.nav-btn').forEach(function (el) {
      $(el).trigger('click');
    });
    return false;
});

// var win = window.screen;
// change screen to spaceland
    if(window.orientation == 90){
          $('.mainForm').css('height','200vh');
          $('.mainPage').css('height','280vh');
          $('.mainAboutMe').css('height','200vh');
          $('.mainProject').css('height','100vh');
          $('.navMenu').css('flex-direction','row');
          $('.scrollTo').css('margin','10px');
          $('#consolePreview').css('height','55vh');
    }
window.addEventListener("orientationchange", function () {
    console.log(window.orientation);
    if(window.orientation == 90){
          $('.mainForm').css('height','200vh');
          $('.mainPage').css('height','280vh');
          $('.mainAboutMe').css('height','200vh');
          $('.mainProject').css('height','100vh');
          $('.navMenu').css('flex-direction','row');
          $('.scrollTo').css('margin','10px');
          $('#consolePreview').css('height','55vh');
    }else{
         $('.mainForm').css('height','100vh');
         $('.mainPage').css('height','180vh');
         $('.mainAboutMe').css('height','100vh');
         $('.mainProject').css('height','100vh');
         $('.navMenu').css('flex-direction','column');
         $('.scrollTo').css('margin','30px');
         $('#consolePreview').css('height','35vh');
    }
});
});



function init() {
    var myAudio = document.getElementById("audio");
    myAudio.addEventListener('ended', loopAudio, true);
}
function loopAudio() {
    var myAudio = document.getElementById("audio");
    myAudio.play();
}
