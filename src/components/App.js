/** Libraries */
import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Container, Row } from 'reactstrap';

/** Custom components */
import InputForm from '../components/molecules/inputForm';

/** Custom css */
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../public/css/App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Container>
					<Row>
						<h1>Write anything in and find count of words!!</h1>
					</Row>
					<InputForm />
				</Container>
			</div>
		);
	}
}

export default hot(module)(App);
