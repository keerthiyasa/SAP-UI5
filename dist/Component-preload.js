//@ui5-bundle ui5/walkthrough/Component-preload.js
sap.ui.require.preload({
	"ui5/walkthrough/Component.js":function(){
sap.ui.define(["sap/ui/core/UIComponent","sap/ui/model/json/JSONModel","sap/ui/Device"],(e,t,i)=>{"use strict";return e.extend("ui5.walkthrough.Component",{metadata:{interfaces:["sap.ui.core.IAsyncContentCreation"],manifest:"json"},init(){e.prototype.init.apply(this,arguments);const n={recipient:{name:"World"}};const o=new t(n);this.setModel(o);const s=new t(i);s.setDefaultBindingMode("OneWay");this.setModel(s,"device");this.getRouter().initialize()},getContentDensityClass(){return i.support.touch?"sapUiSizeCozy":"sapUiSizeCompact"}})});
},
	"ui5/walkthrough/control/ProductRating.js":function(){
sap.ui.define(["sap/ui/core/Control","sap/m/RatingIndicator","sap/m/Label","sap/m/Button"],(t,e,i,a)=>{"use strict";return t.extend("ui5.walkthrough.control.ProductRating",{metadata:{properties:{value:{type:"float",defaultValue:0}},aggregations:{_rating:{type:"sap.m.RatingIndicator",multiple:false,visibility:"hidden"},_label:{type:"sap.m.Label",multiple:false,visibility:"hidden"},_button:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{change:{parameters:{value:{type:"int"}}}}},init(){this.setAggregation("_rating",new e({value:this.getValue(),iconSize:"2rem",visualMode:"Half",liveChange:this._onRate.bind(this)}));this.setAggregation("_label",new i({text:"{i18n>productRatingLabelInitial}"}).addStyleClass("sapUiSmallMargin"));this.setAggregation("_button",new a({text:"{i18n>productRatingButton}",press:this._onSubmit.bind(this)}).addStyleClass("sapUiTinyMarginTopBottom"))},setValue(t){this.setProperty("value",t,true);this.getAggregation("_rating").setValue(t);return this},reset(){const t=this.getModel("i18n").getResourceBundle();this.setValue(0);this.getAggregation("_label").setDesign("Standard");this.getAggregation("_rating").setEnabled(true);this.getAggregation("_label").setText(t.getText("productRatingLabelInitial"));this.getAggregation("_button").setEnabled(true)},_onRate(t){const e=this.getModel("i18n").getResourceBundle();const i=t.getParameter("value");this.setProperty("value",i,true);this.getAggregation("_label").setText(e.getText("productRatingLabelIndicator",[i,t.getSource().getMaxValue()]));this.getAggregation("_label").setDesign("Bold")},_onSubmit(t){const e=this.getModel("i18n").getResourceBundle();this.getAggregation("_rating").setEnabled(false);this.getAggregation("_label").setText(e.getText("productRatingLabelFinal"));this.getAggregation("_button").setEnabled(false);this.fireEvent("change",{value:this.getValue()})},renderer(t,e){t.openStart("div",e);t.class("myAppDemoWTProductRating");t.openEnd();t.renderControl(e.getAggregation("_rating"));t.renderControl(e.getAggregation("_label"));t.renderControl(e.getAggregation("_button"));t.close("div")}})});
},
	"ui5/walkthrough/controller/App.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller"],e=>{"use strict";return e.extend("ui5.walkthrough.controller.App",{})});
},
	"ui5/walkthrough/controller/Detail.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/m/MessageToast","sap/ui/model/json/JSONModel"],(e,t,n,o)=>{"use strict";return e.extend("ui5.walkthrough.controller.Detail",{onInit(){const e=new o({currency:"EUR"});this.getView().setModel(e,"view");const t=this.getOwnerComponent().getRouter();t.getRoute("detail").attachPatternMatched(this.onObjectMatched,this)},onObjectMatched(e){this.byId("rating").reset();this.getView().bindElement({path:"/"+window.decodeURIComponent(e.getParameter("arguments").invoicePath),model:"invoice"})},onNavBack(){const e=t.getInstance();const n=e.getPreviousHash();if(n!==undefined){window.history.go(-1)}else{const e=this.getOwnerComponent().getRouter();e.navTo("overview",{},true)}},onRatingChange(e){const t=e.getParameter("value");const o=this.getView().getModel("i18n").getResourceBundle();n.show(o.getText("ratingConfirmation",[t]))}})});
},
	"ui5/walkthrough/controller/HelloPanel.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageToast"],(e,o)=>{"use strict";return e.extend("ui5.walkthrough.controller.HelloPanel",{onShowHello(){const e=this.getView().getModel("i18n").getResourceBundle();const t=this.getView().getModel().getProperty("/recipient/name");const l=e.getText("helloMsg",[t]);o.show(l)},onOpenDialog(){this.pDialog??=this.loadFragment({name:"ui5.walkthrough.view.HelloDialog"});this.pDialog.then(e=>e.open())},onCloseDialog(){this.byId("helloDialog").close()}})});
},
	"ui5/walkthrough/controller/InvoiceList.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","../model/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator"],(e,t,o,n,i)=>{"use strict";return e.extend("ui5.walkthrough.controller.InvoiceList",{formatter:o,onInit(){const e=new t({currency:"EUR"});this.getView().setModel(e,"view")},onFilterInvoices(e){const t=[];const o=e.getParameter("query");if(o){t.push(new n("ProductName",i.Contains,o))}const r=this.byId("invoiceList");const s=r.getBinding("items");s.filter(t)},onPress(e){const t=e.getSource();const o=this.getOwnerComponent().getRouter();o.navTo("detail",{invoicePath:window.encodeURIComponent(t.getBindingContext("invoice").getPath().substr(1))})}})});
},
	"ui5/walkthrough/i18n/i18n.properties":'# App Descriptor\nappTitle=Hello World\nappDescription=A simple walkthrough app that explains the most important concepts of UI5\n\n# Hello Panel\nshowHelloButtonText=Say Hello\nhelloMsg=Hello {0}\nhomePageTitle=Walkthrough\nhelloPanelTitle=Hello World\nopenDialogButtonText=Say Hello With Dialog\ndialogCloseButtonText=Ok\n\n# Invoice List\ninvoiceListTitle=Invoices\ninvoiceStatusA=New\ninvoiceStatusB=In Progress\ninvoiceStatusC=Done\ncolumnQuantity=Quantity\ncolumnName=Name\ncolumnSupplier=Supplier\ncolumnStatus=Status\ncolumnPrice=Price\n\n# Detail Page\ndetailPageTitle=Walkthrough - Details\nratingConfirmation=You have rated this product with {0} stars\ndateTitle=Order date\nquantityTitle=Quantity\n#Overview Page\nOverview_rootLabel=Overview Page\nOverview_headerLabel=Header\nOverview_contentLabel=Page Content\nratingTitle=Rate the Product\n\n# Product Rating\nproductRatingLabelInitial=Please rate this product\nproductRatingLabelIndicator=Your rating: {0} out of {1}\nproductRatingLabelFinal=Thank you for your rating!\nproductRatingButton=Rate',
	"ui5/walkthrough/localService/mockserver.js":function(){
sap.ui.define(["sap/ui/core/util/MockServer"],e=>{"use strict";return{init(){const r=new e({rootUri:sap.ui.require.toUrl("ui5/walkthrough")+"/V2/Northwind/Northwind.svc/"});const t=new URLSearchParams(window.location.search);e.config({autoRespond:true,autoRespondAfter:t.get("serverDelay")||500});const o=sap.ui.require.toUrl("ui5/walkthrough/localService");r.simulate(o+"/metadata.xml",o+"/mockdata");r.start()}}});
},
	"ui5/walkthrough/manifest.json":'{"_version":"1.58.0","sap.app":{"id":"ui5.walkthrough","i18n":{"bundleUrl":"i18n/i18n.properties","supportedLocales":[""],"fallbackLocale":""},"title":"{{appTitle}}","description":"{{appDescription}}","type":"application","applicationVersion":{"version":"1.0.0"},"dataSources":{"invoiceRemote":{"uri":"V2/Northwind/Northwind.svc/","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"dependencies":{"minUI5Version":"1.108.0","libs":{"sap.m":{},"sap.ui.core":{}}},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"ui5.walkthrough.i18n.i18n","supportedLocales":[""],"fallbackLocale":""}},"invoice":{"dataSource":"invoiceRemote"}},"rootView":{"viewName":"ui5.walkthrough.view.App","type":"XML","id":"app"},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","type":"View","viewType":"XML","path":"ui5.walkthrough.view","controlId":"app","controlAggregation":"pages"},"routes":[{"pattern":"","name":"overview","target":"overview"},{"pattern":"detail/{invoicePath}","name":"detail","target":"detail"}],"targets":{"overview":{"id":"overview","name":"Overview"},"detail":{"id":"detail","name":"Detail"}},"contentDensities":{"compact":true,"cozy":true}}}}',
	"ui5/walkthrough/model/formatter.js":function(){
sap.ui.define([],()=>{"use strict";return{statusText(e){const t=this.getOwnerComponent().getModel("i18n").getResourceBundle();switch(e){case"A":return t.getText("invoiceStatusA");case"B":return t.getText("invoiceStatusB");case"C":return t.getText("invoiceStatusC");default:return e}}}});
},
	"ui5/walkthrough/view/App.view.xml":'<mvc:View\n\tcontrollerName="ui5.walkthrough.controller.App"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\tdisplayBlock="true"\n><Shell><App\n\t\t\tclass="myAppDemoWT"\n\t\t\tid="app"\n\t\t/></Shell></mvc:View>\n',
	"ui5/walkthrough/view/Detail.view.xml":'<mvc:View\n    controllerName="ui5.walkthrough.controller.Detail"\n    xmlns="sap.m"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns:wt="ui5.walkthrough.control"><Page\n        title="{i18n>detailPageTitle}"\n        showNavButton="true"\n        navButtonPress=".onNavBack"><ObjectHeader\n            responsive="true"\n            fullScreenOptimized="true"\n            number="{\n                parts: [\n                    \'invoice>ExtendedPrice\',\n                    \'view>/currency\'\n                ],\n                type: \'sap.ui.model.type.Currency\',\n                formatOptions: {\n                    showMeasure: false\n                }\n            }"\n            numberUnit="{view>/currency}"\n            intro="{invoice>ShipperName}"\n            title="{invoice>ProductName}"><attributes><ObjectAttribute\n                    title="{i18n>quantityTitle}"\n                    text="{invoice>Quantity}"/><ObjectAttribute\n                    title="{i18n>dateTitle}"\n                    text="{\n                        path: \'invoice>ShippedDate\',\n                        type: \'sap.ui.model.type.Date\',\n                        formatOptions: {\n                            style: \'long\',\n                            source: {\n                            pattern: \'yyyy-MM-ddTHH:mm:ss\'\n                            }\n                        }\n                    }"/></attributes></ObjectHeader><wt:ProductRating\n            id="rating"\n            class="sapUiSmallMarginBeginEnd"\n            change=".onRatingChange"/></Page></mvc:View>',
	"ui5/walkthrough/view/HelloDialog.fragment.xml":'<core:FragmentDefinition\n\txmlns="sap.m"\n\txmlns:core="sap.ui.core"\n><Dialog\n\t\tid="helloDialog"\n\t\ttitle="Hello {/recipient/name}"\n\t><content><core:Icon\n\t\t\t\tsrc="sap-icon://hello-world"\n\t\t\t\tsize="8rem"\n\t\t\t\tclass="sapUiMediumMargin"\n\t\t\t/></content><beginButton><Button\n\t\t\t\ttext="{i18n>dialogCloseButtonText}"\n\t\t\t\tpress=".onCloseDialog"\n\t\t\t/></beginButton></Dialog></core:FragmentDefinition>\n',
	"ui5/walkthrough/view/HelloPanel.view.xml":'<mvc:View\n\tcontrollerName="ui5.walkthrough.controller.HelloPanel"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n><Panel\n\t\theaderText="{i18n>helloPanelTitle}"\n\t\tclass="sapUiResponsiveMargin"\n\t\twidth="auto"\n\t\texpandable="{device>/system/phone}"\n\t\texpanded="{= !${device>/system/phone} }"\n\t\taccessibleRole="Region"\n\t><content><Button\n\t\t\t\tid="helloDialogButton"\n\t\t\t\ticon="sap-icon://world"\n\t\t\t\ttext="{i18n>openDialogButtonText}"\n\t\t\t\tpress=".onOpenDialog"\n\t\t\t\tclass="sapUiSmallMarginEnd sapUiVisibleOnlyOnDesktop"\n\t\t\t/><Button\n\t\t\t\ttext="{i18n>showHelloButtonText}"\n\t\t\t\tpress=".onShowHello"\n\t\t\t\tclass="myCustomButton"\n\t\t\t/><Input\n\t\t\t\tvalue="{/recipient/name}"\n\t\t\t\tvalueLiveUpdate="true"\n\t\t\t\twidth="60%"\n\t\t\t/><FormattedText\n\t\t\t\thtmlText="Hello {/recipient/name}"\n\t\t\t\tclass="sapUiSmallMargin sapThemeHighlight-asColor myCustomText"\n\t\t\t/></content></Panel></mvc:View>\n',
	"ui5/walkthrough/view/InvoiceList.view.xml":'<mvc:View\n\tcontrollerName="ui5.walkthrough.controller.InvoiceList"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><Panel accessibleRole="Region"><headerToolbar><Toolbar><Title text="{i18n>invoiceListTitle}"/><ToolbarSpacer/><SearchField\n\t\t\t\t\twidth="50%"\n\t\t\t\t\tsearch=".onFilterInvoices"/></Toolbar></headerToolbar><Table\n\t\n\t\tid="invoiceList"\n\t\theaderText="{i18n>invoiceListTitle}"\n\t\tclass="sapUiResponsiveMargin"\n\t\twidth="auto"\n\t\titems="{\n\t\t\tpath : \'invoice>/Invoices\',\n\t\t\tsorter : {\n\t\t\t\tpath : \'ShipperName\',\n\t\t\t\tgroup : true\n\t\t\t}\n\t\t}"\n\t><headerToolbar><Toolbar><Title text="{i18n>invoiceListTitle}" /><ToolbarSpacer /><SearchField\n\t\t\t\t\twidth="50%"\n\t\t\t\t\tsearch=".onFilterInvoices"\n\t\t\t\t/></Toolbar></headerToolbar><columns><Column\n\t\t\t\thAlign="End"\n\t\t\t\tminScreenWidth="Small"\n\t\t\t\tdemandPopin="true"\n\t\t\t\twidth="5em"><Text text="{i18n>columnQuantity}" /></Column><Column><Text text="{i18n>columnName}" /></Column><Column\n\t\t\t\tminScreenWidth="Small"\n\t\t\t\tdemandPopin="true"><Text text="{i18n>columnStatus}" /></Column><Column\n\t\t\t\tminScreenWidth="Tablet"\n\t\t\t\tdemandPopin="false"><Text text="{i18n>columnSupplier}" /></Column><Column hAlign="End"><Text text="{i18n>columnPrice}" /></Column></columns><items><ColumnListItem\n\t\t\t\ttype="Navigation"\n\t\t\t\tpress=".onPress"><cells><ObjectNumber\n\t\t\t\t\t\tnumber="{invoice>Quantity}"\n\t\t\t\t\t\temphasized="false"/><ObjectIdentifier title="{invoice>ProductName}" /><Text\n\t\t\t\t\t\ttext="{\n\t\t\t\t\t\t\t\tparts: [\n\t\t\t\t\t\t\t\t\t\'invoice>Status\',\n\t\t\t\t\t\t\t\t\t\'i18n>invoiceStatusA\',\n\t\t\t\t\t\t\t\t\t\'i18n>invoiceStatusB\',\n\t\t\t\t\t\t\t\t\t\'i18n>invoiceStatusC\'\n\t\t\t\t\t\t\t\t],\n\t\t\t\t\t\t\t\tformatter: \'.formatter.statusText\'\n\t\t\t\t\t\t\t}"/><Text text="{invoice>ShipperName}" /><ObjectNumber\n\t\t\t\t\t\tnumber="{\n\t\t\t\t\t\t\t\tparts: [\n\t\t\t\t\t\t\t\t\t\'invoice>ExtendedPrice\',\n\t\t\t\t\t\t\t\t\t\'view>/currency\'\n\t\t\t\t\t\t\t\t],\n\t\t\t\t\t\t\t\ttype: \'sap.ui.model.type.Currency\',\n\t\t\t\t\t\t\t\tformatOptions: {\n\t\t\t\t\t\t\t\t\tshowMeasure: false\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}"\n\t\t\t\t\t\tunit="{view>/currency}"\n\t\t\t\t\t\tstate="{= ${invoice>ExtendedPrice} > 50 ? \'Error\' : \'Success\' }"/></cells></ColumnListItem></items></Table></Panel></mvc:View>\n',
	"ui5/walkthrough/view/Overview.view.xml":'<mvc:View\n\tcontrollerName="ui5.walkthrough.controller.App"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\tdisplayBlock="true"\n><Page title="{i18n>homePageTitle}"><landmarkInfo><PageAccessibleLandmarkInfo\n\t\t\t\trootRole="Region"\n\t\t\t\trootLabel="{i18n>Overview_rootLabel}"\n\t\t\t\tcontentRole="Main"\n\t\t\t\tcontentLabel="{i18n>Overview_contentLabel}"\n\t\t\t\theaderRole="Banner"\n\t\t\t\theaderLabel="{i18n>Overview_headerLabel}"/></landmarkInfo><content><mvc:XMLView viewName="ui5.walkthrough.view.HelloPanel" /><mvc:XMLView viewName="ui5.walkthrough.view.InvoiceList" /></content></Page></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map
