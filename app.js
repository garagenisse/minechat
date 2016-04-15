// Environment variables (parameters)
var tailFile = process.env.FILE;
var hook = process.env.HOOK;
var interrestedIn = process.env.INTERRESTEDIN;

// Logger
var EventLogger = require('node-windows').EventLogger;
var log = new EventLogger('Minechat');
log.info("Minechat slacking file: " + tailFile + " to hook: " + hook);

// Analyzer
var Analyzer = require("./analyzer.js");
var analyzer = new Analyzer(interrestedIn);

// Slack
var Slack = require('node-slack');
var slack = new Slack(hook,{});

// Tail file
ft = require('file-tail').startTailing(tailFile);
 
ft.on('line', function(line) {
    if(analyzer.interrestedIn(line)) {
        
        // Slack it
        slack.send({
            text: line,
            channel: '#general',
            username: 'Bot'
        });
    }
});