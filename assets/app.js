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
    })



  })
