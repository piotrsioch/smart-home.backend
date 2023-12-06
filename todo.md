The tasks have been arranged in the correct chronological order except for one - I don't know when it will be
good time for writing queries for sensors. There will have to be new method in generic repo created, because for each repo in the sensors
microservice paginated list with all results should be added. Also it has to be created method for getting the newest record in the database - it will have sense for the
light, dht and maybe some more.

- Finish setting up sensors. What I mean is to continue tasks connected with sensors. For now there are two sensors left - reedSwitch and light.
  For now the only thing which needs to be done is to focus on adding data - queries for them will be created later (don't know exactly when, but in the nearest future)
- Test current backend with the esp server - check if everything works. There will be necessity to do small changes in the esp code - for now there are no
  sensorIds send with the request. I think good idea is to think about api-secret, which will be sent with the request from the esp. It will be safer if not
  everyone is able to connect with our backend and send dummy data.
- Add `customRpcException`. There will be necessity to reformat all command
  and spec files - but it won't be a lot of work. In the same pr there will be added customException
  pipe and get rid of getting `Internal Error` each time exception occurs
- Setup notifications microservice, with first dummy model, entity and so on.
  It need to be done before adding emit method in CustomClientProxy, because on the same branch I will start emitting
  infra event from sensors to notifications microservice.
- Add `emit` method in `CustomClientProxy`. Test if two sensor-connected events (from smoke sensor and pir sensor) are being emitted.
- Setup twilio in notifications microservice. Start sending messages on new sensor-event.

After that I think it will be appropriate time to start making frontend. I expect these tasks won't take me more than 2 weeks, but to be honest I would like to
finish them in less than 2 weeks - in two weeks I wanna go to the thesis advisor and show him the work I've done. There is no need to create beautiful site in the beginning,
it just has to show functionalities in the app.
