/*

A function that runs after page load looking for double square brackets with contents like [[wmuserid,text]]
and turns the contents into a mailto link.

------------------------------------

uses 2 regexs:
1) if there is only a userid in the brackets use the local site's default email address as the link text
2) if there are 2 things in the brackets use the second thing as the link text

-------------------------------------

To allow sites to 'protect' multiple email address formats the following can be prepended to the userid:
w|  ..... (converts to W&M email format userid@wm.edu)
v| ..... (converts to VIMS email format userid@vims.edu)
m| ..... (converts to Mason School of Business email format userid@mason.wm.edu)
e| ..... (converts to "student" email userid@email.wm.edu)

These work in all sites. Note that if there is no letter followed by pipe in front of the userid, the site's default email address format will be used.

The defaults per Cascade site are:

www.wm.edu (includes A&S) ..... userid@wm.edu
vims.edu ..... userid@vims.edu
business.wm.edu ...... userid@mason.wm.edu
education.wm.edu ..... userid@wm.edu
law.wm.edu ...... userid@wm.edu
wmpeople.wm.edu ...... userid@email.wm.edu

------------------------------------

TODO: If possible use xslt and regex to find double closed square brackets with stuff in it [[...]] and append after
it a no script tag like:
<noscript>&nbsp;(email this user id at wm.edu)&nbsp;</noscript>

------------------------------------

Requirements:
- jquery is used for the document.ready function only

-----------------------------------

*/

