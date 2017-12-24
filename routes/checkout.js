var express = require('express');
var router = express.Router();
var braintree = require('braintree');

router.post('/', function(req, res, next) {
  var gateway = braintree.connect({
    environment: braintree.Environment.Production,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'fzrwk2896gy368kg',
    publicKey: '387mnc3ksqbd9m2b',
    privateKey: '8ec74bd781550f6b94c5b4155fe80c1b'
  });

  // Use the payment method nonce here
  var nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  console.log(nonceFromTheClient,"ddd");
  var newTransaction = gateway.transaction.sale({
    amount: '0.01',
    
    paymentMethodNonce: nonceFromTheClient,
    options: {
      first_name:'viswa',
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, function(error, result) {
      if (result) {
        console.log(result);
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});

module.exports = router;