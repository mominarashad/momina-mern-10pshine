const pino=require('pino')
const PinoPretty = require('pino-pretty')

const logger=new pino({
    transport:{
        target:'pino-pretty',
        options:{
            colorize:true,
            ignore:"pid,hostname",
            translateTime: "SYS:standard",
        },
    },
    level:process.env.LOG_LEVEL || 'info'
});
module.exports=logger