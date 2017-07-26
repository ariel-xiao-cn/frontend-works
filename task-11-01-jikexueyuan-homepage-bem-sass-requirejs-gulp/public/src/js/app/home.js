define(["jquery"], function($) {
    $().ready(function() {

        $(".js-navigation__container").each(function(index, item) {
            $(item).on("mouseover", function(e) {

                $(this).children(".js-navigation__dropdown")
                    .removeClass("c-navigation__dropdown--inactive");

                $(this).children(".js-navigation__dropdown")
                    .addClass("c-navigation__dropdown--active");
            });
            $(item).on("mouseleave", function(e) {
                
                $(this).children(".js-navigation__dropdown")
                    .removeClass("c-navigation__dropdown--active");

                $(this).children(".js-navigation__dropdown")
                    .addClass("c-navigation__dropdown--inactive");
            });
        })

    });
});