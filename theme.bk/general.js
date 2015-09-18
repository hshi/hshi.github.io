// setChange
// A function used to set a flag that a form has been edited so a warning 
// will popup if checkChange is called
function setChange(form) 
{
	if (form.madechange)
	{
		form.madechange.value = "yes";
	}
}


// setChange
// A function used to REset a flag that a form has been edited so a warning 
// will not popup when the reset button (or link) is selected
function REsetChange(form) 
{
	if (form.madechange)
	{
		form.madechange.value = "no";
	}
}

// checkChange
// Popup a warning that a form has been changed
function checkChange() 
{
	var numberForms = document.forms.length;
	var formIndex;
	for (formIndex = 0; formIndex < numberForms; formIndex++)
	{
		if (document.forms[formIndex].madechange)
		{
			if (document.forms[formIndex].madechange.value == "yes")
			{
			    return confirm("Are you sure you want to navigate away from this page?\n\nThe changes you made will be lost if you navigate away from this page.\n\nPress OK to continue or Cancel to stay on the current page.");
			}
		}
	}
}

// deleteConfirm
// Basic confirmation
function titleDeleteConfirmSubmit(titleurl) 
{
    var thistitle = titleurl;
    //return confirm("Are you sure you want to delete this?");
    if (confirm("Are you sure you want to delete this?"))
    {
        
        if (confirm("Are you REALLY sure you want to delete this?"))
        {
            if ($("#titleurltodelete").length > 0)
            {
                $("#myform").attr("action", $("#myform").attr("action") + '/' + thistitle);
                $("#titleurltodelete").val(thistitle);
                //alert ("submitting");
                //alert (document.forms[0].titleurltodelete.value);
                $("#myform").submit();
                // need this, not sure why...
                return false;
            }
        }
        else
        {
            return false;
        }        
    }
    else
    {
        return false;
    }
}

function submitenter(myfield,e)
{
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    else return true;

    if (keycode == 13)
    {
        myfield.form.submit();
        return false;
    }
    else return true;
}


function makeRSSHeadlinePipe(rssurl,rssmax) {
    rssurl = unescape(rssurl);
    rssurl.replace('/','\/');
    document.write('<sc'+'rip'+'t type="tex'+'t/ja'+'vascript" src="http://pipes.yahoo.com/js/listbadge.js">'+
    '{"pipe_id":"1ef21465c35b4e317e6413c20ab3dcc3","_btype":"list","pipe_params":{"urlinput1":"'+rssurl+
    '","numberinput1":"'+rssmax+'"}}'+
    '</s'+'crip'+'t>');
}

$(document).ready(function(){
	$("a.titleDeleteConfirmSubmit").click(function(event){
		delTitle = $(this).attr("id");
		delTitle = delTitle.substr(24); // remove "titleDeleteConfirmSubmit"
		return titleDeleteConfirmSubmit(delTitle);
	});
	
	if ($("a[class^='slidetrigger']").length > 0) {
		$("a[class^='slidetrigger']").click(function(){
			widgetId = $(this).attr("class");
			widgetId = widgetId.substr(12);
			$("#slidenote"+widgetId).slideToggle("fast");
			//$(this).toggleClass("active");
			return false;
		});
	}
	
	/*** Responsive ***/
	if ($("#tv_site_menu_button").length > 0) {
		$("#tv_site_menu_button").click(function(){
			$("#tv_site_menu ul").slideToggle();
		});
	}
	if ($("aside.column").length > 0) {
		if ($("aside.column").outerHeight() > $(".contentarea").outerHeight()) {
			$(".contentarea").css("min-height", $("aside.column").outerHeight());
		}
	}
	
	
	
});

