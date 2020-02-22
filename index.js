//. # Fluenture
//.
//. Brings back [Fluture][]'s fluent method API, for the nostalgic developer.
//.
//. ## Usage
//.
//. ```js
//. import {resolve, reject} from 'fluture';
//. import {fluent} from 'fluenture';
//.
//. fluent (resolve (42))
//. .map (x => x / 2)
//. .chain (x => reject (x + 21))
//. .swap ()
//. .fork (console.error, console.log)
//. ```

import {
  Future,
  alt,
  and,
  ap,
  bichain,
  bimap,
  both,
  cache,
  chain,
  chainRej,
  done,
  coalesce,
  fork,
  forkCatch,
  isFuture,
  lastly,
  map,
  mapRej,
  promise,
  race,
  swap,
  value
} from 'fluture/index.js';

function check(name, context) {
  if (!isFuture (context)) {
    throw new TypeError (
      'Fluenture#' + name + '() was invoked outside the context of a Future.'
    );
  }
}

function identity(x) {
  return x;
}

function nullaryDispatcher(wrap, f) {
  return function nullaryFluentureMethod() {
    check (f.name, this);
    return wrap (f (this));
  };
}

function unaryDispatcher(wrap, f) {
  return function unaryFluentureMethod(x) {
    check (f.name, this);
    return wrap (f (x) (this));
  };
}

function binaryDispatcher(wrap, f) {
  return function binaryFluentureMethod(x, y) {
    check (f.name, this);
    return wrap (f (x) (y) (this));
  };
}

function ternaryDispatcher(wrap, f) {
  return function ternaryFluentureMethod(x, y, z) {
    check (f.name, this);
    return wrap (f (x) (y) (z) (this));
  };
}

function isFluent(m) {
  return isFuture (m) && m.name === 'fluent';
}

//. ## API
//.
//. We're using the `Fluenture a b` type here to denote instances of Future
//. that were enhanced with a fluent method API. One can think of the
//. `Fluenture` type as a *subtype* of `Future`: any instances of it are also
//. instances of `Future`.

//# fluent :: Future a b -> Fluenture a b
//.
//. Enhance a Future with the fluent method API.
//.
//. This function is idempotent.
export function fluent(m) {
  if (!isFuture (m)) {
    throw new TypeError (
      'fluent() expects its first argument to be a valid Future.'
    );
  }
  return isFluent (m) ? m : new Fluenture (m);
}

//# functional :: Future a b -> Future a b
//.
//. Strip a fluent Future (or "Fluenture") from its method API.
//.
//. This function is idempotent.
export function functional(m) {
  if (!isFuture (m)) {
    throw new TypeError (
      'functional() expects its first argument to be a valid Future.'
    );
  }
  return isFluent (m) ? m.functional : m;
}

export function Fluenture(functional) {
  this.functional = functional;
}

Fluenture.prototype = Object.create (Future.prototype);
Fluenture.prototype.arity = 1;
Fluenture.prototype.name = 'fluent';
Fluenture.prototype._interpret = function Fluenture$interpret(rec, rej, res) {
  return this.functional._interpret (rec, rej, res);
};

//# pipe :: (Future a b -> c) -> c
//.
//. This function is equivalent to Fluture's built-in `pipe` function, with
//. once exception; If a Future is returned from the given function, it is
//. automatically wrapped using [`fluent`](#fluent), so as to keep the fluent
//. method chain intact.
//.
//. Fluent [`pipe`](https://github.com/fluture-js/Fluture#pipe).
Fluenture.prototype.pipe = function pipe(f) {
  check (pipe.name, this);
  var x = f (this);
  return isFuture (x) ? fluent (x) : x;
};

//# alt :: Fluenture a b ~> Future a b -> Fluenture a b
//.
//. Fluent [`alt`](https://github.com/fluture-js/Fluture#alt).
Fluenture.prototype.alt = unaryDispatcher (fluent, alt);

//# and :: Fluenture a b ~> Future a b -> Fluenture a b
//.
//. Fluent [`and`](https://github.com/fluture-js/Fluture#and).
Fluenture.prototype.and = unaryDispatcher (fluent, and);

//# ap :: Fluenture a b ~> Future a (b -> c) -> Fluenture a c
//.
//. Fluent [`ap`](https://github.com/fluture-js/Fluture#ap).
Fluenture.prototype.ap = unaryDispatcher (fluent, ap);

