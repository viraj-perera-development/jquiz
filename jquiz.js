let x;
let count;
let current;
let answer = "";
let map = {};
let ax = [ "3", "1", "2", "3", "1"];
let total = 0;
let ttl = 0;
let m = {};
let results;


init();
getCurrentSlide();
goToNext();
getCount();
submitData();
reStart();


/* show quiz */
$("#startGame").click(function(){
  $("#startPage").removeClass("d-block");
  $("#startPage").addClass("d-none");
  $("#firstPage").removeClass("d-none");
  $("#firstPage").addClass("d-block");
});

/* add/remove disabled to next button */
$(".clickCheck").click(function(){
  $(".next-btn").removeAttr("disabled");
});
$(".next-btn").click(function(){
  $(".next-btn").attr("disabled", "disabled");
});


/* add/remove disabled to submit button */
$(".clickCheck").click(function(){
  $(".submit-btn").removeAttr("disabled");
});
$(".next-btn").click(function(){
  $(".submit-btn").attr("disabled", "disabled");
});



/* questo aggiunge la classe page-number-? */
function init() {
  $(".container-controller .quiz-page").each(function () {
    item = $(this);
    page = item.data("page");
    item.addClass("page-number-" + page);

    $(".progress-bar").css({ width: 20 + "px" });
  
  });
}


function getCount() {
  count = $(".quiz-page").length;
  return count;
}

/* next button con check se è stato cliccato una risposta */
function goToNext() {
  $(".next-btn").on("click", function () {
    current = x + 1;
    g = current / count;
    // build Progress
    g = g * 100;
    $(".progress-bar").css({ width: g + "%" });


    $(".quiz-page").removeClass("active");
    $(".page-number-" + current).addClass("active");
    x = current;
    if ($(".page-number-5").hasClass("active")) {
      $(".submit-btn").removeClass("d-none");
      $(".submit-btn").addClass("d-block");
      $(".next-btn").addClass("d-none");
    } 
  });
}

function goToSlide(x) {
  return x;
}

function reStart() {
  $(".restart-btn").click(function () {
    location.reload();
  });
}



function getCurrentSlide() {
  $(".quiz-page").each(function () {
    item = $(this);
    if ($(item).hasClass("active")) {
      x = item.data("page");
    } 
  });
}

function submitData() {
  $(".submit-btn").on("click", function () {
    collectData();
    $(".quiz-container").slideUp();
    $(".quiz-results").slideDown();
    $(".quiz-results").removeClass("d-none");
    $(".quiz-results").addClass("d-block");
  });
}

function collectData() {

  $(".clickCheck input:checked").each(function () {
    item = $(this);
    data = item.val();
    total += parseInt(data);
    map[item.data("item")-1] = data;
  });

  for (i = 0; i < count; i++) {

    if (map[i] === ax[i]) {
      c = 1;
    } else {
      c = 0;
    }
    ttl += c;
  }

  results = ((ttl / count) * 100).toFixed(0);

  $(".success-percent").html( results + "%");

  if (results >= 60) {
    $(".corso1").removeClass("d-none");
  }else {
    $(".corso5").removeClass("d-none");
  }

  var $el = $(".success-percent"),
  value = results;

  $({percentage: 0}).stop(true).animate({percentage: value}, {
  duration : 1000,
  step: function () {
      var percentageVal = Math.round(this.percentage * 1);
      $el.text(percentageVal + '%');
  }
  }).promise().done(function () {
  $el.text(value + "%");
  });


}
