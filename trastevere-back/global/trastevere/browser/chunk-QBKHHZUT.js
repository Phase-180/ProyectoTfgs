import{a as n}from"./chunk-T6CLRISC.js";import{a as f}from"./chunk-TMHMHBU4.js";import{T as o,Y as p,c as e}from"./chunk-YTQLSVMJ.js";var s=class t{constructor(a){this.http=a}_tarifa=[];getAllTarifas(){return this.http.get(`${this.ip}allTarifas`)}updateTarifa(c){var i=c,{TarifaDays:a,id:r}=i,m=e(i,["TarifaDays","id"]);return this.http.patch(`${this.ip}${r}`,m)}get ip(){return n.URL_API+"tarifa/"}static \u0275fac=function(r){return new(r||t)(p(f))};static \u0275prov=o({token:t,factory:t.\u0275fac,providedIn:"root"})};export{s as a};
