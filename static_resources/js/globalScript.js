function unescape() {
    var unescapeElements = $('span[unescape="true"]');
    if (!$.isEmptyObject(unescapeElements)) {
        for (index = 0; index < unescapeElements.length; index++) {
            $(unescapeElements[index]).html(jQuery.parseHTML($(unescapeElements[index]).text()));
            $(unescapeElements[index]).css('visibility', 'visible');
        }
    }
}
//User This function to Parse Html to html dom elements
//Always use parseCustomHTMLString class to element for prasing html
function parseHtml() {
    $(".parseCustomHTMLString").each(function (index) {
        $(this).html($(this).text());
        $(this).css('visibility', 'visible');        
    });
}
//Execute praseHtml on dom ready event
$(function () { parseHtml();});
