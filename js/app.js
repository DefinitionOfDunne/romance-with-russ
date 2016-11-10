'use strict';


showMainPage();
$('#generate-button').on('click', romanceGenerator);
toggleResults();
clearSearch();

function showMainPage() {
    $(".fa-heart").click(function() {
        $(".intro-screen").hide();
        $(".main-page").show();
    })
}

function romanceGenerator() {
    var input = $('#query-term').val();
    $.ajax({
        type: 'GET',
        url: "http://www.stands4.com/services/v2/quotes.php?uid=5155&tokenid=JSR1kuuz7VsY4Stq&searchtype=SEARCH&query=" + input,
        dataType: "xml",
        error: function(data) {
            alert('Oops something went wrong! Try Again!');
        },
        success: function(data) {
            var json = $.xml2json(data);
            var quotes = json['#document'].results.result;
            appendPoems(quotes);
        }
    });
};

function appendPoems(quotes) {
    if (quotes === undefined) {
        $('.poem-lines').html('Not found! Search again!');
    } else {
        $.each(quotes, function(key, value) {
            var poemSelection = value.quote;
            if (poemSelection === undefined) {
                $('.poem-lines').html('Not found! Search again!');
            } else {
                $('.poem-lines').append('<li class="poem-results"></h1><p class="poem-content">' + poemSelection + '</p><h5 class="poem-poet">' + '- ' + value.author + '</h5></li>');
                $('li:first-child').addClass('active');
                $('.toggle-arrows').show();
            }
        });
    };
};

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

function clearSearch() {
    $('#clear-button').click(function() {
        $('.toggle-arrows').hide();
        $('.poem-results').remove();
        $('.poem-lines').empty();
    })
}
