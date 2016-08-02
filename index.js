var MongoClient = require('mongodb').MongoClient,
		assert = require('assert');

// Connection URL
var url = "mongodb://localhost:27017/test";

// Insert Document
var insertDocuments = function (db, callback){
	//Get document collection
	var collection = db.collection('documents');

	// Insert some documents
	collection.insertMany([{a:1},{a:2},{a:3}], function (err, result) {
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log("Inserted 3 document in collection.");
		callback(result);
	})
}


var findDocuments = function (db, callback) {
	// Get documents collection
	var collection = db.collection('documents');

	// Find some documents
	collection.find({}).toArray(function (err, docs) {
		assert.equal(err, null);
		console.log('Found following records')
		console.log(docs);
		callback(docs);
	})
}

// Using connect method to connect to mongo server
MongoClient.connect(url, function (err, db) {
	assert.equal(null, err);
	if(err) {
		console.log('err')
	}

	if(db) {
		console.log('Connected Successfully to server');

		// Call insert documents
		// insertDocuments(db, function () {
		// 	db.close();
		// });

		// Find some documents
		findDocuments(db, function () {
			db.close();
		})
	}
	db.close();
})