$(document).ready(function(){

    //check browser for javascript
    if (!document.getElementsByTagName) return false;
    if (!document.createElement) return false;

    /*
    Pages where we don't want to run this code (site W&M only):
    /offices/creativeservices/resources/cascade/howto/buildandedit/pages/directory/
    /offices/creativeservices/resources/cascade/howto/buildandedit/tools/email/
    /offices/creativeservices/resources/cascade/howto/buildandedit/tools/textboxurls/
    */
    

    myUrl = location.href;
    var pattern = new RegExp('(/site/page/trhelp/addurlandemaillinkstoquestions)|(/site/page/wmevents/toolstechniques)|(/page/edit/)|(/page/edit/)|(/site/page/wmevents/creatingyourevent)','i');
    if(pattern.test(myUrl)) {
        //alert("Javascript replace magic turned off.");
        return false;
    }



    page = document.body.innerHTML;

    // CASE: w|
    page = page.replace(/\[\[[\s*[wW]\|\s*([a-zA-Z0-9_\.-]+)\s*\,?\s*\]\]/g, "<a href=\"mailto:$1@wm.edu\">$1@wm.edu</a>");
    page = page.replace(/\[\[\s*[wW]\|\s*([a-zA-Z0-9_\.-]+)\s*\,{1}\s*([^\]]*)\s*\]\]/g, "<a href=\"mailto:$1@wm.edu\">$2</a>");

    // CASE: v|
    page = page.replace(/\[\[\s*[vV]\|\s*([a-zA-Z0-9_\.-]+)\s*\,?\s*\]\]/g, "<a href=\"mailto:$1@vims.edu\">$1@vims.edu</a>");
    page = page.replace(/\[\[\s*[vV]\|\s*([a-zA-Z0-9_\.-]+)\s*\,{1}\s*([^\]]*)\s*\]\]/g, "<a href=\"mailto:$1@vims.edu\">$2</a>");

    // CASE: m|
    page = page.replace(/\[\[\s*[mM]\|\s*([a-zA-Z0-9_\.-]+)\s*\,?\s*\]\]/g, "<a href=\"mailto:$1@mason.wm.edu\">$1@mason.wm.edu</a>");
    page = page.replace(/\[\[\s*[mM]\|\s*([a-zA-Z0-9_\.-]+)\s*\,{1}\s*([^\]]*)\s*\]\]/g, "<a href=\"mailto:$1@mason.wm.edu\">$2</a>");

    // CASE: e|
    page = page.replace(/\[\[\s*[eE]\|\s*([a-zA-Z0-9_\.-]+)\s*\,?\s*\]\]/g, "<a href=\"mailto:$1@email.wm.edu\">$1@email.wm.edu</a>");
    page = page.replace(/\[\[\s*[eE]\|\s*([a-zA-Z0-9_\.-]+)\s*\,{1}\s*([^\]]*)\s*\]\]/g, "<a href=\"mailto:$1@email.wm.edu\">$2</a>");

     // CASE: cs|
    page = page.replace(/\[\[\s*cs\|\s*([a-zA-Z0-9_\.-]+)\s*\,?\s*\]\]/ig, "<a href=\"mailto:$1@cs.wm.edu\">$1@cs.wm.edu</a>");
    page = page.replace(/\[\[\s*cs\|\s*([a-zA-Z0-9_\.-]+)\s*\,{1}\s*([^\]]*)\s*\]\]/ig, "<a href=\"mailto:$1@cs.wm.edu\">$2</a>");

     // CASE: math|
    page = page.replace(/\[\[\s*math\|\s*([a-zA-Z0-9_\.-]+)\s*\,?\s*\]\]/ig, "<a href=\"mailto:$1@math.wm.edu\">$1@math.wm.edu</a>");
    page = page.replace(/\[\[\s*math\|\s*([a-zA-Z0-9_\.-]+)\s*\,{1}\s*([^\]]*)\s*\]\]/ig, "<a href=\"mailto:$1@math.wm.edu\">$2</a>");

     // CASE: physics|
    page = page.replace(/\[\[\s*physics\|\s*([a-zA-Z0-9_\.-]+)\s*\,?\s*\]\]/ig, "<a href=\"mailto:$1@physics.wm.edu\">$1@physics.wm.edu</a>");
    page = page.replace(/\[\[\s*physics\|\s*([a-zA-Z0-9_\.-]+)\s*\,{1}\s*([^\]]*)\s*\]\]/ig, "<a href=\"mailto:$1@physics.wm.edu\">$2</a>"); 


    // CASE: site default. (DIFFERENT IN EACH SITE)
    page = page.replace(/\[\[\s*([a-zA-Z0-9\_\.-]+)\s*\,?\s*\]\]/g, "<a href=\"mailto:$1@wm.edu\">$1@email.wm.edu</a>");
    page = page.replace(/\[\[\s*([a-zA-Z0-9\_\.-]+)\s*\,{1}\s*([^\]]*)\s*\]\]/g, "<a href=\"mailto:$1@email.wm.edu\">$2</a>");


    // directory url, make it link. (Saving the client a little effort and putting this rewrite here too...)
    page = page.replace(/\{\{\s*(https*\:\/\/[^\}\,]+)\s*\}\}/g, "<a href=\"$1\">$1</a>");
    page = page.replace(/\{\{\s*(https*\:\/\/[^\}\,]+)\s*\,{1}\s*([^\}]*)\s*\}\}/g, "<a href=\"$1\">$2</a>");



    /* ======== EMBED YOUTUBE VIDEO ============
     *
     * Sizes a different "tag" for each size:
     *
     *   youtube:small = small player (240x180)
     *   youtube:medium = medium player (360x270)
     *   youtube:large = large player (480x360)
     *
     * Placement Options:
     *
     *   "Default" is left-align, no wrapping text: {{youtube:size|YouTubeVideoId}}
     *   Center-align, no wrapping text: {{youtube:size:center|YouTubeVideoId,optional description}}
     *   Left-align with wrapping text: {{youtube:size:left|YouTubeVideoId,optional description}}
     *   Right-align with wrapping text:{{youtube:size:right|YouTubeVideoId,optional description}}
     *
     * */

    /* Small Player (240x180) */

    // look for {{youtube:small|videoid}} ... no position given (left-aligns, no text wrap)

    page = page.replace(/\{\{\s*youtube:\s*small\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="margin: 0 8px 0 0;"><object title="$2" width="240" height="180"><param name="WMode" value="transparent"><param name="movie" value="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="240" height="180" wmode="transparent"></embed></object></div>');

    // look for {{youtube:small:center|videoid}}

    page = page.replace(/\{\{\s*youtube:\s*small:\s*center\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="text-align:center;"><object title="$2" width="240" height="180"><param name="WMode" value="transparent"><param name="movie" value="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="240" height="180" wmode="transparent"></embed></object></div>');

    // look for {{youtube:small:left|videoid}}

    page = page.replace(/\{\{\s*youtube:\s*small:\s*left\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:left; margin: 0 8px 0 0;"><object title="$2" width="240" height="180"><param name="WMode" value="transparent"><param name="movie" value="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="240" height="180" wmode="transparent"></embed></object></div>');

    // look for {{youtube:small:right|videoid}}

    page = page.replace(/\{\{\s*youtube:\s*small:\s*right\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:right; margin: 0 0 0 8px;"><object title="$2" width="240" height="180"><param name="WMode" value="transparent"><param name="movie" value="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="240" height="180" wmode="transparent"></embed></object></div>');


    /* Medium Player (360x270) */

    // look for {{youtube:medium|videoid}} ... no position given (left-aligns, no text wrap)

    page = page.replace(/\{\{\s*youtube:\s*medium\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="margin: 0 8px 0 0;"><object title="$2" width="360" height="270"><param name="WMode" value="transparent"><param name="movie" value="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="360" height="270" wmode="transparent"></embed></object></div>');

    // look for {{youtube:medium:center|videoid}}

    page = page.replace(/\{\{\s*youtube:\s*medium:\s*center\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="text-align:center;"><object title="$2" width="360" height="270"><param name="WMode" value="transparent"><param name="movie" value="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="360" height="270" wmode="transparent"></embed></object></div>');

    // look for {{youtube:medium:left|videoid}}

    page = page.replace(/\{\{\s*youtube:\s*medium:\s*left\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:left; margin: 0 8px 0 0;"><object title="$2" width="360" height="270"><param name="WMode" value="transparent"><param name="movie" value="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="360" height="270" wmode="transparent"></embed></object></div>');

    // look for {{youtube:medium:right|videoid}}

    page = page.replace(/\{\{\s*youtube:\s*medium:\s*right\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:right; margin: 0 0 0 8px;"><object title="$2" width="360" height="270"><param name="WMode" value="transparent"><param name="movie" value="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="360" height="270" wmode="transparent"></embed></object></div>');



    /* Large Player (480x360) */

    // look for {{youtube:large|videoid}} ... no position given (left-aligns, no text wrap)

    page = page.replace(/\{\{\s*youtube:\s*large\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="margin: 0 8px 0 0;"><object title="$2" width="480" height="360"><param name="WMode" value="transparent"><param name="movie" value="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="360" wmode="transparent"></embed></object></div>');

    // look for {{youtube:large:center|videoid}}

    page = page.replace(/\{\{\s*youtube:\s*large:\s*center\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="text-align:center;"><object title="$2" width="480" height="360"><param name="WMode" value="transparent"><param name="movie" value="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="360" wmode="transparent"></embed></object></div>');

    // look for {{youtube:large:left|videoid}}

    page = page.replace(/\{\{\s*youtube:\s*large:\s*left\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:left; margin: 0 8px 0 0;"><object title="$2" width="480" height="360"><param name="WMode" value="transparent"><param name="movie" value="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="360" wmode="transparent"></embed></object></div>');

    // look for {{youtube:large:right|videoid}}

    page = page.replace(/\{\{\s*youtube:\s*large:\s*right\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:right; margin: 0 0 0 8px;"><object title="$2" width="480" height="360"><param name="WMode" value="transparent"><param name="movie" value="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/$1&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="360" wmode="transparent"></embed></object></div>');





    /* ======== EMBED MEEBO CHAT ============
     *
     * Sizes a different "tag" for each size:
     *
     *   meebo:small = small chat (160x250)
     *   meebo:medium = medium chat (190x275)
     *   meebo:large = large large (250x300)
     *
     * Placement Options:
     *
     *   "Default" is right-align, wrapping text: {{meebo:size|MeeboChatId,optional description}}
     *   Left-align with wrapping text: {{meebo:size:left|MeeboChatId,optional description}}
     *   Right-align with wrapping text:{{meebo:size:right|MeeboChatId,optional description}}
     *
     * */


    /* Small Chat (160x250) */

    // look for {{meebo:small|chatid}} ... no position given (right-aligns with text wrap)
    page = page.replace(/\{\{\s*meebo:\s*small\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:right; margin: 0 0 0 18px;"><object title="$2" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" height="250" width="160"><param name="src" value="http://widget.meebo.com/mm.swf?$1"/><embed height="250" src="http://widget.meebo.com/mm.swf?$1" type="application/x-shockwave-flash" width="160"/></object></div>');
    // look for {{meebo:small:left|videoid}}
    page = page.replace(/\{\{\s*meebo:\s*small:\s*left\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:left; margin: 0 18px 0 0;"><object title="$2" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" height="250" width="160"><param name="src" value="http://widget.meebo.com/mm.swf?$1"/><embed height="250" src="http://widget.meebo.com/mm.swf?$1" type="application/x-shockwave-flash" width="160"/></object></div>');
    // look for {{meebo:small:right|videoid}}
    page = page.replace(/\{\{\s*meebo:\s*small:\s*right\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:right; margin: 0 0 0 18px;"><object title="$2" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" height="250" width="160"><param name="src" value="http://widget.meebo.com/mm.swf?$1"/><embed height="250" src="http://widget.meebo.com/mm.swf?$1" type="application/x-shockwave-flash" width="160"/></object></div>');


    /* Medium Chat (190x275) */

    // look for {{meebo:medium|chatid}} ... no position given (right-aligns with text wrap)
    page = page.replace(/\{\{\s*meebo:\s*medium\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:right; margin: 0 0 0 18px;"><object title="$2" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" height="275" width="190"><param name="src" value="http://widget.meebo.com/mm.swf?$1"/><embed height="275" src="http://widget.meebo.com/mm.swf?$1" type="application/x-shockwave-flash" width="190"/></object></div>');
    // look for {{meebo:medium:left|videoid}}
    page = page.replace(/\{\{\s*meebo:\s*medium:\s*left\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:left; margin: 0 18px 0 0;"><object title="$2" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" height="275" width="190"><param name="src" value="http://widget.meebo.com/mm.swf?$1"/><embed height="275" src="http://widget.meebo.com/mm.swf?$1" type="application/x-shockwave-flash" width="190"/></object></div>');
    // look for {{meebo:medium:right|videoid}}
    page = page.replace(/\{\{\s*meebo:\s*medium:\s*right\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:right; margin: 0 0 0 18px;"><object title="$2" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" height="275" width="190"><param name="src" value="http://widget.meebo.com/mm.swf?$1"/><embed height="275" src="http://widget.meebo.com/mm.swf?$1" type="application/x-shockwave-flash" width="190"/></object></div>');


    /* Large Chat (250x300) */

    // look for {{meebo:large|chatid}} ... no position given (right-aligns with text wrap)
    page = page.replace(/\{\{\s*meebo:\s*large\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:right; margin: 0 0 0 18px;"><object title="$2" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" height="300" width="250"><param name="src" value="http://widget.meebo.com/mm.swf?$1"/><embed height="300" src="http://widget.meebo.com/mm.swf?$1" type="application/x-shockwave-flash" width="250"/></object></div>');
    // look for {{meebo:large:left|videoid}}
    page = page.replace(/\{\{\s*meebo:\s*large:\s*left\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:left; margin: 0 18px 0 0;"><object title="$2" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" height="300" width="250"><param name="src" value="http://widget.meebo.com/mm.swf?$1"/><embed height="300" src="http://widget.meebo.com/mm.swf?$1" type="application/x-shockwave-flash" width="250"/></object></div>');
    // look for {{meebo:large:right|videoid}}
    page = page.replace(/\{\{\s*meebo:\s*large:\s*right\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:right; margin: 0 0 0 18px;"><object title="$2" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" height="300" width="250"><param name="src" value="http://widget.meebo.com/mm.swf?$1"/><embed height="300" src="http://widget.meebo.com/mm.swf?$1" type="application/x-shockwave-flash" width="250"/></object></div>');




    /* ======== EMBED FLICKR SLIDESHOW ============
     *
     * Sizes a different "tag" for each size:
     *
     *   flickr:small = small slideshow (240x180)
     *   flickr:medium = medium slideshow (360x270)
     *   flickr:large = large slideshow (480x360)
     *
     * Placement Options:
     *
     *   "Default" is left-align, no wrapping text: {{flickr:size|YouTubeVideoId}}
     *   Center-align, no wrapping text: {{flickr:size:center|YouTubeVideoId,optional description}}
     *   Left-align with wrapping text: {{flickr:size:left|YouTubeVideoId,optional description}}
     *   Right-align with wrapping text:{{flickr:size:right|YouTubeVideoId,optional description}}
     *
     * */

    /* Small Player (240x180) */

    // look for {{flickr:small|videoid}} ... no position given (left-aligns, no text wrap)

    page = page.replace(/\{\{\s*flickr:\s*small\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="margin: 0 8px 0 0;"><iframe align="center" src="http://www.flickr.com/slideShow/index.gne?set_id=$1/show" frameBorder="0" width="240" height="180" scrolling="no"></iframe></div>');

    // look for {{flickr:small:center|videoid}}

    page = page.replace(/\{\{\s*flickr:\s*small:\s*center\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="text-align:center;"<iframe align="center" src="http://www.flickr.com/slideShow/index.gne?set_id=$1/show" frameBorder="0" width="240" height="180" scrolling="no"></iframe></div>');

    // look for {{flickr:small:left|videoid}}

    page = page.replace(/\{\{\s*flickr:\s*small:\s*left\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:left; margin: 0 8px 0 0;"><iframe align="center" src="http://www.flickr.com/slideShow/index.gne?set_id=$1/show" frameBorder="0" width="240" height="180" scrolling="no"></iframe></div>');

    // look for {{flickr:small:right|videoid}}

    page = page.replace(/\{\{\s*flickr:\s*small:\s*right\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:right; margin: 0 0 0 8px;"><iframe align="center" src="http://www.flickr.com/slideShow/index.gne?set_id=$1/show" frameBorder="0" width="240" height="180" scrolling="no"></iframe></div>');



    /* Medium Player (360x270) */

    // look for {{flickr:medium|videoid}} ... no position given (left-aligns, no text wrap)

    page = page.replace(/\{\{\s*flickr:\s*medium\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="margin: 0 8px 0 0;"><iframe align="center" src="http://www.flickr.com/slideShow/index.gne?set_id=$1/show" frameBorder="0" width="360" height="270" scrolling="no"></iframe></div>');

    // look for {{flickr:medium:center|videoid}}

    page = page.replace(/\{\{\s*flickr:\s*medium:\s*center\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="text-align:center;"><iframe align="center" src="http://www.flickr.com/slideShow/index.gne?set_id=$1/show" frameBorder="0" width="360" height="270" scrolling="yes"></iframe></div>');

    // look for {{flickr:medium:left|videoid}}

    page = page.replace(/\{\{\s*flickr:\s*medium:\s*left\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:left; margin: 0 8px 0 0;"><iframe align="center" src="http://www.flickr.com/slideShow/index.gne?set_id=$1/show" frameBorder="0" width="360" height="270" scrolling="yes"></iframe></div>');

    // look for {{flickr:medium:right|videoid}}

    page = page.replace(/\{\{\s*flickr:\s*medium:\s*right\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:right; margin: 0 0 0 8px;"><iframe align="center" src="http://www.flickr.com/slideShow/index.gne?set_id=$1/show" frameBorder="0" width="360" height="270" scrolling="yes"></iframe></div>');



    /* Large Player (480x360) */

    // look for {{flickr:large|videoid}} ... no position given (left-aligns, no text wrap)

    page = page.replace(/\{\{\s*flickr:\s*large\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="margin: 0 * 0 0; width:100%;"><iframe align="center" src="http://www.flickr.com/slideShow/index.gne?set_id=$1/show" frameBorder="0" width="480" height="360" scrolling="no"></iframe></div>');

    // look for {{flickr:large:center|videoid}}

    page = page.replace(/\{\{\s*flickr:\s*large:\s*center\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="text-align:center; width:100%;"><iframe align="center" src="http://www.flickr.com/slideShow/index.gne?set_id=$1/show" frameBorder="0" width="480" height="360" scrolling="yes"></iframe></div>');

    // look for {{flickr:large:left|videoid}}

    page = page.replace(/\{\{\s*flickr:\s*large:\s*left\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="float:left; margin: 0 * 0 0; width:100%;"><iframe align="center" src="http://www.flickr.com/slideShow/index.gne?set_id=$1/show" frameBorder="0" width="100%" height="360" scrolling="yes"></iframe></div>');

    // look for {{flickr:large:right|videoid}}

    page = page.replace(/\{\{\s*flickr:\s*large:\s*right\s*\|\s*([a-zA-Z0-9_\.-]+)\s*\,?(.*)\}\}/ig, '<div style="margin: 0 0 0 *; width:100%; clear:both;"><iframe style="vertical-align:middle !important;" align="right" vertical-align="middle" src="http://www.flickr.com/slideShow/index.gne?set_id=$1/show" frameBorder="0" width="100%" height="410" scrolling="yes"></iframe></div>');



    document.body.innerHTML = page;


});
