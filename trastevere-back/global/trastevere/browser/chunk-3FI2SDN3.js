import{b as A,d as w}from"./chunk-3FSU4CAU.js";import{a as M,b as D,c as F,d as N}from"./chunk-2K4EHN3J.js";import"./chunk-MCCIIHVS.js";import"./chunk-NOAOFUJL.js";import"./chunk-KERRPVFC.js";import"./chunk-EPRKLT6B.js";import{a as T}from"./chunk-T6CLRISC.js";import"./chunk-GK6A4HIM.js";import"./chunk-5W2MNWRR.js";import"./chunk-4CJP5RBE.js";import"./chunk-732UR5WD.js";import"./chunk-FRF4WPMZ.js";import{f as L}from"./chunk-3YROUDBC.js";import{a as C}from"./chunk-TMHMHBU4.js";import"./chunk-3U2UQCJ5.js";import"./chunk-Q52T5SQV.js";import{v as U,y as E}from"./chunk-DPUVSD4U.js";import{m as b,r as y}from"./chunk-MVQCMINQ.js";import{Gb as o,Hb as m,Qa as a,Qb as S,Rb as x,Sb as _,T as u,Y as f,Z as d,ba as g,bb as c,eb as l,mc as I,nb as t,ob as i,pb as v,xb as h}from"./chunk-YTQLSVMJ.js";var s=class e{constructor(r){this.http=r}getAllUsers(){return this.http.get(this.ip+"/getAllUsers")}get ip(){return T.URL_API+"login"}static \u0275fac=function(n){return new(n||e)(f(C))};static \u0275prov=u({token:e,factory:e.\u0275fac,providedIn:"root"})};var H=()=>({"min-width":"50rem"});function R(e,r){e&1&&(t(0,"p"),o(1," No hay ususarios disponibles. "),i())}function K(e,r){e&1&&(t(0,"tr")(1,"th"),o(2,"Nombre"),i(),t(3,"th"),o(4,"Apellidos"),i(),t(5,"th"),o(6,"Email"),i(),t(7,"th"),o(8,"Movil"),i(),t(9,"th"),o(10,"Nif"),i()())}function k(e,r){if(e&1&&(t(0,"tr")(1,"td"),o(2),i(),t(3,"td"),o(4),i(),t(5,"td"),o(6),i(),t(7,"td"),o(8),i(),t(9,"td"),o(10),i()()),e&2){let n=r.$implicit;a(2),m(n.name),a(2),m(n.surname),a(2),m(n.email),a(2),m(n.phone),a(2),m(n.cif)}}function B(e,r){if(e&1&&(t(0,"p-table",4),c(1,K,11,0,"ng-template",5)(2,k,11,5,"ng-template",6),i()),e&2){let n=h();l("value",n.users)("tableStyle",_(2,H))}}var j=class e{userService=d(s);cd=d(I);isLoading=!1;users=[];ngOnInit(){this.isLoading=!0,this.userService.getAllUsers().subscribe({next:r=>{this.users=r,this.isLoading=!1,this.cd.detectChanges()},error:()=>{},complete:()=>{}})}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=g({type:e,selectors:[["app-lista-usuario"]],standalone:!0,features:[S([U]),x],decls:7,vars:2,consts:[[1,"grid"],[1,"col-12"],[4,"ngIf"],["dataKey","id","editMode","row",3,"value","tableStyle",4,"ngIf"],["dataKey","id","editMode","row",3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"]],template:function(n,p){n&1&&(t(0,"div",0)(1,"h2",1),o(2,"Lista de Usuarios"),i(),t(3,"div",1),c(4,R,2,0,"p",2)(5,B,3,3,"p-table",3),i()(),v(6,"p-toast")),n&2&&(a(4),l("ngIf",!p.isLoading&&p.users.length===0),a(),l("ngIf",p.users.length>0))},dependencies:[y,b,D,M,E,L,w,N,F,A],changeDetection:0})};export{j as ListaUsuarioComponent};
