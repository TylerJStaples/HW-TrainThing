var config = {
    apiKey: "AIzaSyDhtGbExTIC7esDY9UdfwAUuj9203XaKWA",
    authDomain: "train-homework-f46cb.firebaseapp.com",
    databaseURL: "https://train-homework-f46cb.firebaseio.com",
    projectId: "train-homework-f46cb",
    storageBucket: "train-homework-f46cb.appspot.com",
    messagingSenderId: "813578751531"
  };
firebase.initializeApp(config);

$(".btn-submit").on("click", function(){
  var trainName = $("#trainName").val();
  console.log(trainName);
});