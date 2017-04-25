$(document).ready(function() {
  console.log("ready!");

  $('#try-again').hide();
  $('#loading').hide();
  $('#heading').hide();
  
  // on form submission ...
  
  $('form').on('submit', function() {

    console.log("the form has beeen submitted");
    // grab values
    valueOne = $('input[name="location"]').val();
	$('#cel_radio').is(':checked')? valueTwo ="cel":valueTwo="farh";
	
    console.log(valueOne)
	console.log(valueTwo)

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
		  console.log(results)
		  
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
			  console.log(results);
          $('#results').html('<h4 color:"red">'+results[keys[0]]+'</h4>');
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