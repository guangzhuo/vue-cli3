const V = '/v1';

export default {
    "logins": `${V}/user_login`, //用户登陆
    "contractList": `${V}/getContractList`, //合同列表展示
    "getContractDetail": `${V}/getContractDetail`, //合同详情
    "updateContract": `${V}/updateContract`, //合同修改
    "changeContract": `${V}/changeContractStatus`, //合同确认，驳回
    "stafflist": `${V}/staff_list`, //员工列表
    "getAllActivities": `${V}/getAllActivities`, //活动列表
    "deleteActivity": `${V}/deleteActivity`, //删除活动
    "addActivity": `${V}/addActivity`, //添加活动
    "updateActivity": `${V}/updateActivity`, //更新活动
    "getActivityDetail": `${V}/getActivityDetail`, //活动详情
    "takeActivityEffective": `${V}/takeActivityEffective`, //活动生效
    "takeActivityExpired": `${V}/takeActivityExpired`, //活动下线
    "replace_list": `${V}/replace_list`, //补货管理
    "replace_detail": `${V}/replace_detail`, //补货详情
    "order_list": `${V}/order_list`, //订单列表
    "order_detail": `${V}/order_detail`, //订单详情
    "refund": `${V}/refund`, //扣款
    "pappayapply": `${V}/pappayapply`, //收款
    "terminal_list": `${V}/terminal_list`, //柜子管理列表
    "workIndex": `${V}/work_index`, //终端统计
    "userList": `${V}/list_staff`, //员工列表
    "userDetail": `${V}/detail_staff`, //员工详情
    "updateUser": `${V}/update_staff`, //修改员工
    "addUser": `${V}/add_staff`, //增加员工
    "salesIndex": `${V}/sales_Index`, //终端数据
    "cliIndex": `${V}/cli_Index`, //终端统计
    "userImage": `${V}/image_staff`, //登录头像
    "updatePassword": `${V}/update_password` //员工修改密码


}