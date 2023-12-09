- Test current backend with the esp server - check if everything works. There will be necessity to do small changes in the esp code - for now there are no
  sensorIds send with the request. I think good idea is to think about api-secret, which will be sent with the request from the esp. It will be safer if not
  everyone is able to connect with our backend and send dummy data.
- Setup notifications microservice, with first dummy model, entity and so on.
  It needs to be done before adding emit method in CustomClientProxy, because on the same branch I will start emitting
  infra event from sensors to notifications microservice.
- Add `emit` method in `CustomClientProxy`. Test if two sensor-connected events (from smoke sensor and pir sensor) are being emitted.
- Setup twilio in notifications microservice. Start sending messages on new sensor-event.
- Openapi setup for frontend.

Minor tasks:

- Change console logs inside such files as seeders to logger.
