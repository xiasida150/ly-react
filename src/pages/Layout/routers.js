import Load from '@/util/lazy';

export const routes = [{
    feUrl: '/index',
    menuName: '首页',
    exact: true,
    component: ()=>'首页'
},
{
    feUrl: '/sign/query',
    menuName: '签约查询',
    exact: false,
    component: ()=>'签约查询'
},
{
    feUrl: '/health/assessment',
    menuName: '健康评估',
    exact: false,
    component: ()=>'健康评估'
},
{
    feUrl: '/protocol/management',
    menuName: '协议管理',
    exact: false,
    component: ()=>'协议管理'
},
{
    feUrl: '/servicePackage/management',
    menuName: '服务包管理',
    exact: false,
    component: ()=>'服务包管理'
},
{
    feUrl: '/team/management',
    menuName: '团队管理',
    exact: false,
    component: ()=>'团队管理'
},



]