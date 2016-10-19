'use strict';

 
showMainPage();
$('#generate-button').click(romanceGenerator);
toggleResults();
clearSearch();

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
            appendPoems(poems);
        }
    });
};

function appendPoems(poems) {
    $.each(poems, function(key, value) {
        var poemSelection = value.poem.split('\n')[0]; 
            $('.poem-lines').append('<li class="poem-results"></h1><p class="poem-content">' + poemSelection + '.</p><h5 class="poem-poet">' + '- ' + value.poet + '</h5></li>');
            $('li:first-child').addClass('active');
    });
}

function toggleResults() {
    $("#right-arrow").click(function() {
        if ($('.active').length > 0) {
            $('.active').removeClass('active').next().addClass('active');
        } else {
            $('li:last').addClass('active');
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
function clearSearch(){
    $('#clear-button').click(function(){
         $('.toggle-arrows').hide();
         $('.poem-results').remove();
    })
}
