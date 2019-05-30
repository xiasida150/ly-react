import React, { Component } from 'react';

export default function (loading) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = { Com: null };
        };
        async componentWillMount() {
            let Com = await loading();
            this.setState({
                Com: Com.default || null
            })
        };
        render() {
            let Com = this.state.Com;
            return Com ? <Com /> : null;
        };
    };
};


