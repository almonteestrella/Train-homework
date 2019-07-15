
 var firebaseConfig = {
    apiKey: "AIzaSyCzKDtUcDidGVDlWC0syGDeu1SQOi1nMmI",
    authDomain: "my-tuesday-fce48.firebaseapp.com",
    databaseURL: "https://my-tuesday-fce48.firebaseio.com",
    projectId: "my-tuesday-fce48",
    storageBucket: "",
    messagingSenderId: "961659065151",
    appId: "1:961659065151:web:860fee9756f13227"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var dataRef = firebase.database()


$('#add-train').on('click', function(event) {
    event.preventDefault();

    var TrainName = $('#train-name-input').val().trim();
    var Destination = $('#Destination-input').val().trim();
    var FirstArrival = $('#First-train-time-input').val().trim();
    var Frequency = $('#Frequency-input').val().trim();

    var NewTrain = {

        name: TrainName,
        destination: Destination,
        FirstTrainArrival: FirstArrival,
        frequency: Frequency,
    };

    dataRef.ref().push(NewTrain);


    console.log(NewTrain.name);
    console.log(NewTrain.destination);
    console.log(NewTrain.FirstTrainArrival);
    console.log(NewTrain.frequency);
    
    alert("Train successfully added");

    $('#train-name-input').val('');
    $('#Destination-input').val('');
    $('#First-train-time-input').val('');
    $('#Frequency-input').val('');

});

dataRef.ref().on('child_added', function(childSnapshot) {
    console.log(childSnapshot.val());

    var TrainName = childSnapshot.val().name;
    var Destination = childSnapshot.val().destination;
    var FirstArrival = childSnapshot.val().FirstTrainArrival;
    var Frequency = childSnapshot.val().frequency;

    console.log(TrainName);
    console.log(Destination);
    console.log(FirstArrival);
    console.log(Frequency);

    
    var tFrequency = Frequency;

    // Time is 3:30 AM
    var firstTime = FirstArrival;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(Destination),
        $("<td>").text(FirstArrival),
        $("<td>").text(Frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)
      );
    
      // Append the new row to the table
      $("#employee-table > tbody").append(newRow);
    





});