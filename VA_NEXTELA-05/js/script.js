var nav = (sequence) => {
    var exists = window.parent.CLMPlayer;

    if (exists) {
        window.parent.CLMPlayer.gotoSlide(null, sequence, null);
    }
    else {
        location.href = sequence;
    }
};

var nextPage = function (page) {
    page++;
    var href =  `${page.toString().padStart(2, "0")}_slide.html`;
    
    nav(href);
}

var prevPage = function (page) {
    if(page > 1) {
        page--;
        var href =  `${page.toString().padStart(2, "0")}_slide.html`;
        
        nav(href);
    }
}

var getPageName = function() {
    var url = location.href;
    var src = url.split("/");
    src.reverse();

    return parseInt(src[0].replace("_slide.html"));
}

var historico = [];

$(document).ready(()=>{
    $(".bt-popup").click(function(e) {
        var popup = $(this).attr("data-popup");
        $(popup).addClass("showing");
    });

    $(".bt-close-popup").click(function(e) {
        var a = $(this).parent();
        $(a).removeClass("showing");
    });

    $(".btn-close-slide").click(function(e) {
        var a = historico[historico.length -1];
        var p = $(this).parent();
        console.log(a);
        historico.pop();
        $(p).removeClass("show");
        $(a).addClass("show");
    });

    var transform = "translate(-50%, -50%) scale(1) translate(50%, 50%)";

    $("#section").css({
    	'width':'1194px',
    	'height':'896px',
    	'transform': transform,
    	'-webkit-transform': transform
    });

    $(".nav").click(function(){
        if($(this).hasClass("history")) {
            var historicoId = $(".slides.show").attr("id");
            historico.push(`#${historicoId}`);
        }
		
        var slide = $(this).attr("data-nav");
		$(".slides").removeClass("show");
		$(slide).addClass("show");
	});


    $("body").keydown(function(e) {
        if(e.key.match("ArrowRight")) {
            nextPage(getPageName());            
        }
        else if(e.key.match("ArrowLeft")) {
            prevPage(getPageName()); 
        }
    });
});


