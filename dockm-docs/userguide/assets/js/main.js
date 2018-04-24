var productId = "";
var navigationArray = [];

function getQueryStrings() {
    var assoc = {};
    var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
    var queryString = location.search.substring(1);
    var keyValues = queryString.split('&');

    for (var i in keyValues) {
        var key = keyValues[i].split('=');
        if (key.length > 1) {
            assoc[decode(key[0]).toLowerCase()] = decode(key[1]).toLowerCase();
        }
    }

    return assoc;
}

function SetPageTitle() {
    var heading = "";
    try {
        if (varPageTitle != undefined || varPageTitle != null) {
            heading = varPageTitle;
        }
    } catch (err) { }

    if (heading == "") { heading = "Click2Cloud Documentation"; }

    var subHeading = " - Click2Cloud Documentation";

    $("#pageTitle").text(heading + subHeading);
}

function SetUpDocument() {
    var qs = getQueryStrings();
    productId = qs["productid"];
    if (productId == undefined || productId == null) { return; }

    var i = 1;
    var productName = "RedHat OpenShift Tool for Visual Studio with Docker Tooling";
    if (productId == "9a5b8b19-dadf-4b46-8712-527303d32231") {
        productName = "RedHat OpenShift Tool for Visual Studio with Docker Tooling";
        i = 1;
    }

    if (productId == "472a23b1-cc99-4aa2-a054-93f959556f27") {
        //Add code to hide docker navigations
        productName = "RedHat OpenShift Tool for Visual Studio";
        $(".docker-section").remove();
        i = 2;
    }

    if (productId == "e8591432-b2fe-457c-acb4-a4c2dc0ac863") {
        //Check if documents are refered from openshift tool redirect to docker folder
        productName = "Click2Cloud Docker Extension for Visual Studio";
        i = 3;
    }

    $(".mdProductName").text(productName);
    $("#productDownloadLink").attr('href', $("#productDownloadLink").attr('href') + productId);
    $("img.productvary").each(function () {
        var imageSrc = "../assets/image/" + $(this).attr("id") + "-" + i + ".png";
        $(this).attr("src", imageSrc);
    });

    $("a").each(function () {
        if ($(this).attr("href").toLowerCase().indexOf("http://") != -1 || $(this).attr("href").toLowerCase().indexOf("https://") != -1) {
            $(this).attr("target", "_blank");
        } else {
            if ($(this).hasClass('reference')) { }
            else {
                if(productId == undefined || productId == null){
                    $(this).attr("href", $(this).attr("href"));
                }else{
                    $(this).attr("href", $(this).attr("href") + "?productid=" + productId);
                }
            }
        }
    });
}

function ActivateNavigation() {
    /*var currentPage = window.location.pathname.toLowerCase().split("/").pop();
    if (currentPage == "") { return;}
    $("ul.navbar-nav a").each(function () {
        if ($(this).attr("href").toLowerCase().indexOf(currentPage) != -1) {
            $(this).parent().addClass("active");
        }
    });*/
}

function LoadIndex() {
    $("#dvIndex").html("<div id='hidden' style='display:none;'></div>");
    var html = "<ul>" + $(".navbar-nav").html() + "</ul>";
    //html = html.replace("ul", "ol");
    $("#hidden").html(html);

    $("#hidden li.divider").remove();
    $("#hidden ul,#hidden li,#hidden a,#hidden b").removeAttr('class').removeAttr('style');
    
    html = $("#hidden").html();
    $("#dvIndex").html(html);
}

function InitPaging() {
    $(".navbar-nav a").each(function () {
        if ($(this).attr("href").toLowerCase().indexOf(".html") != -1) {
            navigationArray.push($(this).attr("href").toLowerCase().split("/").pop().split("?")[0]);
        }
    });

    var previousClass = "";
    var nextClass = "";

    var previousLink = "";
    var nextLink = "";

    if ((window.location.pathname.toLowerCase().indexOf("index.html") != -1)
            || (window.location.pathname.toLowerCase().indexOf("html") == -1)) {
        previousClass = "disabled";
        previousLink = "";

        if(productId == undefined || productId == null) {
            nextLink = navigationArray[0];
        }else{
            nextLink = navigationArray[0] + "?productid=" + productId;
        }
    } else {
        var currentPage = window.location.pathname.toLowerCase().split("/").pop();
        var index = navigationArray.indexOf(currentPage);
        if (index == 0) {
            if(productId == undefined || productId == null) {previousLink = "./";}
            else{previousLink = "./" + "?productid=" + productId;}
        } else {
            if(productId == undefined || productId == null) {previousLink = navigationArray[index - 1];}
            else{previousLink = navigationArray[index - 1] + "?productid=" + productId;}
        }
        if (index == (navigationArray.length - 1)) {
            nextLink = "";
            nextClass = "disabled";
        } else {
            if(productId == undefined || productId == null) {nextLink = navigationArray[index + 1];}
            else{nextLink = navigationArray[index + 1] + "?productid=" + productId;}
        }
    }

    $(".page-navigation").html("<ul class='pager'><li class='previous " + previousClass + "'><a href='" + previousLink + "'>Previous</a></li><li class='next " + nextClass + "'><a href='" + nextLink + "'>Next</a></li></ul>");
}

$(document).ready(function () {
    //Activate Link

    //Loading Footer Text
    $(".footer").html("© Copyright 2018, <a href='http://click2cloud.com/' target='_blank'>Click2Cloud Inc.</a>");

    $("img").addClass("img-responsive");

    $("#navigation").load("navigation.html", function () {
        SetPageTitle();
        SetUpDocument();
        InitPaging();
        ActivateNavigation();

        if ((window.location.pathname.toLowerCase().indexOf("index.html") != -1)
            || (window.location.pathname.toLowerCase().indexOf("html") == -1))
        { LoadIndex(); }
    });
});