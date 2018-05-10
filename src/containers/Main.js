import React from "react";

function formatPrice(price){
	return parseInt(price) / 100 + "€"
}
var desc;
var amm;
export default class Main extends React.Component {

	

	defaultState = {
		price: 2500,
		description: 'React in action ',
		optionalConsultancy: false,
		loading: false,
		txOk: false,
		txResult: null,

		price1: 3100,
		description1: 'Quick Start React',
		optionalConsultancy1: false,
		loading1: false,
		txOk1: false,
		txResult1: null,

		price2: 2200,
		description2: 'Startup Node',
		optionalConsultancy2: false,
		loading2: false,
		txOk2: false,
		txResult2: null
	};

	state = this.defaultState;

	toggle(st){
		console.log("eeee", st);
		this.setState({
			txMessage: '',
			txMessage1: '',
			txMessage2: ''
		})
		if (st==='state'){
			let {price, description, optionalConsultancy} = this.state
			if(optionalConsultancy == false) {
				this.setState({
					price: this.state.price + 1100,
					description: this.state.description + " + Spedizione",
					optionalConsultancy: true
				})
			} else {
				this.setState(this.defaultState);
			}
		}else if(st ==='state1'){
			let {price1, description1, optionalConsultancy1} = this.state
			if(optionalConsultancy1 == false) {
				this.setState({
					price1: this.state.price1 + 1500,
					description1: this.state.description1 + " + Spedizione",
					optionalConsultancy1: true
				})
			} else {
				this.setState(this.defaultState);
			}
		}else{
			let {price2, description2, optionalConsultancy2} = this.state
			if(optionalConsultancy2 == false) {
				this.setState({
					price2: this.state.price2 + 1500,
					description2: this.state.description2 + " + Spedizione",
					optionalConsultancy2: true
				})
			} else {
				this.setState(this.defaultState);
			}
		}
	}

	openPurchase(st){
		this.setState({
			txMessage: '',
			txMessage1: '',
			txMessage2: ''
		})
		console.log('ok', this);
		if (st==='state'){
			this.setState({loading: true})
		}else if(st ==='state1'){
			this.setState({loading1: true})
		}else{
			this.setState({loading2: true})
		}
		if (st==='state'){
			desc = this.state.description;
			amm = this.state.price;
		}else if(st ==='state1'){
			desc = this.state.description1;
			amm = this.state.price1;
		}else{
			desc = this.state.description2;
			amm = this.state.price2;
		}

		let handler = StripeCheckout.configure({
			key: Config.public.stripe,
			locale: 'auto',
			token: (token) => {
				let filename = 'senzanome.pdf';
				fetch('/charge', {
					method: 'post',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						//TODO dati
						stripeToken: token.id,
						description: desc,
						customAmount: amm
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
					this.setState({loading: false});
					this.setState({loading1: false});
					this.setState({loading2: false});
					if (st ==='state'){
						this.setState({txOk: true, txMessage: 'Transazione riuscita, download avviato'});
					}else if(st ==='state1'){
						this.setState({txOk1: true, txMessage1: 'Transazione riuscita, download avviato'});
					}else{
						this.setState({txOk2: true, txMessage2: 'Transazione riuscita, download avviato'});
					}
					
				}).catch (err => {
					this.setState({loading: false});
					this.setState({loading1: false});
					this.setState({loading2: false});
					if (st ==='state'){
						this.setState({txOk: false, txMessage: err})
					}else if(st ==='state1'){
						this.setState({txOk1: false, txMessage1: err})
					}else{
						this.setState({txOk2: false, txMessage2: err})
					}
			
					console.log('Download non riuscito');
					console.log('Errore: ' + err.message);
				})
			}
		})
		/*
		handler.open({
			name: 'eLearning ReactJS',
			description: this.state.description,
			currency: "eur",
			amount: this.state.price,
			closed: () => {
				this.setState({
					loading: false
				})
			}
		})
		*/
		handler.open({
			name: 'eLearning ReactJS',
			description: desc,
			currency: "eur",
			amount: amm,
			closed: () => {
				this.setState({
					loading: false,
					loading1: false,
					loading2
				})
			}
		})
	}

