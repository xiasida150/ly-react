import Load from '@/util/lazy';

export const routes = [{
    feUrl: '/index',
    menuName: '首页',
    exact: false,
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
{
    feUrl: '/contract/service',
    menuName: '签约服务记录表',
    exact: false,
    component: ()=>'签约服务记录表'
},
{
    feUrl: '/people/files',
    menuName: '居民健康档案',
    Breadcrumb:'档案管理,居民健康档案',
    exact: false,
    component: Load(() => import('@/pages/views/healthRecord')),
},



]