


// var queryURLBase = ""



// 1. Create Firebase link
// 2. Create button for adding new Train(employees)(train) - then update the html + update the database
// 3. Create a way to retrieve train(employees) from the train(employee) database.
// 4. Create a way to calculate the months worked. Using difference between start and current time. Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed
// */
// 1. Link to Firebase
var trainData = Firebase("https://traintime-wk7.firebaseio.com/");
// var weather = 
// 2. Button for adding Employees
$("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var trainDestination = $("#trainDestInput").val().trim();
	var trainStart = moment($("#trainStartInput").val().trim(), "DD/MM/YY").format("X");
	var trainFreq = $("#trainFreqInput").val().trim();

	// Creates local "temporary" object for holding employee data
	var newTrain = {
		name:  trainName,
		dest: trainDestination,
		start: trainStart,
		freq: trainFreq
	}

	// Uploads employee data to the database
	trainData.push(newTrain);

	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination); 
	console.log(newTrain.start);
	console.log(newTrain.freq)

	// Alert
	alert("Train successfully added");

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destInput").val("");
	$("#startInput").val("");
	$("#freqInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding a train(wasemployee) to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().dest;
	var trainFirstTrTime = childSnapshot.val().first;
	var trainFreq = childSnapshot.val().freq;

	// Employee Info
	console.log(trainName);
	console.log(trainDestination);
	console.log(trainFirstTrTime);
	console.log(trainFreq);

	// // Prettify the employee start
	var trainStartPretty = moment.unix(trainFirstTrTime, "HH:mm a").format("HH:mm");
	// // Calculate the months worked using hardconre math
	// // To calculate the months worked 
	var empMonths = moment().diff(moment.unix(trainFirstTrTime, 'X'), "months");
	console.log(empMonths);

	// // Calculate the total billed rate
	// var empBilled = empMonths * empRate;
	// console.log(empBilled);

	// Add each train's data into the table 
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");

});


// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
