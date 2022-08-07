# WebStorage
Manages local or session Storage values as an Object.

## Initialization
WebStorage can be initalised as a simple class operator.
```javascript
const storage = new WebStorage( key , location );
// key: name of key to be used in storage
// string

// location: type of storage where key is placed
// string : [ 'session' , 'sessionStorage' , 'local' , 'localStorage' ]
// default - 'session'
```
If storage key doesn't exists, new storage key will be formed. And if the key already exists it will overlap existing properties.\
\
Note: Storage key will be addressed as storage from here onwards.

## Usage and methods


### add
Adds a new key value pair to the storage.\
Can be passed as either string `( key , value )` pair or as an object.
```javascript
storage.add( key , value );
// or
storage.add({key1: value1, key2: value2,...});
```

### set
Works same as add method.
```javascript
storage.set( key , value );
```
Added by taking `localStorage.setItem();` in mind.

### get
Get the key's value from storage.
```javascript
storage.get( key );
// return key value
```
### has
Check weather a key is present in storage or not.
```javascript
storage.has( key );
// return true or false based on result
```
### remove
Remove a key from storage.
```javascript
storage.remove( key );
```

### onchange
Triggers when there is a change in value of keys.\
Warning: Triggers for all keys at once.
```javascript
storage.onchange( callback );
// on callback ( key , oldvalue , newvalue ) will be passed to function as arguments
```

### delete
Delete the storage from localStorage or sessionStorage.
```javascript
storage.delete();
```
After deleting key, it can be reinitialized by `storage.add();`.

### debug
Log changes done in storage.
```javascript
storage.debug = true;// default false
```
