/*
 * File: app/view/notice_Columns.js
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

Ext.define('MyApp.view.notice_Columns', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.notice_Columns',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.selection.CheckboxModel'
    ],

    height: 588,
    width: 786,
    layout: 'fit',
    title: '通知通告栏目管理',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'gridpanel',
            id: 'notice_ColumnsGrid',
            store: 'notice_columnsStore',
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'columnName',
                    text: '栏目名称'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'description',
                    text: '备注'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            icon: 'images/table/add.png',
                            text: '添加栏目',
                            listeners: {
                                click: 'onButtonClick'
                            }
                        },
                        {
                            xtype: 'button',
                            icon: 'images/table/edit.png',
                            text: '修改栏目',
                            listeners: {
                                click: 'onButtonClick1'
                            }
                        },
                        {
                            xtype: 'button',
                            icon: 'images/table/delete.png',
                            text: '删除栏目',
                            listeners: {
                                click: 'onButtonClick2'
                            }
                        }
                    ]
                }
            ],
            selModel: {
                selType: 'checkboxmodel'
            }
        }
    ],

    onButtonClick: function(button, e, eOpts) {
        var win = Ext.widget('notice_ColumnsWindow');
        win.show();
    },

    onButtonClick1: function(button, e, eOpts) {
        //获取数据
        var records = Ext.getCmp('notice_ColumnsGrid').getSelection();
        if (records.length === 0){
            Ext.Msg.alert('提示', '请选择一条数据后再修改信息。');
            return;
        } else if(records.length >1){
            Ext.Msg.alert('提示', '每次只能修改一条信息，请重新选择。');
            return;
        }
        //启动窗口
        var win = Ext.widget('notice_ColumnsWindow');
        win.setTitle('修改栏目');
        win.show();

        //改变Ajax url
        var form = Ext.getCmp('notice_ColumnsWindowForm').getForm();
        form.loadRecord(records[0]);
        form.url='update_NoticeColumns';
    },

    onButtonClick2: function(button, e, eOpts) {
        //获取数据
        var records = Ext.getCmp('notice_ColumnsGrid').getSelection();
        if (records.length === 0){
           Ext.Msg.alert('提示', '请选择一条数据后再点击删除按钮。');
           return;
        }else if(records.length >1){
           Ext.Msg.alert('提示', '每次只能删除一条栏目。');
           return;
        }
        var id = records[0].get("id");
        var columnName= records[0].get("columnName");
        Ext.Msg.confirm('提示', '您正在删除<br/>[' +columnName+']栏目。<br/> 确认删除？', getResult);


        function getResult(confirm)
        {
            console.log('confirm:', confirm);
            if (confirm == "yes"){
                Ext.Ajax.request(
                {
                    url : 'del_NoticeColumnById',
                    params :
                    {
                        id : id
                    },
                    success : function (response){
                        Ext.Msg.alert('成功提示', '记录删除成功。');
                        var mystore = Ext.StoreMgr.get('notice_columnsStore');
                        mystore.load();
                    },
                    failure : function (response){
                        Ext.Msg.alert('失败提示', '记录删除失败。');
                    }
                });
            }
        }
    }

});