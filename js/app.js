$(document).ready(function() { 

	 /* Select-option style */

	 var selWrap = $(".select");

	 for(var i = 0; i < selWrap.length; i++) {

	 	var originalSelect = $(selWrap[i]).find("select");

	 	/* Create DIV.select-selected - role: selected Item */

	 	var selectedItem = $("<div></div>", { "class" : "select-selected" });

	 	var innerText = originalSelect.find("option").first().html();

	 	$(selWrap[i]).append(selectedItem);

	 	selectedItem.text(innerText);

	 	/* Create DIV.select-items.select-hide - role: Container for the option list */

	 	var divOptionList = $("<div></div>", { "class" : "select-items select-hide" });


	 	for(var j=1; j < originalSelect.children().length; j++) {

	 		/* Create DIV - role: Takes the role of option el. */

	 		var optionDiv = $("<div></div>");

	 		var optionText = $(originalSelect).find("option").eq(j).val();

	 		optionDiv.html(optionText);

	 		optionDiv.on("click", function(e) {

		        var closestSelect = $(this).parent(".select-items").parent().find("select");

		        var closestSelectedItem = $(this).parents(".select-items").prev(".select-selected");
		        

		        for (var i = 0; i < closestSelect.children().length; i++) {

		        	

		          if ( closestSelect.find("option").eq(i).text() == $(this).text() ) {

			            closestSelect.prop("selectedIndex", i);

			            closestSelectedItem.html($(this).text());

			            var sameAsSelected = $(this).parent().find(".same-as-selected");

			            for (var k = 0; k < sameAsSelected.length; k++) {

			              sameAsSelected.eq(k).removeAttr("class");
			            }

			            $(this).attr("class", "same-as-selected");

			            break;
			          }
		        }

		        closestSelectedItem.click();
		    });


	 		divOptionList.append(optionDiv);
	 	}


	 	$(selWrap[i]).append(divOptionList);

	 	selectedItem.on("click", function(e) {

	      e.stopPropagation();

	      $(this).next().toggleClass("select-hide");

	      $(this).toggleClass("select-arrow-active");

	      closeAllSelect(this);

	    });
	}


	function closeAllSelect(elem) {	

		var arr = [];

		var selectItems = $(".select-items");

		var selectSelected = $(".select-selected");

		for (var i = 0; i < selectSelected.length; i++) {

				if (elem == selectSelected[i] ) {

			      arr.push(i);

			    } else {

			      	$(selectSelected).eq(i).removeClass("select-arrow-active");
			    }

		}

		for (var i = 0; i < selectItems.length; i++) {

		    if (arr.indexOf(i)) {

		      	$(selectItems[i]).addClass("select-hide");

		    }

		  }
	}

	$(document).on("click", closeAllSelect);


/* Testing input elements for errors */ 

function testInput(inputEl, regExp, err, msg) {

	inputEl.on('input', function(){

		var test;

		if( inputEl.attr('type') === 'number' ) {

			var m = parseInt(inputEl.val());

			test = regExp.test(m);

		} else {

			test = regExp.test(inputEl.val());
		}
		

		if(!test) {

			err.html(msg);

		} else {

			err.html('');
		}

		inputEl.blur(function(){

			if(test) {

				err.html('');

			}

			else if(inputEl.val() == '') {

				err.html('');
			} 

			else {

				err.html(msg);
			}

		});

	});
}

/* input name check */

var r = /^[a-zA-Z\s*]+$/i;

var strn = 'Sorry, only letters(a-z) are allowed';

testInput( $('input#name'), r, $('.nameErr'), strn );


/* input email check */

var r_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

var stre = 'Please enter your email address in the format someone@example.com';

testInput( $('input#email'), r_email, $('.emailErr'), stre );


/* input number check */

var r_num = /^[1-9]{1}[0-9]?$/i;

var strn = "Please enter a number between 9 and 99.";

var inpNum =  $('input#number');

inpNum.on('input', function(){

	 var inpVal = $('input#number').val();

	 var inpIntg = parseInt(inpVal);

	 

	 if(inpIntg >= 9 && inpIntg <= 99) {

	 	$('span.numErr').html("");

	 } else {

	 	$('span.numErr').html("Please enter a number between 9 and 99.");

	 }

	 inpNum.blur(function(){

			if( (inpIntg >= 9 && inpIntg <= 99) ) {

				$('span.numErr').html("");


			} else if($(this).val() == '') {

				$('span.numErr').html('');
			} 

			else {

				$('span.numErr').html("Please enter a number between 9 and 99.");
			}

		});

});


$('.radio label').click(function(){

		$('.serviceRadio').html('');
	});



$('.btn').on("click", function(e){


	function selectDivOption(defaultSelect, selectedItemsGroup, errMsg, msg) {

			var defText = defaultSelect.html();

			for(var n=0; n < selectedItemsGroup.children().length; n++) {

				var currentDiv = selectedItemsGroup.children().eq(n);

				switch( defText ) {

					case selectedItemsGroup.children().eq(n).html():

						  errMsg.html('');

						  defaultSelect.removeAttr('tabindex');

						  currentDiv.click(function(){

							 	errMsg.html('');

							 	defaultSelect.removeAttr('tabindex');
						 	});

						  break;

					case defaultSelect.parents('.form-group').find('option').eq(0).html():

					 errMsg.html(msg);

					 defaultSelect.attr('tabindex', '0').focus();

					 default:

					 	currentDiv.click(function(){

					 	errMsg.html('');

					 	defaultSelect.removeAttr('tabindex');

					 });


				}

			}
	}

	var msgOrder = "Please choose type of order.";

	selectDivOption($('.order .select-selected'), $('.order .select-items'), $('.orderErr'), msgOrder);


	// Radio Buttons Check

	var labelLength = $('.service.radio').find('label').length;

	var checkInput = $('.service.radio').find('label').children('input').is(':checked');

	if( !checkInput ) {

		$('.serviceRadio').html('Please choose an option.'); 

		$('.serviceRadio').prop('tabindex', '0').focus();
	}

	var msgLocation = "Please choose location.";

	selectDivOption($('.location .select-selected'), $('.location .select-items'), $('.locationErr'), msgLocation);

});

$('#survey-form').submit(function(e){

		var errArr = [$('.nameErr'), $('.emailErr'), $('.numErr'), $('.locationErr'), $('.serviceRadio'), $('.orderErr')];


		for(var a=0; a < errArr.length; a++) {

			if( errArr[a].html() !== "" ) {	

					e.preventDefault();

				}
		}
});



}); //end

