exports.Query = function(db,query){
var rowss ;
db.query(query, function(err, rows, fields) {
//console.log
  if(!err){
  	console.log( demo(rows));
  // rowss =  demo(rows);
  // demo(rows);
  rowss ='puta madre';

  }else {
  	console.log('mal');
  	rowss =  -1;
   // res.status(400);  res.send(err);  throw err;
  }

  });
return rowss;
}

function demo(x){
	return x;
}


module.exports.Query = function(callback,sql,db) {
    db.query(sql, function(err, rows, fields) {
        
        if (!err)
            callback(rows);
        else
            callback(null);
    });

}

module.exports.Error = function (res,error){
	 res.status(400);  res.send(err);  throw err;
	 console.log(err);  
}