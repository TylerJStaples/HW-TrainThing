$(document).ready(function(){

var config = {
  apiKey: "AIzaSyDhtGbExTIC7esDY9UdfwAUuj9203XaKWA",
  authDomain: "train-homework-f46cb.firebaseapp.com",
  databaseURL: "https://train-homework-f46cb.firebaseio.com",
  projectId: "train-homework-f46cb",
  storageBucket: "train-homework-f46cb.appspot.com",
  messagingSenderId: "813578751531"
};
firebase.initializeApp(config);
var data = firebase.database();
$("#submit").on("click", function(){
  var trainName = $("#trainName").val().trim();
  var trainFirst = $("#trainTime").val().trim();
  var trainFreq = $("#freqTrain").val().trim();
  var trainDest = $("#trainDest").val().trim();
  console.log(trainName);
  console.log(trainFirst);
  console.log(trainFreq);
  console.log(trainDest);

  var newTrain = {
    name: trainName,
    time: trainFirst,
    freq: trainFreq,
    dest: trainDest,
  };

  $("#trainName").val("");
  $("#trainTime").val("");
  $("#freqTrain").val("");
  $("#trainDest").val("");

  console.log(newTrain);

  data.ref().push(newTrain);

  return false;

});//.onclick

data.ref().on("child_added", function(childSnapshot, prevChildKey){
  console.log(childSnapshot.val());

  var tName = childSnapshot.val().trainName;
  var tDestination = childSnapshot.val().trainDest;
  var tFrequency = childSnapshot.val().trainFreq;
  var tFirstTrain = childSnapshot.val().trainFirst;

  var timeArr = tFirstTrain.split(":");
  var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
  var maxMoment = moment.max(moment(), trainTime);
  var tMinutes;
  var tArrival;

  if (maxMoment === trainTime) {
    tArrival = trainTime.format("hh:mm A");
    tMinutes = trainTime.diff(moment(), "minutes");
  }
  else {
    var differenceTimes = moment().diff(trainTime, "minutes");
    var tRemainder = differenceTimes % tFrequency;
    tMinutes = tFrequency - tRemainder;
    tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  }

  console.log("tMinutes:", tMinutes);
  console.log("tArrival:", tArrival);

  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
  });//end append

});//end document ready