	render() {
		return (
			<div>
			<h1 style={{margin: '7px'}}>eLearning ReactJS</h1>
			<div className="mdl-grid" style={{border: '1px solid #ccc!important', borderRadius: '23px'}}>
			<div className="mdl-cell mdl-cell--2-col">
				<img src="/Copertina.png" />
			</div>
			<div className="mdl-cell mdl-cell--6-col">
				<p><b>Descrizione del libro</b></p>
				<div style={{textAlign: 'justify'}}>Realizzare applicazioni web con interfacce utente scalabili e performanti è una sfida che gli sviluppatori affrontano da un decennio. React.js è forse la tecnologia che fino a oggi ha risposto in maniera ...</div>
			</div>
			<div style={{marginLeft: '50px;'}} className="mdl-cell mdl-cell--3-col mdl-cell--middle">
					<p>
						{(this.state.txOk) ? (<span style={{color: 'green'}}>{this.state.txMessage}</span>) :
						(<span style={{color: 'red'}}>{this.state.txMessage}</span>)}
					</p>
					<button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
					onClick={() => this.openPurchase('state')}>
						Acquista il libro a {formatPrice(this.state.price)} {this.state.loading ? '..' : ''}
					</button>

					<p>
						<label className="mdl-switch mdl-js-switch mdl-js-ripple-effect">
							<input type="checkbox" className="mdl-switch__input" onClick = {() => {this.toggle('state')}}/>
							<span className="mdl-switch__label">Spedizione rapida</span>
						</label>
					</p>
				</div>
		</div>
		<p></p>
		<div className="mdl-grid" style={{border: '1px solid #ccc!important', borderRadius: '23px'}}>
					<div className="mdl-cell mdl-cell--2-col">
						<img src="/Copertina3.png" />
					</div>
					<div className="mdl-cell mdl-cell--6-col">
						<p><b>Descrizione del libro</b></p>
						<div style={{textAlign: 'justify'}}>Node.js® è un runtime Javascript costruito sul motore JavaScript V8 di Chrome. Node.js usa un modello I/O non bloccante e ad eventi, che lo rende un framework leggero ed efficiente ...</div>
					</div>
					<div style={{marginLeft: '50px;'}} className="mdl-cell mdl-cell--3-col mdl-cell--middle">
							<p>
								{(this.state.txOk2) ? (<span style={{color: 'green'}}>{this.state.txMessage2}</span>) :
								(<span style={{color: 'red'}}>{this.state.txMessage2}</span>)}
							</p>
							<button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
							onClick={() => this.openPurchase('state2')}>
								Acquista il libro a {formatPrice(this.state.price2)} {this.state.loading2 ? '..' : ''}
							</button>

							<p>
								<label className="mdl-switch mdl-js-switch mdl-js-ripple-effect">
									<input type="checkbox" className="mdl-switch__input" onClick = {() => {this.toggle('state2')}}/>
									<span className="mdl-switch__label">Spedizione rapida</span>
								</label>
							</p>
						</div>
				</div>
				<p></p>
				<div className="mdl-grid" style={{border: '1px solid #ccc!important', borderRadius: '23px'}}>
					<div className="mdl-cell mdl-cell--2-col">
						<img src="/Copertina2.png" />
						
					</div>
					<div className="mdl-cell mdl-cell--6-col">
						<p><b>Descrizione del libro</b></p>
						<div style={{textAlign: 'justify'}}>Argomenti in breve:- Installare React.js e i suoi strumenti- Creare e controllare le proprietà degli elementi- Introdurre JSX nel processo di sviluppo- Lavorare con i componenti React- Gestire lo stato ...</div>
					</div>
					<div style={{marginLeft: '50px;'}} className="mdl-cell mdl-cell--3-col mdl-cell--middle">
							<p>
								{(this.state.txOk1) ? (<span style={{color: 'green'}}>{this.state.txMessage1}</span>) :
								(<span style={{color: 'red'}}>{this.state.txMessage1}</span>)}
							</p>
							<button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
							onClick={() => this.openPurchase('state1')}>
								Acquista il libro a {formatPrice(this.state.price1)} {this.state.loading1 ? '..' : ''}
							</button>

							<p>
								<label className="mdl-switch mdl-js-switch mdl-js-ripple-effect">
									<input type="checkbox" className="mdl-switch__input" onClick = {() => {this.toggle('state1')}}/>
									<span className="mdl-switch__label">Spedizione rapida</span>
								</label>
							</p>
						</div>
				</div>
				<script src="https://checkout.stripe.com/checkout.js"></script>
			</div>
		)
	}

}
