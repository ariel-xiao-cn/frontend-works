define(["app/courseUI"], function(courseUI) {

    courseUI.dropdown({
        id:"header-dropdown"
    });

    courseUI.dropdown({
        id:"course-view-list"
    });

    courseUI.boxlist({
        id:"course-box-list",
        toolbar:{
        	grid: "switch-gridview",
        	list: "switch-listview",
        }
    });

    courseUI.asideMega({
        id:"aside-megamenu",
        active: "1"
    });

    courseUI.toolbar({
      	scrollToTop:{
      		id:"scrollTop"
      	}
    });


});