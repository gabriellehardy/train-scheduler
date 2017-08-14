$(document).ready(function(){

console.log("loaded");

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBv9n0bOMUNDsurXYMO9MAhw7zRUorhPNA",
    authDomain: "trainhw-37b16.firebaseapp.com",
    databaseURL: "https://trainhw-37b16.firebaseio.com",
    projectId: "trainhw-37b16",
    storageBucket: "trainhw-37b16.appspot.com",
    messagingSenderId: "710360161683"
  };
  

  firebase.initializeApp(config);

  console.log("firebase Initialized");

  var trainData = firebase.database();

  $('#newTrainSubmit').on('click', function() {

    console.log("clicked button");
    var tName = $('#tNameInput').val().trim();
    var destination = $('#desInput').val().trim();
    var firstTrain = moment($('#firstTInput').val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $('#frequencyInput').val().trim();

    var newT = {

      name: tName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };

    console.log(newT);
  
    trainData.ref().push(newT);

    console.log(newT.name);
    console.log(newT.destination);
    console.log(firstTrain);
    console.log(newT.frequency)

    alert("Train successfully added");

    $('#tNameInput').val("");
    $('#desInput').val("");
    $('#firstTInput').val("");
    $('#frequencyInput').val("");

    return false;
  
  });

  trainData.ref().on('child_added', function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;

    var differenceTimes = moment().diff(moment.unix(tFirstTrain), 'minutes');
    var tRemainder = moment().diff(moment.unix(tFirstTrain), 'minutes') % tFrequency;
    var tMinutes = tFrequency - tRemainder;

    var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

      console.log(tMinutes);
      console.log(tArrival);
      console.log(moment().format("hh:mm A"));
      console.log(tArrival);
      console.log(moment().format("X"));
  
      $("#tTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

  });

});