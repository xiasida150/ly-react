/* global localStore */
import React, { Component, Fragment } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { getPopulationType } from './../pages/Index/api';



export default class Population extends Component {

    state = {
        Alloptions: [{
            label: '不限',
            value: '',
            key: '',
            defaultChecked: true,
        }],
        textarr: []
    };
    async componentWillMount() {
        let data = {
            hospitalId: localStore.get('hospitalId')
        }
        let PopulationType = await getPopulationType(data);
        PopulationType = this.populationTypeHandler(PopulationType)
        this.setState({
            textarr: PopulationType,
        })
    }


    // 处理人群类型函数
    populationTypeHandler = (data) => {
        return data.map(item => {
            return {
                label: item.name,
                value: item.val,
                key: item.val,
                defaultChecked: false,
            }
        })
    }



    onChange = (e) => {
        const { textarr, Alloptions } = this.state
        if (e.target.checked) {
            Alloptions.map(i => {
                i.defaultChecked = false
                i.checked = false
            })
            var o = textarr.filter(i => i.value === e.target.value)[0];
            o.defaultChecked = true
            o.checked = true
            this.setState({
                Alloptions,
                textarr
            })
        }
    }

    onChangeCancel = (e) => {
        const { textarr, Alloptions } = this.state
        if (e.target.checked) {
            textarr.map(i => {
                i.defaultChecked = false
                i.checked = false
            })
            Alloptions[0].defaultChecked = true
            Alloptions[0].checked = true
            this.setState({
                textarr,
                Alloptions
            })
        }
    }


    render() {
        const { options, Alloptions, textarr } = this.state
        return (
            <Fragment>
                {
                    Alloptions.map(i => <Checkbox onChange={this.onChangeCancel} {...i}  >{i.label}</Checkbox>)
                }
                {
                    textarr.map(i => <Checkbox onChange={this.onChange}  {...i} >{i.label}</Checkbox>)
                }
            </Fragment>
        )
    }
}
