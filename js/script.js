
/**
 * This function is called when the page finishes loading
 */
$(document).ready(function() {

    // Handlers for scrolling to the corresponding page section when
    // one of the nav buttons is clicked
    $("#nav-link-solutions").click(handleClickSolutions);
    $("#nav-link-get-involved").click(handleClickGetInvolved);

    // Change colors, highlight emphasized text, and animate bottom border
    // when hovering over one of the 'solutions' cards
    $(".solutions-card").hover(handleCardHoverIn, handleCardHoverOut);

});


/**
 * Handler called when 'Solutions' nav button is pressed. Auto-scrolls
 * to the corresponding page section
 */
function handleClickSolutions() {
    $("body, html").animate({
        scrollTop : $("#section-solutions").offset().top
    }, 400);
}


/**
 * Handler called when 'Get Involved' nav button is pressed. Auto-scrolls
 * to the corresponding page section
 */
function handleClickGetInvolved() {
    $("body, html").animate({
        scrollTop : $("#section-get-involved").offset().top
    }, 1000);
}


/**
 * Handler called when hovering into one of the solutions cards. Changes the
 * colors, highlights emphasized text, and shades the bottom border of the card,
 * animating from left to right
 */
function handleCardHoverIn() {

    // Add 'active' class to relevant elements to update colors and emphasis
    $(this).find(".solutions-card-content").addClass("active");
    $(this).find(".card-header").addClass("active");
    $(this).find(".emphasized-text").addClass("active");
    $(this).find(".solutions-card-bottom-border").addClass("active");

    // Animate the bottom border of the card, shading from left to right
    $(this).find(".solutions-card-bottom-border").stop()
        .css("background", "darkgreen")
        .css("border-color", "darkgreen")
        .animate({width:'100%'}, "fast", "swing");

}


/**
 * Handler called when hovering out of one of the solutions cards. Reverts the
 * colors, removes text highlighting, and un-shades the bottom border of the card,
 * animating from right to left
 */
function handleCardHoverOut() {

    // Remove 'active' class from any elements we added it to
    $(".active").removeClass("active")

    // Revert colors and reverse-animate the bottom border,
    // un-shading from right to left
    $(this).find(".solutions-card-bottom-border")
        .css("background", "darkslateblue")
        .css("border-color", "darkslateblue")
        .animate({width:'2%'},"fast", "swing", function() {
            $(this).css("background", "transparent").css("border-color", "transparent");
        });


}