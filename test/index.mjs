/* eslint no-whitespace-before-property:0 */

import * as fluture from 'fluture/index.js';
import {anyFuture} from 'fluture/test/arbitraries.js';
import {equality, equivalence} from 'fluture/test/assertions.js';
import test from 'oletus';
import {Fluenture, fluent, functional} from '../index.js';
import jsv from 'jsverify';

function f(x) {
  return {f: x};
}

function g(x) {
  return {g: x};
}

function prop(description) {
  equality (arguments.length) (1);
  return function(fn) {
    equality (arguments.length) (1);
    return test (description, () => {
      return jsv.assert (jsv.forall (anyFuture, anyFuture, fn));
    });
  };
}

function testInvalidContext(name) {
  test (`Fluent#${name} throws when called on a non-future`, ({throws}) => {
    throws (() => Fluenture.prototype[name] .call (null), new TypeError (
      `Fluenture#${name}() was invoked outside the context of a Future.`
    ));
  });
}

['alt', 'and', 'ap', 'lastly', 'race'] .forEach (name => {
  testInvalidContext (name);
  prop (`fluent (m) .${name} (o) = ${name} (o) (m)`) ((m, o) => (
    equivalence (fluent (m) [name] (o)) (fluture [name] (o) (m))
  ));
});

['cache', 'swap'] .forEach (name => {
  testInvalidContext (name);
  prop (`fluent (m) .${name} () = ${name} (m)`) ((m) => (
    equivalence (fluent (m) [name] ()) (fluture [name] (m))
  ));
});

['chain', 'chainRej', 'map', 'mapRej'] .forEach (name => {
  testInvalidContext (name);
  prop (`fluent (m) .${name} (f) = ${name} (f) (m)`) ((m) => (
    equivalence (fluent (m) [name] (f)) (fluture [name] (f) (m))
  ));
});

['bimap', 'coalesce'] .forEach (name => {
  testInvalidContext (name);
  prop (`fluent (m) .${name} (f, g) = ${name} (f) (g) (m)`) ((m) => (
    equivalence (fluent (m) [name] (f, g)) (fluture [name] (f) (g) (m))
  ));
});

testInvalidContext ('pipe');

prop ('fluent (m) .pipe (f) = f (fluent (m)) where f :: Future -> AnyNonFuture') ((m) => {
  return equality (fluent (m) .pipe (f)) (f (fluent (m)));
});

prop ('fluent (m) .pipe (f) = fluent (f (fluent (m))) where f :: Future -> Future') ((m) => {
  return equality (fluent (m) .pipe (f)) (fluent (f (fluent (m))));
  function f(x) {
    return fluture.resolve (x.constructor.name);
  }
});

testInvalidContext ('promise');

prop ('fluent (m) .promise () = promise (m)') ((m) => (
  equality (fluent (m) .promise ()) (fluture.promise (m))
));

testInvalidContext ('done');

prop ('String (fluent (m) .done (f)) = String (done (f) (m))') ((m) => (
  equality (String (fluent (m) .done (f))) (String (fluture.done (f) (m)))
));

testInvalidContext ('value');

prop ('typeof (fluent (m) .value) = typeof (value)') ((m) => (
  equality (typeof fluent (m) .value) (typeof fluture.value)
));

testInvalidContext ('fork');

prop ('String (fluent (m) .fork (f, g)) = String (fork (f) (g) (m))') ((m) => (
  equality (String (fluent (m) .fork (f, g))) (String (fluture.fork (f) (g) (m)))
));

testInvalidContext ('forkCatch');

prop ('String (fluent (m) .forkCatch (f, g, h)) = String (forkCatch (f) (g) (h) (m))') ((m) => (
  equality (String (fluent (m) .forkCatch (f, g, f))) (String (fluture.forkCatch (f) (g) (f) (m)))
));

prop ('fluent (fluent (m)) = fluent (m)') ((m) => (
  equivalence (fluent (fluent (m))) (fluent (m))
));

prop ('fluent (m) = m') ((m) => (
  equivalence (fluent (m)) (m)
));

test ('fluent throws when given a non-future', ({throws}) => {
  throws (() => fluent (null), new TypeError (
    'fluent() expects its first argument to be a valid Future.'
  ));
});

prop ('functional (fluent (m)) = m') ((m) => (
  equivalence (functional (fluent (m))) (m)
));

prop ('functional (m) = m') ((m) => (
  equivalence (functional (m)) (m)
));

test ('functional throws when given a non-future', ({throws}) => {
  throws (() => functional (null), new TypeError (
    'functional() expects its first argument to be a valid Future.'
  ));
});
