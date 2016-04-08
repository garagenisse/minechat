// arguments: <file> <slackUrl> <words>
// example: "C:\\test.txt" "www..." "kalle kula"
var tailFile = process.argv[2];
var hook = process.argv[3];
var interrestedIn = process.argv[4];

// Analyzer
var Analyzer = require("./analyzer.js");
var analyzer = new Analyzer(interrestedIn);

// Slack
var Slack = require('node-slack');
var slack = new Slack(hook,{});
console.log("Slacking to: " + hook);

// Tail file
console.log("Tailing: " + tailFile);
ft = require('file-tail').startTailing(tailFile);
 
ft.on('line', function(line) {
    if(analyzer.interrestedIn(line)) {
        console.log(line);
        
        // Slack it
        slack.send({
            text: line,
            channel: '#general',
            username: 'Bot'
        });
    }
});