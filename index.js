const CronJob = require('cron').CronJob;
const Joi = require('joi');

const jobScheme = Joi.object({
    chain: Joi.boolean().default(true),
    delay: Joi.number().when('chain', { is: true, then: Joi.number().required() }),
    crontime: Joi.string().when('chain', { is: false, then: Joi.string().required() }),
    timezone: Joi.string().default('America/New_York'),
    onComplete: Joi.func(),
    run: Joi.func().required(),
    name: Joi.string()
});

class ChainJob {

    constructor(delay, run, onComplete) {
        this.on = false;
        this.delay = delay;
        this.run = run;
        this.onComplete = onComplete;

        this.start();

        return this;
    }

    async start() {
        if (this.on === false) {
            this.on = true;

            while (this.on) {

                await this.run();

                if (this.onComplete) {
                    await this.onComplete();
                }

                await wait(this.delay);
            }
        }
        else {
            //already running
        }
    }

    stop() {
        this.on = false;
    }
}

function wait(s) {
    return new Promise(function (resolve, reject) {
        let ms = s * 1000;
        setTimeout(() => { resolve() }, ms);
    });
}

const schedule = (dirtyJob) => {
    try {

        const { error, value } = jobScheme.validate(dirtyJob);

        let job;

        if (error) {
            throw error;
        }
        else if (value.chain) {
            job = new ChainJob(value.delay, value.run, value.onComplete);
        }
        else {
            job = new CronJob(value.crontime, value.run, value.onComplete, true, value.timezone);
        }

        return {
            display: {
                name: value.name,
                crontime: value.crontime,
                timezone: value.timezone
            },
            ref: job
        }

    }
    catch (e) {
        console.error(`Job Failed to run`)
        console.error(e)
    }
}

module.exports = { schedule };