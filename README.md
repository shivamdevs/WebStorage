# WebStorage
Manages local or session Storage values as an Object.

## Initialization
```javascript
const storage = new WebStorage( key , location );
// key: name of key to be used in storage
// string

// location: type of storage where key is placed
// string : [ 'session' , 'sessionStorage' , 'local' , 'localStorage' ]
// default - 'session'
```
