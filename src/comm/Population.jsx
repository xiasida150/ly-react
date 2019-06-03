/* global localStore */
import React, { Component, Fragment } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { getPopulationType } from './../pages/Index/api';



export default class Population extends Component {

    state = {
        typeArrs: [],
        defaultValue: [],
    };
    async componentWillMount() {
        let data = {
            hospitalId: localStore.get('hospitalId')
        }
        let PopulationType = await getPopulationType(data);
        PopulationType = this.populationTypeHandler(PopulationType)
        this.setState({
            typeArrs: PopulationType
        })
    }


    // 处理人群类型函数
    populationTypeHandler = (data) => {
        let noneValArr = [{ name: '不限', val: '', }]
        return noneValArr.concat(data).map(item => {
            return {
                label: item.name,
                value: item.val,
                disabled: false,
                checked: false,
            }
        })
    }


    onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
        const { typeArrs } = this.state;

        if (checkedValues.indexOf('') === 0) {
            this.state.typeArrs[0].checked = true;
            this.state.typeArrs[0].disabled = false;
            this.setState({
                typeArrs: this.state.typeArrs,
            })

        }
    }
    render() {
        const { typeArrs, defaultValue,  } = this.state;
        return (
            <Fragment>
                <Checkbox.Group
                    style={{ width: '100%', display: 'inline-block' }}
                    checked={this.state.checked}
                    disabled={this.state.disabled}
                    options={typeArrs}
                    defaultValue={defaultValue}
                    onChange={this.onChange}
                />
            </Fragment>
        )
    }
}
