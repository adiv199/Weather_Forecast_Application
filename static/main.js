$(document).ready(function() {

  $('#try-again').hide();
  $('#loading').hide();
  $('#heading').hide();
    
  $('form').on('submit', function() {

    console.log("the form has beeen submitted");
    // get values for zipcode and temperature type
    valueOne = $('input[name="location"]').val();
	$('#cel_radio').is(':checked')? valueTwo ="cel":valueTwo="farh";

    $.ajax({
      type: "POST",
      url: "/",
      data : { 'zipcode': valueOne , 'temp_type': valueTwo },
	  beforeSend: function()
    {
        $('#loading').show();
    },
      success: function(results) {
          $('input').hide();
		  $('#cel_lab').hide();
		  $('#far_lab').hide();
          $('#try-again').show();
		  $('submit-btn').hide();
		  var keys = [];
		  for(var k in results) keys.push(k);
		  
		  //Display weather forecast as a table if it is not an error
          if(keys.length>2){
		  $('#loading').hide();
		  var tab_res = '<table class="tab"><th></th><th>Maximum</th><th>Minimum</th><th>Wind Speed</th><th></th>';
		  $.each(keys, function( index, value ) {
			  var trval = "<tr>";
			  console.log(index+"::"+value);
			  
			   trval = trval+'<td>'+value+'</td>';
				$.each(results[value],function( index, val ){
					if(index == 3 ){ val = '<img src="'+val+'">';}
					trval = trval+'<td>'+val+'</td>';		
				});
				trval = trval+'</tr>';
				tab_res = tab_res+trval;
			});
			tab_res=tab_res+'</table>';
			$('#table_view').html(tab_res);
			$('#heading').show();
			$('input').val('');
		  }
           
		  else {
			  //Display the description in error response json as an error
          $('#results').html('<h4>'+results[keys[0]]+'</h4>');
		  $('#results').show();
        }
      },
      error: function(error) {
        console.log(error);
		$('#loading').hide();
      }
    });

  });

  $('#try-again').on('click', function(){
    $('input').val('').show();
    $('#try-again').hide();
	$('submit-btn').show();
	$('#cel_lab').show();
	$('#far_lab').show();
    $('#results').hide();
	$('#table_view').html('');
	$('#heading').hide();
	
	
  });

});