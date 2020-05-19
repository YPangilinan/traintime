//connecting to Firebase database
var config = {
    apiKey: "AIzaSyDbIxNP0S3PmWWz8uixUUvz7SPExhFtIwI",
    authDomain: "ucla-bootcampyp.firebaseapp.com",
    databaseURL: "https://ucla-bootcampyp.firebaseio.com",
    projectId: "ucla-bootcampyp",
    storageBucket: "ucla-bootcampyp.appspot.com",
    messagingSenderId: "684338918033",
    appId: "1:684338918033:web:fdaf759ed3ad9dd83e4530",
    measurementId: "G-RLCK0YMRTX"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  var database = firebase.database();

  //initial variables for firebase
  var trainName = "";
  var destination = "";
  var firstTime = "";
  var frequency = "";

  $("#submit").on("click", function(event){
    event.preventDefault();

    trainName = $("#nameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTime = $("#timeInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

    database.ref().push({
        trainName : trainName,
        destination : destination,
        firstTime : firstTime,
        frequency : frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    //clear all of text-boxes after submit
     $("#nameInput").val("");
     $("#destinationInput").val("");
     $("#timeInput").val("");
     $("#frequencyInput").val("");
  });

  //firebase add child event
  database.ref().on("child_added", function(childSnapshot){
      console.log(childSnapshot.val());
    
      var sv = (childSnapshot.val());

    //store child into new variables
      var newTrain = sv.trainName;
      var newDestination = sv.destination;
      var newStart = sv.firstTime;
      var newFrequency = sv.frequency;

    //console log new train info
        console.log(newTrain);
        console.log(newDestination);
        console.log(newStart);
        console.log(newFrequency);

   //first Time (modeled from train-example.html)
   var firstTimeConverted = moment(newStart, "HH:mm").subtract(1, "years");
   var currentTime = moment();

   //difference between current time and next arrival
   var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");

   //time remainder using difference of times and the frequency. remainder is used for minutes away calculation
   var tRemainder = timeDifference % newFrequency;

   // minuites until next train arrives
   var minutesAway = newFrequency - tRemainder;

   //minutes away till the next train
   var nextTrain = moment().add(minutesAway, "minutes");
   
    //console log time information
        console.log(firstTimeConverted.format("hh:mm"));
        console.log(moment(currentTime).format("hh:mm"));
        console.log(timeDifference);
        console.log(tRemainder);
        console.log(minutesAway);
        console.log(moment(nextTrain).format("hh:mm"));

     //appending new train information to the current tran schedule card   
    var addRow = $("<tr>").addClass("newRow").append(
        $("<td>").text(newTrain),
        $("<td>").text(newDestination),
        $("<td>").text(newFrequency),
        $("<td>").text(moment(nextTrain).format("hh:mm")),
        $("<td>").text(minutesAway),
    );

    $("table tbody").append(addRow);

     // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);    
  });



