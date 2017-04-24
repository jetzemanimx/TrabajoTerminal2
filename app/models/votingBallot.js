var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var votingBallotSchema = new mongoose.Schema({
        Name: {
            type: String,
            required: true
        },
        Description: {
            type: String,
            required: false
        },
        dateInit: {
            type: Date,
            required: true
        },
        dateEnd: {
            type: Date,
            required: true
        },
        Date:{
        	type: Date, 
        	default: Date.now()
        },
        candidates: [{type: Schema.Types.ObjectId, ref: 'Candidate' },]
});
module.exports = mongoose.model('votingBallot',votingBallotSchema);