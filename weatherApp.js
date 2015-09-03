$(document).ready(init);

function init(){
  $('#goButton').click(locationEntered);
  $('#currentLocation').click(currentLocationClicked);
  $("#goButton").click(function(){
    if($('#goButton').css("right") <= "-40px"){
      $("#goButton").animate({right:'0%'});        
    }else{
      $("#goButton").animate({right:'-30%'});      
    }   
  });
  $("#currentLocation").click(function(){
    if($('#goButton').css("right") <= "-40px"){
      $("#goButton").animate({right:'0%'});        
    }else{
      $("#goButton").animate({right:'-30%'});      
    }   
  }); 
}

var currentCity = '';
var currentStateorCountry = '';
var zipCode = '';

function currentLocationClicked(e){
  var currentLocation = $.ajax('http://api.wunderground.com/api/751291fe8abdb495/geolookup/q/autoip.json',{
    dataType: 'jsonp',
    method: 'GET',
    timeout: 3000
  }).success(function(data){
    console.log('Geodata', data);
    currentCity = data.location.city + ', ';
    currentStateorCountry = data.location.state;
    currentCountry = data.location.country;
    goClicked();  
  }).fail(function(error){
    console.log('fail', data);
     $('#weatherCheck').text("oops! we can't find you! try typing your location instead");
  });
}
function locationEntered(){
  currentCity = $('#desiredCity').val();
  currentStateorCountry = $('#desiredState').val();
  zipcode = $('#desiredZip').val();
  goClicked();
}
function goClicked(e){
  var promise = $.ajax('http://api.wunderground.com/api/751291fe8abdb495/webcams/q/'+encodeURI(currentStateorCountry) +'/' +encodeURI(currentCity) +'.json', {
    dataType: 'jsonp',
    method: 'GET'
  }).success(function(data){
    console.log('data:', data);
    $('#webcam').attr('src', data.webcams[0].CURRENTIMAGEURL );
    
  }).fail(function(error){
     $('#weatherCheck').text("oops. we can't seem to find that location");
  });
}