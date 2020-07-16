const mongoose  = require('mongoose');

module.exports = mongoose.model("Product",{

    prodTitle,
    price,
    prodPicture,
    description,
    owenerEmail,

})