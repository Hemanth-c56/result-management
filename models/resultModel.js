import mongoose from "mongoose"

const resultSchema = new mongoose.Schema({
    roll: {
        type: Number,
        required: [true, 'A student must have a roll number!'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'A student must have a name!'],
    },
    semester: {
        type: Number,
        required: [true, 'Semester is mandatory']
    },
    CSA: {
        type: Number,
        default: 0,
        maxLength: [100 , 'marks cannot exceed 100'],
        minLength: [0, 'marks should be greater than 0']
    },
    DBMS: {
        type: Number,
        default: 0,
        maxLength: [100 , 'marks cannot exceed 100'],
        minLength: [0, 'marks should be greater than 0']
    },
    MFCS: {
        type: Number,
        default: 0,
        maxLength: [100 , 'marks cannot exceed 100'],
        minLength: [0, 'marks should be greater than 0']
    },
    PS: {
        type: Number,
        default: 0,
        maxLength: [100 , 'marks cannot exceed 100'],
        minLength: [0, 'marks should be greater than 0']
    },
    DS: {
        type: Number,
        default: 0,
        maxLength: [100 , 'marks cannot exceed 100'],
        minLength: [0, 'marks should be greater than 0']
    },
    QMLR: {
        type: Number,
        default: 0,
        maxLength: [100 , 'marks cannot exceed 100'],
        minLength: [0, 'marks should be greater than 0']
    }
}, 
{
    toJSON : { virtuals: true},
    toObject: {virtuals: true}
});

resultSchema.virtual('Result').get(function(){
    var avg = (this.CSA + this.DBMS + this.DS + this.MFCS + this.PS + this.QMLR)/6;
    if(avg > 30){
        return "PASS"
    }
    else{
        return "FAIL"
    }
})



const Result = mongoose.model('Result', resultSchema)

export default Result