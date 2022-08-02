class WebStorage {
  constructor( name , location ) {

    if ( !name ) throw new Error( 'WebStorage : 1 argument required, 0 argument passed.' );
    if ( !window.localStorage || !window.sessionStorage ) throw new Error( 'WebStorage : Can\'t create WebStorage, localStorage and sessionStorage are not available.' );
    location = location ? location.toLowerCase() : 'session';
    if ( ![ 'local' , 'localstorage' , 'session' , 'sessionstorage' ].includes( location ) ) location = 'session';

    var storage = ( location === 'local' || location === 'localstorage' ) ? 'localStorage' : 'sessionStorage';

    this.name = name;
    this.location = storage;
    storage = window[ storage ];
    this.storage = storage;
    this.data = this.json();
  }
  add( key , value ) {
    var storage = this.json();
    if ( key && typeof key === 'object' && key instanceof Object ) {
      for ( var variable in key ) {
        this.trigger( variable , storage[ variable ] , key[ variable ] );
        storage[ variable ] = key[ variable ];
      }
    } else if ( key && typeof key === 'string' ) {
      if ( value !== undefined ) {
        this.trigger( key , storage[ key ] , value );
        storage[ key ] = value;
      }
    }
    this.storage.setItem( this.name , JSON.stringify( storage ) );
    return this.json();
  }
  debug = false;
  delete() {
    var storage = this.json();
    for (var key in storage) {
      this.trigger( key , storage[ key ] );
      delete storage[ key ];
    }
    this.storage.removeItem( this.name );
    this.data = null;
    return this;
  }
  get( key ) {
    var storage = this.json();
    return key ? ( storage[ key ] || undefined ) : undefined;
  }
  has( key ) {
    var storage = this.json();
    return key ? ( storage[ key ] ? true : false ) : false;
  }
  json() {
    if ( !this.name ) throw new Error( 'WebStorage : \'NAME\' parameter not found. Try refreshing the page or reset Constructor.' );
    if ( !this.storage ) throw new Error( 'WebStorage : \'STORAGE\' parameter not found. Try refreshing the page or reset Constructor.' );
    if ( !this.location ) throw new Error( 'WebStorage : \'LOCATION\' parameter not found. Try refreshing the page or reset Constructor.' );
    if ( !this.onchangeevents ) throw new Error( 'WebStorage : \'ONCHANGEEVENTS\' parameter not found. Try refreshing the page or reset Constructor.' );

    var storage , length = 0;
    if ( this.storage.getItem( this.name ) ) {
      try {
        storage = JSON.parse( this.storage.getItem( this.name ) );
      } catch (e) {
        storage = {};
      }
    } else {
      storage = {};
    }
    delete storage.length;
    storage[ 'WebStorage' ] = ( ( Date.now ? Date.now() : new Date().getTime() ) / 1000 ).toFixed( 0 );

    for ( var key in storage ) length += 1;
    storage.length = length;
    this.storage.setItem( this.name , JSON.stringify( storage ) );
    this.length = length;
    this.data = storage;
    return storage;
  }
  length = 0;
  onchangeevents = [
    function( name , oldvalue , newValue ) {
      console.info( 'WebStorage' + '/' + this.location , '>' , this.name , '>' , name , ':' , oldvalue , '=>' , newValue );
    },
  ];
  onchange( callback ) {
    if ( Is.function( callback ) ) this.onchangeevents.push( callback );
    return this;
  }
  remove( key ) {
    var storage = this.json();
    if ( key && typeof key === 'object' && key instanceof Array ) {
      key.forEach(( item ) => {
        if ( item && typeof item === 'string') {
          this.trigger( item , storage[ item ] );
          delete storage[ item ];
        }
      });
    } else if ( key && typeof key === 'string' ) {
      key.split( ' ' ).forEach(( item ) => {
        if ( item ) {
          this.trigger( item , storage[ item ] );
          delete storage[ item ];
        }
      });
    }
    this.storage.setItem( this.name , JSON.stringify( storage ) );
    return this.json();
  }
  set( key , value ) {
    return this.add( key , value );
  }
  trigger( name , oldvalue , newvalue ) {
    this.onchangeevents.forEach(( item , i ) => {
      if ( i === 0 && !this.debug ) return;
      item.call( this , name , oldvalue , newvalue );
    });
    return this;
  }
}
