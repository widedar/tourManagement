const mongoose =require('mongoose');

const destinationSchema=mongoose.Schema({
    
    
    Aller:String,
    arriver:String

});
module.exports = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);