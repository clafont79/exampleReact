exports.id = 0;
exports.modules = {

/***/ 161:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function formatPrice(price) {
		return parseInt(price) / 100 + "€";
	}
	
	var Main = function (_React$Component) {
		_inherits(Main, _React$Component);
	
		function Main() {
			var _ref;
	
			var _temp, _this, _ret;
	
			_classCallCheck(this, Main);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Main.__proto__ || Object.getPrototypeOf(Main)).call.apply(_ref, [this].concat(args))), _this), _this.defaultState = {
				price: 2500,
				description: 'Quick Start step by step',
				optionalConsultancy: false,
				loading: false,
				txOk: false,
				txResult: null
			}, _this.state = _this.defaultState, _this.defaultState1 = {
				price: 3100,
				description: 'Quick Start step by step',
				optionalConsultancy: false,
				loading: false,
				txOk: false,
				txResult: null
			}, _this.state1 = _this.defaultState1, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Main, [{
			key: "toggle",
			value: function toggle(e) {
				this.setState({
					txMessage: ''
				});
				var _state = this.state,
				    price = _state.price,
				    description = _state.description,
				    optionalConsultancy = _state.optionalConsultancy;
	
				if (optionalConsultancy == false) {
					this.setState({
						price: this.state.price + 2400,
						description: this.state.description + " + Consulenza",
						optionalConsultancy: true
					});
				} else {
					this.setState(this.defaultState);
				}
			}
		}, {
			key: "openPurchase",
			value: function openPurchase() {
				var _this2 = this;
	
				console.log('ok');
				this.setState({ loading: true });
	
				var handler = StripeCheckout.configure({
					key: Config.public.stripe,
					locale: 'auto',
					token: function token(_token) {
						var filename = 'senzanome.pdf';
						fetch('/charge', {
							method: 'post',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								//TODO dati
								stripeToken: _token.id,
								description: _this2.state.description,
								customAmount: _this2.state.price
							})
						}).then(function (response) {
							if (response.status == 200) {
								filename = response.headers.get('filename');
								return response.blob();
							} else {
								throw 'Errore Server';
							}
						}).then(function (blob) {
							var a = document.createElement("a");
							document.body.appendChild(a);
							var url = window.URL.createObjectURL(blob);
							a.href = url;
							a.download = filename;
							a.click();
							window.URL.revokeObjectURL(url);
							_this2.setState({ txOk: true, txMessage: 'Transazione riuscita, download avviato' });
							_this2.setState({ loading: false });
						}).catch(function (err) {
							_this2.setState({ loading: false });
							_this2.setState({ txOk: false, txMessage: err });
							console.log('Download non riuscito');
							console.log('Errore: ' + err.message);
						});
					}
				});
	
				handler.open({
					name: 'eLearning ReactJS',
					description: this.state.description,
					currency: "eur",
					amount: this.state.price,
					closed: function closed() {
						_this2.setState({
							loading: false
						});
					}
				});
			}
		}, {
			key: "render",
			value: function render() {
				var _this3 = this;
	
				return _react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(
						"h1",
						null,
						"eLearning ReactJS"
					),
					_react2.default.createElement(
						"div",
						{ className: "mdl-grid mdl-cell--6-col" },
						_react2.default.createElement(
							"div",
							{ className: "mdl-cell mdl-cell--3-col" },
							_react2.default.createElement("img", { src: "/Copertina.png" })
						),
						_react2.default.createElement(
							"p",
							null,
							_react2.default.createElement(
								"div",
								{ className: "mdl-cell mdl-cell--3-col mdl-cell--middle" },
								_react2.default.createElement(
									"p",
									null,
									this.state.txOk ? _react2.default.createElement(
										"span",
										{ style: { color: 'green' } },
										this.state.txMessage
									) : _react2.default.createElement(
										"span",
										{ style: { color: 'red' } },
										this.state.txMessage
									)
								),
								_react2.default.createElement(
									"button",
									{ className: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent",
										onClick: function onClick() {
											return _this3.openPurchase();
										} },
									"Acquista il libro a ",
									formatPrice(this.state.price),
									" ",
									this.state.loading ? '..' : ''
								),
								_react2.default.createElement(
									"p",
									null,
									_react2.default.createElement(
										"label",
										{ className: "mdl-switch mdl-js-switch mdl-js-ripple-effect" },
										_react2.default.createElement("input", { type: "checkbox", className: "mdl-switch__input", onClick: function onClick() {
												_this3.toggle();
											} }),
										_react2.default.createElement(
											"span",
											{ className: "mdl-switch__label" },
											"Aggiungi Tutor"
										)
									)
								)
							)
						)
					),
					_react2.default.createElement(
						"div",
						{ className: "mdl-grid mdl-cell--6-col" },
						_react2.default.createElement(
							"div",
							{ className: "mdl-cell mdl-cell--3-col" },
							_react2.default.createElement("img", { src: "/Copertina2.png" })
						),
						_react2.default.createElement(
							"div",
							{ className: "mdl-cell mdl-cell--3-col mdl-cell--middle" },
							_react2.default.createElement(
								"p",
								null,
								this.state.txOk ? _react2.default.createElement(
									"span",
									{ style: { color: 'green' } },
									this.state.txMessage
								) : _react2.default.createElement(
									"span",
									{ style: { color: 'red' } },
									this.state.txMessage
								)
							),
							_react2.default.createElement(
								"button",
								{ className: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent",
									onClick: function onClick() {
										return _this3.openPurchase();
									} },
								"Acquista il libro a ",
								formatPrice(this.state.price),
								" ",
								this.state.loading ? '..' : ''
							),
							_react2.default.createElement(
								"p",
								null,
								_react2.default.createElement(
									"label",
									{ className: "mdl-switch mdl-js-switch mdl-js-ripple-effect" },
									_react2.default.createElement("input", { type: "checkbox", className: "mdl-switch__input", onClick: function onClick() {
											_this3.toggle();
										} }),
									_react2.default.createElement(
										"span",
										{ className: "mdl-switch__label" },
										"Aggiungi Tutor"
									)
								)
							)
						)
					),
					_react2.default.createElement(
						"p",
						null,
						"Piattaforma eLearning"
					),
					_react2.default.createElement("script", { src: "https://checkout.stripe.com/checkout.js" })
				);
			}
		}]);
	
		return Main;
	}(_react2.default.Component);
	
	exports.default = Main;

/***/ }

};
//# sourceMappingURL=0.2b4f86f79246324d8497.hot-update.js.map