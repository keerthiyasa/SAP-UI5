/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/SyncPromise","sap/ui/model/Context","sap/ui/model/_Helper"],function(t,e,i){"use strict";var n=["changeSetId","groupId","refreshAfterChange"];var r=e.extend("sap.ui.model.odata.v2.Context",{constructor:function(i,n,r,o,s,a){var u=this;e.call(this,i,n);this.oCreatePromise=undefined;this.sDeepPath=r||n;this.bForceRefresh=false;this.bPreliminary=false;this.oSyncCreatePromise=a?a.oSyncCreatePromise:o;this.bUpdated=false;this.bInactive=!!s;this.fnStartActivation=undefined;this.oStartActivationPromise=s?new t(function(t){u.fnStartActivation=t}):t.resolve();this.fnActivate=undefined;this.oActivatedPromise=s?new t(function(t){u.fnActivate=t}):t.resolve();this.mSubContexts=undefined;this.oTransientParent=a}});r.prototype.addSubContext=function(t,e,i){this.mSubContexts=this.mSubContexts||{};if(i){this.mSubContexts[t]=this.mSubContexts[t]||[];this.mSubContexts[t].push(e)}else{this.mSubContexts[t]=e}};r.prototype.cancelActivation=function(){var e=this;this.oStartActivationPromise=new t(function(t){e.fnStartActivation=t})};r.prototype.created=function(){if(this.oSyncCreatePromise&&!this.oCreatePromise){this.oCreatePromise=Promise.resolve(this.oSyncCreatePromise).then(function(){})}return this.oCreatePromise};r.prototype.delete=function(t){var e,r=this.getModel(),o=this;t=t||{};for(e in t){if(!n.includes(e)){throw new Error("Parameter '"+e+"' is not supported")}}if(this.isInactive()){r._discardEntityChanges(r._getKey(this),true);r.checkUpdate();return Promise.resolve()}else if(this.isTransient()){return r.resetChanges([this.getPath()],false,true)}return new Promise(function(e,n){var s=r._resolveGroup(o.getPath());r.remove("",i.merge({changeSetId:s.changeSetId,context:o,error:n,groupId:s.groupId,success:function(){e()}},t))})};r.prototype.fetchActivated=function(){return this.oActivatedPromise};r.prototype.fetchActivationStarted=function(){return this.oStartActivationPromise};r.prototype.finishActivation=function(){this.bInactive=false;if(this.fnActivate){this.fnActivate()}};r.prototype.getDeepPath=function(){return this.sDeepPath};r.prototype.getSubContexts=function(){return this.mSubContexts};r.prototype.getSubContextsArray=function(t){var e,i,n=[];function r(e){n.push(e);if(t){n=n.concat(e.getSubContextsArray(t))}}for(e in this.mSubContexts){i=this.mSubContexts[e];if(Array.isArray(i)){i.forEach(r)}else{r(i)}}return n};r.prototype.getSubContextsAsKey=function(t){return this.getSubContextsArray(t).map(function(t){return t.getPath().slice(1)})};r.prototype.getSubContextsAsPath=function(t){return this.getSubContextsArray(t).map(function(t){return t.getPath()})};r.prototype.hasChanged=function(){return this.bUpdated||this.bForceRefresh};r.prototype.hasSubContexts=function(){return!!this.mSubContexts};r.prototype.hasTransientParent=function(){return!!this.oTransientParent};r.prototype.isInactive=function(){return this.bInactive};r.prototype.isPreliminary=function(){return this.bPreliminary};r.prototype.isRefreshForced=function(){return this.bForceRefresh};r.prototype.isTransient=function(){return this.oSyncCreatePromise&&this.oSyncCreatePromise.isPending()};r.prototype.isUpdated=function(){return this.bUpdated};r.prototype.removeFromTransientParent=function(){if(this.oTransientParent){this.oTransientParent.removeSubContext(this);delete this.oTransientParent}};r.prototype.removeSubContext=function(t){var e,i,n;for(i in this.mSubContexts){n=this.mSubContexts[i];if(Array.isArray(n)){e=n.indexOf(t);if(e>-1){n.splice(e,1)}if(!n.length){delete this.mSubContexts[i]}}else if(n===t){delete this.mSubContexts[i]}}if(this.mSubContexts&&!Object.keys(this.mSubContexts).length){this.mSubContexts=undefined}};r.prototype.resetCreatedPromise=function(){this.oCreatePromise=undefined;this.oSyncCreatePromise=undefined};r.prototype.setDeepPath=function(t){this.sDeepPath=t};r.prototype.setForceRefresh=function(t){this.bForceRefresh=t};r.prototype.setPreliminary=function(t){this.bPreliminary=t};r.prototype.setUpdated=function(t){this.bUpdated=t};r.prototype.startActivation=function(){if(this.fnStartActivation){this.fnStartActivation()}};return r});
//# sourceMappingURL=Context.js.map