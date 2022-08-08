/*
    Visit https://www.projset.com
    Projset - WebStorage
    Version - 1.4.0
    MIT License
*/

// Constructor class
class WebStorage {
    name = null;
    isLocal = false;
    debugMode = false;
    static #eventList = [
        function( name , old , value ) {
            console.info( "WebStorage:" , this.#location , ">" , this.#name , ">" , name , ":" , old , "=>" , value );
        }
    ];
    static #isLocal = false;
    static #location = "sessionStorage";
    static #name = null;
    constructor( name , setAsLocal ) {
        if ( !name || typeof name !== "string" ) {
            throw new Error( "WebStorage: 'name' for storage is not defined." );
        }
        if ( !window.localStorage || !window.sessionStorage ) {
            throw new Error( "WebStorage: failed to create 'WebStorage', either localStorage or sessionStorage or both is not available." );
        }
        this.name = name;
        this.isLocal = !!setAsLocal;
        WebStorage.#isLocal = !!setAsLocal;
        WebStorage.#location = !setAsLocal ? "sessionStorage" : "localStorage";
        WebStorage.#name = name;
        WebStorage.#getdata();
    }
    add( data , value ) {
        return this.set( data , value );
    }
    set( data , value ) {
        WebStorage.#setNewData( data , value );
        return this;
    }
    remove( keys ) {
        WebStorage.#removeKeys( keys );
        return this;
    }
    setDebug( bool ) {
        this.debugMode = !!bool;
        return this;
    }
    static #basedata() {
        return { WebStorage: ( ( Date.now ? Date.now() : new Date().getTime() ) / 1000 ).toFixed( 0 ) };
    }
    static #getdata() {
        this.#reassign();
        var data;
        if ( this.#has() ) {
            try {
                data = JSON.parse( window[ this.#location ].getItem( this.#name ) );
                data.WebStorage = ( ( Date.now ? Date.now() : new Date().getTime() ) / 1000 ).toFixed( 0 );
            } catch (e) {
                data = this.#basedata();
            }
        } else {
            data = this.#basedata();
        }
        this.#setdata( data );
        return data;
    }
    static #has() {
        return window[ this.#location ].getItem( this.#name ) !== null;
    }
    static #reassign() {

        if ( this.#isLocal ) {
            if ( window.sessionStorage.getItem( this.#name ) !== null ) {
                window.sessionStorage.removeItem( this.#name );
            }
            if ( window.localStorage.getItem( this.#name ) === null ) {
                this.#setdata( this.#basedata() );
            }
        } else {
            if ( window.localStorage.getItem( this.#name ) !== null ) {
                window.localStorage.removeItem( this.#name );
            }
            if ( window.sessionStorage.getItem( this.#name ) === null ) {
                this.#setdata( this.#basedata() );
            }
        }
    }
    static #removeKeys( key ) {
        const log = this.#getdata();
        if ( key && typeof key === "object" && key instanceof Array ) {
            key.forEach(( item ) => {
                if ( item && typeof item === "string" ) {
                    this.#trigger( item , log[ item ] );
                    delete log[ item ];
                }
            });
        } else if ( key && typeof key === "string" ) {
            key.split( " " ).forEach(( item ) => {
                if ( item ) {
                    this.#trigger( item , log[ item ] );
                    delete log[ item ];
                }
            });
        }
        this.#setdata( log );
    }
    static #setdata( data ) {
        data = data && data instanceof Object ? data : this.#basedata();
        window[ this.#location ].setItem( this.#name , JSON.stringify( data ) );
    }
    static #setNewData( data , value ) {
        const log = this.#getdata();
        if ( data ) {
            if ( data instanceof Object ) {
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.#trigger( key , log[ key ] , data[ key ] );
                        log[ key ] = data[ key ];
                    }
                }
            } else if ( typeof data === "string" ) {
                if ( value === undefined ) {
                    throw new Error( "WebStorage: data 'value' can't be undefined.");
                }
                this.#trigger( data , log[ data ] , value );
                log[ data ] = value;
            }
        }
        this.#setdata( log );
    }
    static #trigger( key , old , value ) {
        console.log(this.);
    }
}
