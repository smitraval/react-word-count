import React from 'react';
import { Row, Form, FormGroup, Input, Button, Badge, Table } from 'reactstrap';
import voca from 'voca';
import axios from 'axios';

import { API_URL } from '../../helper/constant';
import { compressArray } from '../../helper/arrayWordsCount';

class InputForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInput: "",
            counts: [],
            colors: ["primary", "success", "info", "warning", "danger"],
            words: []
        }

        this.onBtnClick = this.onBtnClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.getAllWords = this.getAllWords.bind(this);
        this.saveWords = this.saveWords.bind(this);
    }

    onBtnClick() {
        var counts = compressArray(voca.words(voca.lowerCase(this.state.userInput)));
        this.setState({ counts }, () => {
            this.saveWords();
        });
    }

    onInputChange(e) {
        this.setState({ userInput: e.target.value });
    }

    saveWords() {
        let _this = this;
        axios({
            method: 'post',
            url: API_URL+'add_words',
            data: _this.state.counts
        }).then(function (response) {
            _this.getAllWords();
        });
    }

    getAllWords() {
        let _this = this;
        axios({
            method: 'get',
            url: API_URL+'get_words'
        }).then(function (response) {
            _this.setState({ words: response.data.words })
        });
    }

    componentDidMount() {
        this.getAllWords();
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Form>
                        <FormGroup>
                            <Input type="textarea" value={this.state.userInput} onChange={this.onInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" onClick={this.onBtnClick}>Add</Button>
                        </FormGroup>
                    </Form>
                </Row>
                {
                    (this.state.counts.length > 0) &&
                    <Row>
                        <h1>Word Counts</h1>
                    </Row>
                }
                <Row>
                    {this.state.counts.map((k, v) => {
                        return (
                            <Button key={v} className="mar-right-20" color={(k.count > 4) ? this.state.colors[4] : this.state.colors[k.count]}>
                                {k.word} <Badge color="secondary">{k.count}</Badge>
                            </Button>
                        )
                    })}
                </Row>
                {
                    (this.state.words.length > 0) &&
                    <React.Fragment>
                        <Row>
                            <h1>Word History Table</h1>
                        </Row>
                        <Row>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Word</th>
                                        <th>Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.words.map((k, v) => {
                                        return (
                                            <tr key={v}>
                                                <th>{v + 1}</th>
                                                <td>{k.word}</td>
                                                <td>{k.count}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Row>
                    </React.Fragment>
                }
            </React.Fragment>

        );
    }
}

export default InputForm;