# Fluenture

Brings back [Fluture][]'s fluent method API, for the nostalgic developer.

## Usage

```js
import {resolve, reject} from 'fluture';
import {fluent} from 'fluenture';

fluent (resolve (42))
.map (x => x / 2)
.chain (x => reject (x + 21))
.swap ()
.fork (console.error, console.log)
```

## API

We're using the `Fluenture a b` type here to denote instances of Future
that were enhanced with a fluent method API. One can think of the
`Fluenture` type as a *subtype* of `Future`: any instances of it are also
instances of `Future`.

#### <a name="fluent" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L93">`fluent :: Future a b -⁠> Fluenture a b`</a>

Enhance a Future with the fluent method API.

This function is idempotent.

#### <a name="functional" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L107">`functional :: Future a b -⁠> Future a b`</a>

Strip a fluent Future (or "Fluenture") from its method API.

This function is idempotent.

#### <a name="pipe" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L132">`pipe :: (Future a b -⁠> c) -⁠> c`</a>

This function is equivalent to Fluture's built-in `pipe` function, with
once exception; If a Future is returned from the given function, it is
automatically wrapped using [`fluent`](#fluent), so as to keep the fluent
method chain intact.

Fluent [`pipe`](https://github.com/fluture-js/Fluture#pipe).

#### <a name="alt" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L146">`alt :: Fluenture a b ~> Future a b -⁠> Fluenture a b`</a>

Fluent [`alt`](https://github.com/fluture-js/Fluture#alt).

#### <a name="and" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L151">`and :: Fluenture a b ~> Future a b -⁠> Fluenture a b`</a>

Fluent [`and`](https://github.com/fluture-js/Fluture#and).

#### <a name="ap" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L156">`ap :: Fluenture a b ~> Future a (b -⁠> c) -⁠> Fluenture a c`</a>

Fluent [`ap`](https://github.com/fluture-js/Fluture#ap).

#### <a name="bimap" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L161">`bimap :: Fluenture a b ~> (a -⁠> c, b -⁠> d) -⁠> Fluenture c d`</a>

Fluent [`bimap`](https://github.com/fluture-js/Fluture#bimap).

#### <a name="both" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L166">`both :: Fluenture a b ~> Future a c -⁠> Fluenture a (Pair b c)`</a>

Fluent [`both`](https://github.com/fluture-js/Fluture#both).

#### <a name="cache" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L171">`cache :: Fluenture a b ~> () -⁠> Fluenture a b`</a>

Fluent [`cache`](https://github.com/fluture-js/Fluture#cache).

#### <a name="chain" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L176">`chain :: Fluenture a b ~> (b -⁠> Fluenture a c) -⁠> Fluenture a c`</a>

Fluent [`chain`](https://github.com/fluture-js/Fluture#chain).

#### <a name="chainRej" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L181">`chainRej :: Fluenture a b ~> (a -⁠> Fluenture c b) -⁠> Fluenture c b`</a>

Fluent [`chainRej`](https://github.com/fluture-js/Fluture#chainRej).

#### <a name="coalesce" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L186">`coalesce :: Fluenture a b ~> (a -⁠> c, b -⁠> c) -⁠> Fluenture d c`</a>

Fluent [`coalesce`](https://github.com/fluture-js/Fluture#coalesce).

#### <a name="lastly" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L191">`lastly :: Fluenture a b ~> Future a c -⁠> Fluenture a b`</a>

Fluent [`lastly`](https://github.com/fluture-js/Fluture#lastly).

#### <a name="map" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L196">`map :: Fluenture a b ~> (b -⁠> c) -⁠> Fluenture a c`</a>

Fluent [`map`](https://github.com/fluture-js/Fluture#map).

#### <a name="mapRej" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L201">`mapRej :: Fluenture a b ~> (a -⁠> c) -⁠> Fluenture c b`</a>

Fluent [`mapRej`](https://github.com/fluture-js/Fluture#mapRej).

#### <a name="race" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L206">`race :: Fluenture a b ~> Future a b -⁠> Fluenture a b`</a>

Fluent [`race`](https://github.com/fluture-js/Fluture#race).

#### <a name="swap" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L211">`swap :: Fluenture a b ~> () -⁠> Fluenture b a`</a>

Fluent [`swap`](https://github.com/fluture-js/Fluture#swap).

#### <a name="done" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L216">`done :: Fluenture a b ~> (b -⁠> c) -⁠> Cancel`</a>

Fluent [`done`](https://github.com/fluture-js/Fluture#done).

#### <a name="fork" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L221">`fork :: Fluenture a b ~> (a -⁠> c, b -⁠> d) -⁠> Cancel`</a>

Fluent [`fork`](https://github.com/fluture-js/Fluture#fork).

#### <a name="forkCatch" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L226">`forkCatch :: Fluenture a b ~> (Error -⁠> c, a -⁠> d, b -⁠> e) -⁠> Cancel`</a>

Fluent [`forkCatch`](https://github.com/fluture-js/Fluture#forkCatch).

#### <a name="promise" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L231">`promise :: Fluenture Error a ~> () -⁠> Promise Error a`</a>

Fluent [`promise`](https://github.com/fluture-js/Fluture#promise).

#### <a name="value" href="https://github.com/fluture-js/fluenture/blob/v1.0.0/index.js#L236">`value :: Fluenture a b ~> ((Nullable a, b) -⁠> c) -⁠> Cancel`</a>

Fluent [`value`](https://github.com/fluture-js/Fluture#value).

[Fluture]: https://github.com/fluture-js/Fluture
