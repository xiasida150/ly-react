import Load from '@/util/lazy';

export const routes = [{
    feUrl: '/index',
    menuName: '首页',
    exact: true,
    component: ()=>'首页'
},
{
    feUrl: '/index/sign/query',
    menuName: '签约查询',
    exact: false,
    component: ()=>'签约查询'
},
{
    feUrl: '/index/health/assessment',
    menuName: '健康评估',
    exact: false,
    component: ()=>'签约查询'
},
{
    feUrl: '/index/protocol/management',
    menuName: '协议管理',
    exact: false,
},
{
    feUrl: '/index/servicePackage/management',
    menuName: '服务包管理',
    exact: false,
},
{
    feUrl: '/index/team/management',
    menuName: '团队管理',
    exact: false,
},



]