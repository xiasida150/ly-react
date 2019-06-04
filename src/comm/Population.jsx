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
            checked: true,
        }],
        reselutValue: [],
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
            }
        })
    }



    onChange = (e) => {
        const { Alloptions, textarr, reselutValue } = this.state
        const obj = textarr.filter(i => i.value === e.target.value)[0]
        const { onChange } = this.props

        if (Alloptions[0].checked) {
            Alloptions[0].defaultChecked = false
            Alloptions[0].checked = false
        }
        if (e.target.checked) {
            obj.checked = true
            reselutValue.push(e.target.value)
        } else {
            obj.checked = false
            reselutValue.splice(reselutValue.indexOf(e.target.value), 1)
        }
        this.setState({
            Alloptions,
            textarr
        })
        onChange(reselutValue)
    }

    onChangeCancel = (e) => {
        const { Alloptions, textarr, reselutValue } = this.state;
        const { onChange } = this.props
        if (e.target.checked) {
            Alloptions[0].checked = true
            textarr.map(i => {
                i.checked = false
            })
        }
        this.setState({
            Alloptions,
            textarr,
            reselutValue:[],
        })
        onChange([])
    }


    render() {
        const { Alloptions, textarr, reselutValue } = this.state
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
