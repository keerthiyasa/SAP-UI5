/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/LoaderExtensions"],function(n){"use strict";var e={};e.load=function(n){n=n||{};n.async=true;return e._load(n)};var r=null;var i;var a;var t;function s(n){i=n;a=null;t=null}Object.defineProperty(sap.ui,"versioninfo",{configurable:true,enumerable:true,get:function(){return i},set:function(n){s(n)}});e._load=function(a){if(typeof a!=="object"){a={library:a}}a.async=a.async===true;a.failOnError=a.failOnError!==false;if(!i){if(a.async&&r instanceof Promise){return r.then(function(){return e._load(a)})}var t=function(n){r=null;if(n===null){return undefined}s(n);return e._load(a)};var o=function(n){r=null;throw n};var f=n.loadResource("sap-ui-version.json",{async:a.async,failOnError:a.async||a.failOnError});if(f instanceof Promise){r=f;return f.then(t,o)}else{return t(f)}}else{var u;if(typeof a.library!=="undefined"){var c=i.libraries;if(c){for(var l=0,d=c.length;l<d;l++){if(c[l].name===a.library){u=c[l];break}}}}else{u=i}return a.async?Promise.resolve(u):u}};function o(){if(i){if(i.libraries&&!a){a={};i.libraries.forEach(function(n,e){a[n.name]={};var r=n.manifestHints&&n.manifestHints.dependencies&&n.manifestHints.dependencies.libs;for(var i in r){if(!r[i].lazy){a[n.name][i]=true}}})}if(i.components&&!t){t={};Object.keys(i.components).forEach(function(n){var e=i.components[n];t[n]={library:e.library,hasOwnPreload:e.hasOwnPreload||false,dependencies:[]};var r=e.manifestHints&&e.manifestHints.dependencies&&e.manifestHints.dependencies.libs;for(var a in r){if(!r[a].lazy){t[n].dependencies.push(a)}}})}}}e._getTransitiveDependencyForLibraries=function(n){o();if(a){var e=n.reduce(function(n,e){n[e]=true;return Object.assign(n,a[e])},{});n=Object.keys(e)}return n};e._getTransitiveDependencyForComponent=function(n){o();if(t){return t[n]}};e._reset=function(){s()};return e});
//# sourceMappingURL=VersionInfo.js.map