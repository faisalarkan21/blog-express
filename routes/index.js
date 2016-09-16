
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', {title:"asassaasyeah"});
// });




exports.index = function (req, res,next) {



	// if (!req.session.admin && !req.session.namaSession)
	// 	return res.render("index", { nama: "", session: req.session.namaSession, judulPosting : "Judul Dari Express" , isiPosting : "Isi yeah" });

	// if (req.session.namaSession && req.session.admin == false)
	// 	return res.render("index", { nama: "User : " + req.session.namaSession, session: req.session.namaSession, judulPosting : "Judul Dari Express" , isiPosting : "Isi yeah"  });

	// if (req.session.admin == true)
	// 	return res.render("index", { nama: "Admin : " + req.session.namaSession, admin: req.session.admin, session: req.session.namaSession, judulPosting : "Judul Dari Express" , isiPosting : "Isi yeah"  });
  console.log(req.session);
  res.render('index');

};


