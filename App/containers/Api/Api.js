app.post('/payments', function(req, res){
  console.log('payment request..', req.body)
  var token = req.body.stripeToken; // Using Express
//Charge the user's card:
 var charge = stripe.charges.create({
   amount: 444,
   currency: "usd",
   description: "test charge",
   source: token,
 }, function(err, charge) {
  if(err) {
   console.log(err);
   res.send('Failed')
  } else {
    console.log('success payment', charge);
    res.send(charge)
  }
 });
});