'use strict';

var captionLength = 0,
    captionEl = $('.typing-text'),
    caption = "Ummmm, how do I describe a beautiful women????",
    i = 0;

type();
showMainPage();
$('#generate-line').click(romanceGenerator);
toggleResults();



function type() {
    captionEl.html(caption.substr(0, captionLength++));
    if (captionLength < caption.length + 1) {
        setTimeout('type()', 50);
    } else {
        captionLength = 0;
        caption = '';
    }
}

function showMainPage() {
    $(".fa-heart").click(function() {
        $(".intro-screen").hide();
        $(".main-page").show();
    })
}

function romanceGenerator() {
    $('.toggle-arrows').show();
    var input = $('#query-term').val();
    $.ajax({
        type: 'GET',
        url: "http://www.stands4.com/services/v2/poetry.php?uid=5155&tokenid=JSR1kuuz7VsY4Stq&term=" + input,
        dataType: "xml",
        success: function(data) {
            var json = $.xml2json(data);
            var poems = json['#document'].results.result;
            $.each(poems, function(key, value) {
                var poemSelection = value.poem.split('\n')[0];
                if ($('.poem-lines li').length < 5) {
                    $('.poem-lines').append('<li></h1><p class="poem-content">' + poemSelection + '</p><h5 class="poem-poet">' + '- ' + value.poet + '</h5></li>');
                    $('li:first-child').addClass('active');
                    console.log(value.poem);
                } else {
                    console.log('done');
                }
            });
        }
    });
};


function toggleResults() {
    $("#right-arrow").click(function() {
        if ($('.active').length > 0) {
            $('.active').removeClass('active').next().addClass('active');
        } else {
            $('li:first').addClass('active');
        }
    });
    $("#left-arrow").click(function() {
        if ($('.active').length > 0) {
            $('.active').removeClass('active').prev().addClass('active');
        } else {
            $('li:first').addClass('active');
        }
    });
}
