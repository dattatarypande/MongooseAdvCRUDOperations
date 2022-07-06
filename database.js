// init

const mongoose=require('mongoose');
const assert=require('assert');
const db_url=process.env.DB_URL;
// connection setup

mongoose.connect(db_url,
    { useNewUrlParser:true,useUnifiedTopology:true, useCreateIndex:true
    },
    function(err,link) {
        // check error 
        assert.strictEqual(err,null,'Db connection fail..');
        // ok
        console.log('DB connection success');
        console.log(link);
    }
)