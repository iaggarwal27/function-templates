/**
 *  Subscribe to updates
 *
 *  Returns JSON
 *  {
 *    "success": boolean,
 *    "error": string // not present if success is true
 *  }
 */

const crypto = require('crypto');

function sendSubscribedNotification(notifyService, identity) {
  notifyService.notifications
    .create({
      identity,
      body: 'Thank you for subscribing. Reply STOP to unsubscribe at any time.',
    })
    .catch((err) => console.log(err));
}

exports.handler = (context, event, callback) => {
  const client = context.getTwilioClient();
  const verifyService = client.verify.services(context.VERIFY_SERVICE_SID);
  const notifyService = client.notify.services(
    context.BROADCAST_NOTIFY_SERVICE_SID
  );

  const response = new Twilio.Response();
  response.appendHeader('Content-Type', 'application/json');

  const { to, code } = event;
  const identity = crypto.createHash('sha256').update(to).digest('hex');
  const tags = typeof event.tags === 'object' ? event.tags : [event.tags];

  verifyService.verificationChecks
    .create({ to, code })
    // eslint-disable-next-line
    .then((check) => {
      if (check.status === 'approved') {
        notifyService.bindings
          .create({
            identity,
            bindingType: 'sms',
            address: to,
            tag: tags,
          })
          .then(() => {
            sendSubscribedNotification(notifyService, identity);

            response.setStatusCode(200);
            response.setBody({
              success: true,
            });
            return callback(null, response);
          })
          .catch((error) => {
            console.error(error.message);
            response.setStatusCode(400);
            response.setBody({
              success: false,
              error: error.message,
            });
            return callback(null, response);
          });
      } else {
        console.error('Incorrect token.');
        response.setStatusCode(401);
        response.setBody({
          success: false,
          error: 'Incorrect token.',
        });
        return callback(null, response);
      }
    })
    .catch((error) => {
      console.error(error);
      response.setStatusCode(error.status);
      response.setBody({
        success: false,
        error: error.message,
      });
      return callback(null, response);
    });
};
