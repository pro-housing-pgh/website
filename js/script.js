
/**
 * This function is called when the page finishes loading
 */
$(document).ready(function() {

    // Fetch text blurbs from the server and populate elements from the data
    populateBlurbs();

    // Fetch footer links from server and assemble footer
    populateFooter();

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
    $(this).find(".card-text-citation").addClass("active");
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


/**
 * This method fetches a JSON object containing all the text blurbs for populating
 * various elements on the page. It retrieves the JSON, parses any special markers
 * in the contents (e.g. creating links embedded in the text), and updates the
 * appropriate elements on the page.
 */
function populateBlurbs() {

    // Fetch blurb text from the server
    let prefix = window.location.hostname === "localhost" ? "" : window.location.href;
    $.getJSON(prefix + "data/blurbs.json", function(data) {

        // Iterate over keys (correspond to ids in html
        for (const id in data) {

            // Get the text that should fill the specified tag
            let text = data[id];

            // Check for any links and replace them with <a> tags
            while (text.indexOf("[[LINK_START, ") !== -1) {

                // Extract link url
                let linkStart = text.indexOf("[[LINK_START, ");
                let linkEnd = text.indexOf("]]");
                let linkUrl = text.substring(linkStart + 14, linkEnd);

                // Replace the link markers with <a> tags
                let startTag = "<a href='" + linkUrl + "' target='_blank' class='card-text-citation'>"
                text = text.replace("[[LINK_START, " + linkUrl + "]]", startTag);
                text = text.replace("[[LINK_END]]", "</a>");

            }

            // Update the html contents for the specified id
            $("#" + id).html(text);

        }
    });

}


/**
 * This method fetches a JSON object containing the footer headings and links from
 * the server, and assembles the footer accordingly.
 */
function populateFooter() {

    // Fetch footer headings and links from server
    let prefix = window.location.hostname === "localhost" ? "" : window.location.href;
    $.getJSON(prefix + "data/footer.json", function(data) {

        // Iterate over headings
        for (const heading in data) {

            // Add a new vertical for each heading, create the heading inside it
            let section = $("<div>").addClass("footer-vertical");
            section.append($("<h2>").addClass("footer-vertical-heading").html(heading));

            // Add the list of links under the heading
            for (const link in data[heading]) {
                let linkTag = $("<a>").attr("href", data[heading][link]).attr("target", "_blank").html(link);
                section.append(linkTag)
            }

            // Add the heading and links to the page
            $("#footer-contents").append(section);

        }
    });

}