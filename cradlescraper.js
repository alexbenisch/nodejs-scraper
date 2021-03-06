var nodeio = require('node.io');
var cradle = require('cradle');
var db = new(cradle.Connection)('http://couch.com', 5984, {
      cache: true,
      raw: false
  }).database('exampleDB');
var methods = {
    input: true,
    run: function() {
        this.getHtml('http://example.com', function(err, $) {

            //Handle any request / parsing errors
            if (err) this.exit(err);

            var address = [], name = [], output = [];
            $('span.address').each(function(span) {
                address.push(span.text); 
            });
            $('td.name').each(function(td) {
                name.push(td.text); 
            });    
            for(i=0;i<=address.length;i++){
                output.push(name[i],address[i]);
                db.save(name[i], {
                    name: name[i],
                    address: address[i] 
                }, function (err, res) {
                    if (err) {
                        // Handle error
                    } else {
                        // Handle success
                }
                });
            }(console.log('Success !' + " " + new Date()));
            
            

        });
    }
}
exports.job = new nodeio.Job(methods);
