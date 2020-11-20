# json-nginx

This is a small javascript snippet that will convert a specifically formatted JSON object/file into a (hopefully) working nginx-config.

*Please note that this is not a finished project. It will be published on NPM when it's done.*
This project is currently ready for early pre-beta testing. Feel free to test this library out, and give feedback!

# Usage
See "example" folder.

## What is a 'specifically formatted JSON object'?

Yeah, so this is where it gets tricky. While the regular nginx config *kinda* resembles JSON, there's a key difference: Nginx configs allow multiple keys (or directives) to be defined after each other, which JSON doesn't. Read below to see how this library overcomes that problem:

Rule #1: Multiple directives aren't possible in JSON, so instead we put their values into an array.
This: 
``` 
"listen": ["443 ssl", "[::]:443 ssl"]
```
Will convert into:
``` 
listen: 443 ssl;
listen: [::]:443 ssl;
```

In other words, values in an array will be added as seperate directives containing the different values.

Rule #2: Nginx blocks are defined as an object containing a "data" object.
This:
``` 
"server": {
  "data": { } 
}
```
Will convert into:
``` 
server { }
```

Rule #2.1: If you need arguments for a block, add these in an `args` key.
Example:
``` 
"location": {
  "args": "/",
  "data": { } 
}
```
Will convert into:
``` 
location / { }
```
Rule #2.2: If you need multiple server/location blocks, just do the same as in Rule #1:
```
"location": [ 
  {
  "args": "/",
  "data": { }
  },
  {
  "args": "/home",
  "data": { }
  },
]
```
Will convert into:
```
location / { }
location /home { }
```
Keep these strict rules, and you should be fine :)
If you want to convert your existing nginx configs into this format, please see [nginx-json](https://github.com/muffeeee/nginx-json)
