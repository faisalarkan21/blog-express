

/*
  Instalasi Mongo!
*/
var mongo = require('mongoose');
var autoincrement = require('mongoose-auto-increment');

alamatDb = 'mongodb://localhost/node-login';

autoincrement.initialize(mongo.connect(alamatDb));


var skema = new mongo.Schema({

    name: String,
    email: String,
    password: String,
    date: { type: Date, default: Date.now },
    admin: Boolean
});

skema.plugin(autoincrement.plugin, {

    model: 'accounts',
    field: 'userId',
    startAt: 1


});

var akun = mongo.model('accounts', skema);





/*
  Exports Alamat
*/

exports.users = function (req, res) {

    akun.find({}, function (err, docs) {
        res.json(docs);
    });

};




exports.login = function (req, res, next) {

    res.render("user/login", {
        makan: "anda belum masuk"
    });

};


exports.membuktikan = function (req, res) {



    akun.findOne({ email: req.body.email, password: req.body.password }, function (err, data) {

        if (err) return console.log(err);

        if (!data)
            return console.log("data tidak sama");

        if (data.admin == false) {

            req.session.namaSession = data.name;
            req.session.admin = data.admin;
            console.log(req.session);
            res.redirect("profile");
            return;

        }

        console.log("disini admin");
        req.session.namaSession = data.name;
        req.session.admin = data.admin;

        //test
        console.log(req.session);

        res.redirect('dashboard');

    });
    // console.log(akun);
};


exports.profile = function (req, res, next) {

 

    res.render('user/profile', { nama: req.session.namaSession });

};



exports.dashboard = function (req, res) {

       akun.find({}, function (err, users) {

        // var userMap = {};


        // users.forEach(function (user) {

        //     console.log(user.email);


        // });

        //    res.render('list', users);

        res.render('user/admin/dashboard', { data: users });


    })

 


};



exports.daftar = function (req, res) {

    res.render('user/daftar');




};



exports.mendaftar = function (req, res) {


    var insertSatu = new akun({

        name: req.body.nama,
        email: req.body.email,
        password: req.body.pass,
        admin: false

    })


    insertSatu.save(function (err) {

        if (err)
            return console.log("Errrror dimasukin " + err);


        console.log("Berhasil gan!");
        res.redirect('login');

    })
}




exports.user = function (req, res) {

    akun.findOne({ userId: req.params.id }, function (err, user) {

        if (!err) {
            // res.json(data);


            res.render('user/admin/detail', { data: user })

        }

        else {

            console.log(err);

        }


    });


};

exports.keluar = function (req, res) {


    req.session.destroy();
   

    res.redirect('/');


};
