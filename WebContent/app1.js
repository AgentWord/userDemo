/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

// @require @packageOverrides
Ext.Loader.setConfig({

});


Ext.application({
    models: [
       
        'noticeNewsModel',
        'noticeColumnsModel',
      
        'uUserRoleModel',
        'uUserInfoModel',
        'uRoleInfoModel',
        'uRightListModel',
        'uRightInfoModel',
        'uDeptInfoModel',
        'uRoleRightModel',
    ],
    stores: [
        
        'notice_newsStore',
        'notice_newsDraftStore',
        'notice_columnsStore',
        'notice_newsStore',
        
        'uDeptInfoStore',
        'uUserInfoStore',
        'uUserRoleStore',
        'uRoleInfoStore',
        'uRightInfoStore',
        'uRightListStore',

     
       
        
        'system_roleNameStore',
        'uRoleRightByIdStore',
        'uRightInfoCurUserStore',
        
    ],
    views: [
        'MainView',
        'homePanel',
        'notice_Publish',
        'notice_Management',
        'system_DepartmentManage',
        'system_RightManage',
       
        'system_DataSearch',
        'system_DataEdit',
        'system_DataManage',
        
       
        'notice_Columns',
        'notice_ColumnsWindow',
      
        'db_RightInfoAddWindow',
        'db_RightInfoWindow',
        'db_DeptInfoWindow',
        'db_RoleInfoWindow',
        'db_UserInfoEditTab',
        'db_UserInfoWindow',
        'system_UserManage',
        'db_UserRoleSettingWindow',
        'db_DeptInfoAddWindow',
        'db_UserInfoAddWindow',
        'db_RoleInfoAddWindow',
        'db_RoleInfoEditWindow',
        'db_RoleRightSettingWindow',


    ],
    name: 'MyApp',

    launch: function() {
        Ext.create('MyApp.view.MainView');
    }

});
