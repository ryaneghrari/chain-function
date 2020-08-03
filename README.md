# schedule-function 

## About
`schedule-function` allows you to rerun a function once it completes. You can also pass a delay (in seconds) to wait before re-running the function. Lastly you can pass an `onComplete` function which will run each time the `run` function is completed. 

## Quick start

1. `npm i schedule-function`
2. `const fschedule = require('schedule-function');`
3. Call schedule function you want to continuously run.

```javascript
const fscheduler = require('schedule-function');

fscheduler.schedule({
	delay: 10, //seconds
	run: () => { console.log('function I want to run continuously') },
})
```

## Help
Contact [Ryan Eghrari](mailto:ryan@raidoninc.com), if you have any problems. 
