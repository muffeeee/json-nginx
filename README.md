# nginx-json

This is a small javascript snippet that will convert a specifically formatted JSON object/file into a fully working NginX-config.

## Define 'specifically formatted JSON object'

Yeah, so this is where it gets tricky.
The entire config follows a small set of rules.

Rule #1: Multiple directives aren't possible in JSON, so instead we put their values into an array.
This: 
``` "listen": ["443 ssl", "[::]:443 ssl"]'
```
Will convert into:
``` listen: 443 ssl;
listen: [::]:443 ssl;
```

In other words, values in an array will be added as seperate directives containing the different values.

Rule #2: Nginx blocks are defined as an array containing an object containing a "data" object.
This:
``` "server": [ {
"data": { } } ]
```
Will convert into:
``` server { }
```

Rule #2.1: If you need arguments for a block, add these in an `args` key.
Example:
``` "location": [ {
  "args": "/",
  "data": { } ] }
```
Will convert into:
``` location / { }
```

Keep these strict rules, and you should be fine :)
