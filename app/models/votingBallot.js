var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var votingBallotSchema = new mongoose.Schema({
        Name: {
            type: String,
            required: true,
            unique: true
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
        candidates: [{
                counter : {   
                    type: Number,
                    default: 0
                },
                candidate: {
                    type: Schema.Types.ObjectId,
                    ref: 'Candidate'
                }
        }],
        Created : {
            type: Boolean,
            default: true
        },
        DateConfirm:{
            type: String
        },

        //candidates: [{type: Schema.Types.ObjectId, ref: 'Candidate' }]
});
module.exports = mongoose.model('votingBallot',votingBallotSchema);