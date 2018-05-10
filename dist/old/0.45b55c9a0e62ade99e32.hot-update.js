exports.id = 0;
exports.modules = {

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _babelPolyfill = __webpack_require__(4);
	
	var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);
	
	var _koa = __webpack_require__(5);
	
	var _koa2 = _interopRequireDefault(_koa);
	
	var _koaStatic = __webpack_require__(6);
	
	var _koaStatic2 = _interopRequireDefault(_koaStatic);
	
	var _koaRouter = __webpack_require__(7);
	
	var _koaRouter2 = _interopRequireDefault(_koaRouter);
	
	var _koaBody = __webpack_require__(8);
	
	var _koaBody2 = _interopRequireDefault(_koaBody);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(10);
	
	var _server2 = _interopRequireDefault(_server);
	
	var _fs = __webpack_require__(157);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _stripe = __webpack_require__(158);
	
	var _stripe2 = _interopRequireDefault(_stripe);
	
	var _state = __webpack_require__(159);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _Main = __webpack_require__(161);
	
	var _Main2 = _interopRequireDefault(_Main);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	try {
		var app = (0, _koa2.default)();
		var router = (0, _koaRouter2.default)();
		var body = (0, _koaBody2.default)();
		var hostname = process.env.HOSTNAME || "localhost";
		var port = process.env.PORT || 3000;
	
		// load env config
		var configFile = (process.env.NODE_ENV || 'development') + ".json";
		console.log("\n==> Load config: " + configFile);
		global.AppRoot = process.cwd();
		global.Config = JSON.parse(_fs2.default.readFileSync(AppRoot + "/configs/" + configFile));
	
		app.use((0, _koaStatic2.default)("static"));
		// getmdl - material-ui mount
		app.use((0, _koaStatic2.default)("node_modules/material-design-lite"));
		// app.use(koaStatic("."));
		app.use(router.routes());
	
		router.get('/txs', /*#__PURE__*/regeneratorRuntime.mark(function _callee(next) {
			var db, txs, html;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return _state2.default.getConnection();
	
						case 2:
							db = _context.sent;
							_context.next = 5;
							return db.collection('Transaction').find({}).toArray();
	
						case 5:
							txs = _context.sent;
							html = "\n\t\t<table>\n\t\t\t" + txs.map(function (tx) {
								return "<tr>\n\t\t\t\t\t<td>" + tx._id + "</td>\n\t\t\t\t\t<td>" + tx.description + "</td>\n\t\t\t\t\t<td>" + tx.amount + "</td>\n\t\t\t\t\t<td>" + tx.source.name + "</td>\n\t\t\t\t</tr>";
							}) + "\n\t\t</table>\n\t\t";
	
							this.body = html;
	
						case 8:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));
	
		// GET /charge
		router.post('/charge', body, /*#__PURE__*/regeneratorRuntime.mark(function _callee2(next) {
			var _this = this;
	
			var filename, getDownload, doCharge, tx, blob, db, txs;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							filename = 'ebook.pdf';
							getDownload = new Promise(function (resolve, reject) {
								resolve(_fs2.default.readFileSync(AppRoot + "/private/" + filename));
							});
							doCharge = new Promise(function (resolve, reject) {
								var stripe = (0, _stripe2.default)(Config.stripe_secret);
								var _request$body = _this.request.body,
								    stripeToken = _request$body.stripeToken,
								    description = _request$body.description,
								    customAmount = _request$body.customAmount;
	
	
								stripe.charges.create({
									amount: customAmount,
									currency: "eur",
									source: stripeToken,
									description: description
								}).then(function (tx) {
									console.log('TX ', tx);
									resolve(tx);
								}).catch(function (err) {
									console.error('ERROR STRIPE:', err);
									reject(err);
								});
							});
							_context2.prev = 3;
							_context2.next = 6;
							return doCharge;
	
						case 6:
							tx = _context2.sent;
							_context2.next = 9;
							return getDownload;
	
						case 9:
							blob = _context2.sent;
							_context2.next = 12;
							return _state2.default.getConnection();
	
						case 12:
							db = _context2.sent;
							_context2.next = 15;
							return db.collection('Transaction').insertOne(tx);
	
						case 15:
							txs = _context2.sent;
	
							this.set({
								'Content-Disposition': 'attachment',
								'Content-Type': 'application/json',
								'filename': filename
							});
							this.body = blob;
							_context2.next = 25;
							break;
	
						case 20:
							_context2.prev = 20;
							_context2.t0 = _context2["catch"](3);
	
							this.status = 400;
							console.error("E: " + _context2.t0.message);
							this.body = _context2.t0.message;
	
						case 25:
						case "end":
							return _context2.stop();
					}
				}
			}, _callee2, this, [[3, 20]]);
		}));
	
		// Main React component
		router.get('/', /*#__PURE__*/regeneratorRuntime.mark(function _callee3(next) {
			var webserver, reactString, template;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							webserver = process.env.NODE_ENV === "production" ? "" : "//" + hostname + ":8080";
							reactString = _server2.default.renderToStaticMarkup(_react2.default.createElement(_Main2.default, null));
							template = "\n\t\t\t<!doctype html>\n\t\t\t<html lang=\"en\">\n\t\t\t  <head>\n\t\t\t    <meta charset=\"utf-8\">\n\t\t\t    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n\t\t\t    <meta name=\"description\" content=\"A front-end template that helps you build fast, modern mobile web apps.\">\n\t\t\t    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\t\t\t    <title>Ebook Shopping</title>\n\n\t\t\t    <!-- Add to homescreen for Chrome on Android -->\n\t\t\t    <meta name=\"mobile-web-app-capable\" content=\"yes\">\n\n\t\t\t    <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en\">\n\t\t\t    <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/icon?family=Material+Icons\">\n\t\t\t\t\t<link rel=\"stylesheet\" href=\"/material.min.css\">\n\t\t\t\t\t<script src=\"/material.min.js\"></script>\n\n\t\t\t\t\t<link rel=\"stylesheet\" href=\"/styles.css\">\n\t\t\t  </head>\n\t\t\t  <body>\n\t\t\t    <div class=\"demo-layout mdl-layout mdl-layout--fixed-header mdl-js-layout mdl-color--grey-100\">\n\t\t\t      <header class=\"demo-header mdl-layout__header mdl-layout__header--scroll mdl-color--grey-100 mdl-color-text--grey-800\">\n\t\t\t        <div class=\"mdl-layout__header-row\">\n\t\t\t          <span class=\"mdl-layout-title\">Esempio App</span>\n\t\t\t          <div class=\"mdl-layout-spacer\"></div>\n\t\t\t        </div>\n\t\t\t      </header>\n\t\t\t      <div class=\"demo-ribbon\"></div>\n\t\t\t      <main class=\"demo-main mdl-layout__content\">\n\t\t\t        <div class=\"demo-container mdl-grid\">\n\t\t\t          <div class=\"mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone\"></div>\n\t\t\t          <div class=\"demo-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col\">\n\n\t\t\t\t\t\t\t\t\t\t<div id=\"react-root\" class=\"container\">" + reactString + "</div>\n\n\t\t\t          </div>\n\t\t\t        </div>\n\t\t\t      </main>\n\n\t\t\t\t\t\t<footer class=\"mdl-mini-footer\">\n\t\t\t\t\t\t  <div class=\"mdl-mini-footer__left-section\">\n\t\t\t\t\t\t    <div class=\"mdl-logo\">Piattaforma eLearning</div>\n\t\t\t\t\t\t    <ul class=\"mdl-mini-footer__link-list\">\n\t\t\t\t\t\t\t\t\t<li>Un'applicazione d'esempio</li>\n\t\t\t\t\t\t\t\t\t<li>" + ( true ? 'DEV' : '') + "</li>\n\t\t\t\t\t\t    </ul>\n\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t</footer>\n\n\t\t\t    </div>\n\n\t\t\t\t\t<script>\n\t\t\t\t\t\twindow.Config = {}\n\t\t\t\t\t\tConfig.public = " + JSON.stringify(Config.public) + "\n\t\t\t\t\t</script>\n\n\t\t\t\t\t<script src=\"" + webserver + "/dist/client.js\"></script>\n\n\t\t\t  </body>\n\t\t\t</html>\n\t\t\t";
	
	
							this.type = "text/html";
							this.body = template;
	
						case 5:
						case "end":
							return _context3.stop();
					}
				}
			}, _callee3, this);
		}));
	
		// start
		app.listen(port, function () {
			console.info("==> ✅  Server is listening");
			console.info("==> 🌎  Go to http://%s:%s", hostname, port);
		});
	
		if (true) {
			if (true) {
				console.log("[HMR] Waiting for server-side updates");
	
				// module.hot.accept("containers/routes", () => {
				// 	routes = require("containers/routes");
				// });
	
				module.hot.addStatusHandler(function (status) {
					if (status === "abort") {
						setTimeout(function () {
							return process.exit(0);
						}, 0);
					}
				});
			}
		}
	} catch (error) {
		console.error(error.stack || error);
	}

/***/ }

};
//# sourceMappingURL=0.45b55c9a0e62ade99e32.hot-update.js.map