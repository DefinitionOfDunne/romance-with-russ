//var api_path = 'http://www.stands4.com/services/v2/poetry.php?uid=5155&tokenid=JSR1kuuz7VsY4Stq'
// parse xml

var captionLength = 0;

$(document).ready(function() {
    captionEl = $('.typing-text');
    caption = "Ummmm, how do I describe a beautiful women????"
    type();
    showMainPage();
});


$('#generate-line').click(romanceGenerator);


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



function romanceGenerator() {
    input = $('#query-term').val();
    $.ajax({
        type: 'GET',
        url: "http://www.stands4.com/services/v2/poetry.php?uid=5155&tokenid=JSR1kuuz7VsY4Stq&term=" + input,
        dataType: "xml",
        success: function(data) {
            $(data).find('results').each( function(){
            var line = $(this).find('poem').text();
            var poet = $(this).find('poet').text();
            $('.poem').append(line);
            $('.poet').append(poet);
            });
        }
    });
};

