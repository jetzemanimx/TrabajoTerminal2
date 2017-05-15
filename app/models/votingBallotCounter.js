var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var votingBallotCounterSchema = new mongoose.Schema({
        id: {
            type: Schema.Types.ObjectId,
            ref: 'votingBallot'
        },
        Candidate: [String]

});
module.exports = mongoose.model('votingBallotCounter',votingBallotCounterSchema);