//var api_path = 'http://www.stands4.com/services/v2/poetry.php?uid=5155&tokenid=JSR1kuuz7VsY4Stq'
// parse xml

var captionLength = 0;

$(document).ready(function() {
    captionEl = $('.typing-text');
    caption = "Ummmm, how do I describe a beautiful women????"
    type();
    showMainPage();
});


function type() {
    captionEl.html(caption.substr(0, captionLength++));
    if(captionLength < caption.length+1) {
        setTimeout('type()', 50);
    } else {
        captionLength = 0;
        caption = '';
    }
}

function showMainPage() {
    $(".fa-heart").click(function(){
        $(".intro-screen").hide();
        $(".main-page").show();
    })
}
