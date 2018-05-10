exports.id = 0;
exports.modules = {

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
				description: 'Ebook',
				optionalConsultancy: false,
				loading: false,
				txOk: false,
				txResult: null
			}, _this.state = _this.defaultState, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Main, [{
			key: 'openPurchase',
			value: function openPurchase() {
				var _this2 = this;
	
				console.log('ok');
				this.setState({ loading: true });
	
				var handler = StripeCheckout.configure({
					key: Config.public.stripe,
					locale: 'auto',
					token: function token(_token) {
						debugger;
					}
				});
	
				handler.open({
					name: 'Ebook Lorem Ipsum',
					description: this.state.description,
					currency: "eur",
					amount: this.state.price,
					closed: function closed() {
						_this2.setState({
							loading: false
						});
					}
				});
				/* let filename = 'senzanome.pdf';
	   fetch('/charge', {
	   	method: 'post',
	   	headers: {
	   		'Content-Type': 'application/json'
	   	},
	   	body: JSON.stringify({
	   		//TODO dati
	   	})
	   }).then((response) => {
	   	if (response.status == 200){			
	   		filename = response.headers.get('filename');
	   		return response.blob();
	   	} else {
	   		throw 'Errore Server';
	   	}
	   }).then((blob) => {
	   	var a = document.createElement("a");
	   	document.body.appendChild(a);
	   	var url = window.URL.createObjectURL(blob);
	   	a.href = url;
	   	a.download = filename;
	   	a.click();
	   	window.URL.revokeObjectURL(url);
	   	this.setState({txOk: true, txMessage: 'Tx riuscita, il download inizierà a breve'});
	   	this.setState({loading: false});
	   }).catch (err => {
	   	this.setState({loading: false});
	   	this.setState({txOk: false, txMessage: err})
	   	console.log('Download non riuscito');
	   	console.log('Errore: ' + err.message);
	   }) */
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;
	
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h1',
						null,
						'Ebook Lorem Ipsum'
					),
					_react2.default.createElement(
						'div',
						{ className: 'mdl-grid' },
						_react2.default.createElement(
							'div',
							{ className: 'mdl-cell mdl-cell--8-col' },
							_react2.default.createElement('img', { src: '/Copertina.png' })
						),
						_react2.default.createElement(
							'div',
							{ className: 'mdl-cell mdl-cell--4-col mdl-cell--middle' },
							_react2.default.createElement(
								'p',
								null,
								this.state.txOk ? _react2.default.createElement(
									'span',
									{ style: { color: 'green' } },
									this.state.txMessage
								) : _react2.default.createElement(
									'span',
									{ style: { color: 'red' } },
									this.state.txMessage
								)
							),
							_react2.default.createElement(
								'button',
								{ className: 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent',
									onClick: function onClick() {
										return _this3.openPurchase();
									} },
								'Acquista a X ',
								this.state.loading ? '..' : ''
							),
							_react2.default.createElement(
								'p',
								null,
								_react2.default.createElement(
									'label',
									{ className: 'mdl-switch mdl-js-switch mdl-js-ripple-effect' },
									_react2.default.createElement('input', { type: 'checkbox', className: 'mdl-switch__input' }),
									_react2.default.createElement(
										'span',
										{ className: 'mdl-switch__label' },
										'con Consulenza'
									)
								)
							)
						)
					),
					_react2.default.createElement(
						'p',
						null,
						'Testo di prova abbastanza lungo per far vedere anche come va a capo in modo automatico'
					),
					_react2.default.createElement('script', { src: 'https://checkout.stripe.com/checkout.js' })
				);
			}
		}]);
	
		return Main;
	}(_react2.default.Component);
	
	exports.default = Main;

/***/ }

};
//# sourceMappingURL=0.abf36df14b0998f825b8.hot-update.js.map