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
    //using moment.js for the initial time
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

   //variable of next arrival time based on current time and frequency


   //variable finding distance between current time and next arrival for "minutes away"


    var addRow = $("<tr>").append(
        $("<td>").text(newTrain),
        $("<td>").text(newDestination),
        $("<td>").text(newFrequency),

    );

    $("table tbody").append(addRow);


  })
