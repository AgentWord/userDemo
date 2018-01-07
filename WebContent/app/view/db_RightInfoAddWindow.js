/*
 * File: app/view/db_RightInfoAddWindow.js
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

Ext.define('MyApp.view.db_RightInfoAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.db_RightInfoAddWindow',

    requires: [
        'MyApp.view.db_RightInfoAddWindowViewModel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.field.Text',
        'Ext.form.field.Hidden',
        'Ext.form.field.Checkbox',
        'Ext.form.field.HtmlEditor',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button',
        'Ext.toolbar.Spacer'
    ],

    viewModel: {
        type: 'db_RightInfoAddWindow'
    },
    height: 384,
    id: 'db_RightInfoAddWindow',
    width: 630,
    layout: 'fit',
    title: '权限信息增加',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'db_RightInfoAddWindowForm',
            layout: 'auto',
            bodyPadding: 10,
            jsonSubmit: true,
            items: [
                {
                    xtype: 'fieldset',
                    title: '上一级权限信息',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'wAdd_parentRightId',
                            width: 400,
                            fieldLabel: '权限编号',
                            labelWidth: 70,
                            name: 'rightId',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: 'wAdd_parentRightName',
                            width: 400,
                            fieldLabel: '权限名称',
                            labelWidth: 70,
                            readOnly: true
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '新权限信息',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'wAdd_rightName',
                            width: 400,
                            fieldLabel: '权限名称',
                            labelWidth: 70,
                            name: 'rightName',
                            validateBlank: true
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'wAdd_rightUrl',
                            width: 400,
                            fieldLabel: '权限地址',
                            labelWidth: 70,
                            name: 'url'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'wAdd_right_enabled',
                            fieldLabel: '是否启用',
                            labelWidth: 70,
                            name: 'enabled',
                            checked: true,
                            inputValue: '1',
                            uncheckedValue: '0'
                        },
                        {
                            xtype: 'htmleditor',
                            height: 120,
                            id: 'wAdd_right_description',
                            fieldLabel: '权限说明',
                            labelWidth: 70,
                            name: 'description'
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            text: '取消',
                            listeners: {
                                click: 'onButtonClick1'
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            width: 30
                        },
                        {
                            xtype: 'button',
                            text: '确认增加',
                            listeners: {
                                click: 'onButtonClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],

    onButtonClick1: function(button, e, eOpts) {
        var win = Ext.getCmp('db_RightInfoAddWindow');
        win.close();
    },

    onButtonClick: function(button, e, eOpts) {
        var win = Ext.getCmp('db_RightInfoAddWindow');
        var myform = Ext.getCmp('db_RightInfoAddWindowForm');

        if (myform.isValid())
        { // make sure the form contains valid data before submitting
            Ext.getCmp('wAdd_parentRightName').disable();
            myform.submit({
                url : 'add_RightInfo',
                success : function (form, action)
                {
                    Ext.Msg.alert('成功', '权限信息更新成功');

                    var mystore = Ext.StoreMgr.get('uRightInfoStore'); //获得store对象
                    mystore.reload();
                    win.close();
                },
                failure: function(form, action){
                    Ext.Msg.alert('失败', '权限信息更新失败');
                    win.close();
                }
            });
        }
        else{
            Ext.Msg.alert('注意', '填写的信息有误，请检查！');
        }

        return;
    }

});