//# bichain :: Fluenture a b ~> (a -> Fluenture a c, b -> Fluenture a c) -> Fluenture a c
//.
//. Fluent [`bichain`](https://github.com/fluture-js/Fluture#bichain).
Fluenture.prototype.bichain = binaryDispatcher (fluent, bichain);

//# bimap :: Fluenture a b ~> (a -> c, b -> d) -> Fluenture c d
//.
//. Fluent [`bimap`](https://github.com/fluture-js/Fluture#bimap).
Fluenture.prototype.bimap = binaryDispatcher (fluent, bimap);

//# both :: Fluenture a b ~> Future a c -> Fluenture a (Pair b c)
//.
//. Fluent [`both`](https://github.com/fluture-js/Fluture#both).
Fluenture.prototype.both = unaryDispatcher (fluent, both);

//# cache :: Fluenture a b ~> () -> Fluenture a b
//.
//. Fluent [`cache`](https://github.com/fluture-js/Fluture#cache).
Fluenture.prototype.cache = nullaryDispatcher (fluent, cache);

//# chain :: Fluenture a b ~> (b -> Fluenture a c) -> Fluenture a c
//.
//. Fluent [`chain`](https://github.com/fluture-js/Fluture#chain).
Fluenture.prototype.chain = unaryDispatcher (fluent, chain);

//# chainRej :: Fluenture a b ~> (a -> Fluenture c b) -> Fluenture c b
//.
//. Fluent [`chainRej`](https://github.com/fluture-js/Fluture#chainRej).
Fluenture.prototype.chainRej = unaryDispatcher (fluent, chainRej);

//# coalesce :: Fluenture a b ~> (a -> c, b -> c) -> Fluenture d c
//.
//. Fluent [`coalesce`](https://github.com/fluture-js/Fluture#coalesce).
Fluenture.prototype.coalesce = binaryDispatcher (fluent, coalesce);

//# lastly :: Fluenture a b ~> Future a c -> Fluenture a b
//.
//. Fluent [`lastly`](https://github.com/fluture-js/Fluture#lastly).
Fluenture.prototype.lastly = unaryDispatcher (fluent, lastly);

//# map :: Fluenture a b ~> (b -> c) -> Fluenture a c
//.
//. Fluent [`map`](https://github.com/fluture-js/Fluture#map).
Fluenture.prototype.map = unaryDispatcher (fluent, map);

//# mapRej :: Fluenture a b ~> (a -> c) -> Fluenture c b
//.
//. Fluent [`mapRej`](https://github.com/fluture-js/Fluture#mapRej).
Fluenture.prototype.mapRej = unaryDispatcher (fluent, mapRej);

//# race :: Fluenture a b ~> Future a b -> Fluenture a b
//.
//. Fluent [`race`](https://github.com/fluture-js/Fluture#race).
Fluenture.prototype.race = unaryDispatcher (fluent, race);

//# swap :: Fluenture a b ~> () -> Fluenture b a
//.
//. Fluent [`swap`](https://github.com/fluture-js/Fluture#swap).
Fluenture.prototype.swap = nullaryDispatcher (fluent, swap);

//# done :: Fluenture a b ~> (b -> c) -> Cancel
//.
//. Fluent [`done`](https://github.com/fluture-js/Fluture#done).
Fluenture.prototype.done = unaryDispatcher (identity, done);

//# fork :: Fluenture a b ~> (a -> c, b -> d) -> Cancel
//.
//. Fluent [`fork`](https://github.com/fluture-js/Fluture#fork).
Fluenture.prototype.fork = binaryDispatcher (identity, fork);

//# forkCatch :: Fluenture a b ~> (Error -> c, a -> d, b -> e) -> Cancel
//.
//. Fluent [`forkCatch`](https://github.com/fluture-js/Fluture#forkCatch).
Fluenture.prototype.forkCatch = ternaryDispatcher (identity, forkCatch);

//# promise :: Fluenture Error a ~> () -> Promise Error a
//.
//. Fluent [`promise`](https://github.com/fluture-js/Fluture#promise).
Fluenture.prototype.promise = nullaryDispatcher (identity, promise);

//# value :: Fluenture a b ~> ((Nullable a, b) -> c) -> Cancel
//.
//. Fluent [`value`](https://github.com/fluture-js/Fluture#value).
Fluenture.prototype.value = unaryDispatcher (identity, value);

//. [Fluture]: https://github.com/fluture-js/Fluture
