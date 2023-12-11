- Test current backend with the esp server - check if everything works. There will be necessity to do small changes in the esp code - for now there are no
  sensorIds send with the request. I think good idea is to think about api-secret, which will be sent with the request from the esp. It will be safer if not
  everyone is able to connect with our backend and send dummy data.
- Openapi setup for frontend.

Minor tasks:

- Change console logs inside such files as seeders to logger.
- If possible add event.apply() instead of using eventBus.
