

/*
    Instalasi mongo untuk artikel
*/


var mongo = require ('./config/mongo-config')
var autoincrementPosting = require('mongoose-auto-increment');

autoincrementPosting.initialize(mongo);

var skema = new mongo.Schema({

    judul:String,
    artikel: String,
    date: {type:Date, default:Date.now},
    setuju: Boolean


});


skema.plugin(autoincrementPosting.plugin,{

    model:'artikel',
    field: 'artkelId',
    startAt:1

});

var postArtikel = mongo.model('artikel', skema);






exports.index = function (req, res,next) {


 
  res.render('index');

};

exports.posting = function (req,res){

	  var insertArtikel = new postArtikel({

        judul: req.body.judul,
        artikel: req.body.coba,      
        setuju: true

    });

    insertArtikel.save (function(err){
      if (err)
        return console.log('errrorr mass!'+ err);

        console.log("berhasil!");
      

    });

  res.redirect('/');


}


exports.semuaArtikel = function (req,res){

    
}

