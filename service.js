// require
var Service = require('node-windows').Service;
var Config = require('config');
var Path = require('path');

switch(process.argv[2]) {
    case "--add": {
        
        var hook = Config.get('Settings.slackHook');
        var file = Path.join(process.env.APPDATA, "/.minecraft/logs/latest.log");
        var interrestedIn = Config.get("Settings.interrestedIn");
        
        // Create a new service object 
        var svc = new Service({
        name:'Minechat',
        description: 'Parental spy of Minecraft chatlog',
        script: '.\\app.js',
        env: [{
            name: "HOOK",
            value: hook 
        },
        {
            name: "FILE",
            value: file 
        },
        {
            name: "INTERRESTEDIN",
            value: interrestedIn 
        }]
        });

        svc.install();        
        console.log("Done installing");
    }
    break;
    case "--remove": {
        var svc = new Service({
        name:'Minechat',
        description: 'Parental spy of Minecraft chatlog',
        script: '.\\app.js'
        });
        svc.uninstall();
        console.log("Done uninstalling");
    }
    break;
    default: {
        console.log("Please specify --add or --remove to modify service");
    }
}
 
// Listen for the "install" event, which indicates the 
// process is available as a service. 
svc.on('install',function(){
  svc.start();
  process.exit();
});
 
svc.on('uninstall',function(){
  process.exit();
});
