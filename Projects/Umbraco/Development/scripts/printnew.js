
function printSpecial()
{
	if (document.getElementById != null)
	{
		var html = '<!DOCTYPE html PUBLIC -//W3C//DTD XHTML 1.0 Transitional//EN https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd><html xmlns=https://www.w3.org/1999/xhtml>\n<HEAD>\n<script>\nfunction delayedPrint(){\nprint()\nsetTimeout("self.close()",1000)\n}\n</script>\n';

		if (document.getElementsByTagName != null)
		{
			var headTags = document.getElementsByTagName("head");
			if (headTags.length > 0)
				html += headTags[0].innerHTML;
		}
		
		html += '\n</HE' + 'AD>\n<BODY onload=delayedPrint()>\n<TABLE WIDTH=614 BORDER=0 cellpadding=3><TR><TD bgcolor=#FFFFFF>\n';		
		var printReadyElem = document.getElementById("printReady");
		var printReadyBElem = document.getElementById("printReadyB");
		
		if (printReadyElem != null)
		{
			html += printReadyElem.innerHTML;
		}
		else
		{
			alert("Could not find the printReady section in the HTML");
			return;
		}
		
		var currentTime = new Date();
        var year = currentTime.getFullYear();	
		
		html += '\n <br>COPYRIGHT &copy; 1996-' + year + ' The Advertising Specialty Institute. All rights reserved.</TD></TR></TABLE>\n</BO' + 'DY>\n</HT' + 'ML>';
		
		var printWin = window.open("","printSpecial");
		
		printWin.document.open();
		printWin.document.write(html);
		printWin.document.close();
	}
	else
	{
		alert("Sorry, the printer Friendly feature is only available in modern browsers.");
	}
}

function printSpecial2() {
    if (document.getElementById != null) {
        var html = '<!DOCTYPE html PUBLIC -//W3C//DTD XHTML 1.0 Transitional//EN https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd><html xmlns=https://www.w3.org/1999/xhtml>\n<HEAD>\n<script>\nfunction delayedPrint(){\nprint()\nsetTimeout("self.close()",1000)\n}\n</script>\n';

        if (document.getElementsByTagName != null) {
            var headTags = document.getElementsByTagName("head");
            if (headTags.length > 0)
                html += headTags[0].innerHTML;
        }

        html += '\n</HE' + 'AD>\n<BODY onload=delayedPrint()>\n<TABLE WIDTH=614 BORDER=0 cellpadding=3><TR><TD bgcolor=#FFFFFF>\n';
        var printReadyElem = document.getElementById("printReady2");
        var printReadyBElem = document.getElementById("printReady2B");

        if (printReadyElem != null) {
            html += printReadyElem.innerHTML;
        }
        else {
            alert("Could not find the printReady section in the HTML");
            return;
        }

        var currentTime = new Date();
        var year = currentTime.getFullYear();

        html += '\n <br>COPYRIGHT &copy; 1996-' + year + ' The Advertising Specialty Institute. All rights reserved.</TD></TR></TABLE>\n</BO' + 'DY>\n</HT' + 'ML>';

        var printWin = window.open("", "printSpecial");

        printWin.document.open();
        printWin.document.write(html);
        printWin.document.close();
    }
    else {
        alert("Sorry, the printer Friendly feature is only available in modern browsers.");
    }
}