/*
 * File: app/view/achievement_ExcelExport.js
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

Ext.define('MyApp.view.achievement_ExcelExport', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.achievement_ExcelExport',

    requires: [
        'MyApp.view.achievement_ExcelExportViewModel',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.tree.Panel',
        'Ext.tree.View'
    ],

    viewModel: {
        type: 'achievement_excelexport'
    },
    autoScroll: true,
    height: 392,
    width: 741,
    layout: 'border',
    title: '数据报表导出',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'panel',
            region: 'center',
            layout: 'border',
            dockedItems: [
                {
                    xtype: 'form',
                    dock: 'top',
                    height: 45,
                    id: 'queryFileForm1',
                    layout: 'auto',
                    bodyPadding: 0,
                    title: '',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'combobox',
                                    formBind: false,
                                    id: 'kfqnameText1',
                                    width: 280,
                                    fieldLabel: '开发区',
                                    labelWidth: 50,
                                    name: 'kfqname',
                                    allowBlank: false,
                                    allowOnlyWhitespace: false,
                                    displayField: 'kfqmc',
                                    forceSelection: true,
                                    valueField: 'kfqdm',
                                    valueNotFoundText: '无记录'
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'kfqyearText1',
                                    width: 140,
                                    fieldLabel: '年度',
                                    labelWidth: 40,
                                    name: 'kfqyear',
                                    allowBlank: false,
                                    allowOnlyWhitespace: false,
                                    editable: false,
                                    forceSelection: true,
                                    store: [
                                        2010,
                                        2011,
                                        2012,
                                        2013,
                                        2014,
                                        2015,
                                        2016,
                                        2017,
                                        2018,
                                        2019,
                                        2020,
                                        2021,
                                        2022,
                                        2023,
                                        2024,
                                        2025,
                                        2026,
                                        2027,
                                        2028,
                                        2029,
                                        2030
                                    ],
                                    listeners: {
                                        change: 'onKfqyearTextChange1'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var kfqname=Ext.getCmp('kfqnameText1').getDisplayValue();
                                        var kfqdm=Ext.getCmp('kfqnameText1').value;
                                        var kfqyear=Ext.getCmp('kfqyearText1').value;
                                        var mystore = Ext.StoreMgr.get('ExcelExportionStore'); //获得store对象
                                        mystore.reload({
                                            params:{
                                                kfqmc:kfqname,
                                                kfqyear:kfqyear,
                                                kfqdm:kfqdm
                                            }
                                        });
                                    },
                                    icon: 'images/table/search.png',
                                    text: '查询'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var grid = Ext.getCmp('ExcelExportGridPanel');
                                        var record = grid.getSelectionModel().getSelection();
                                        var length=record.length;
                                        var kfqname=Ext.getCmp('kfqnameText1').getDisplayValue();
                                        var kfqdm=Ext.getCmp('kfqnameText1').value;
                                        var kfqyear=Ext.getCmp('kfqyearText1').value;
                                        console.log(kfqname+kfqyear);
                                        if(length === 0||length === 1){
                                            Ext.Msg.alert('提示','请先选择您要导出的表格（至少2条）！');
                                            return;
                                        }else if(kfqname===''){
                                            Ext.Msg.alert('提示','请先选择开发区！');
                                            return;
                                        }else if(kfqyear===''&&kfqyear.length!=4){
                                            Ext.Msg.alert('提示','请先选择评价年度！');
                                            return;
                                        }else{
                                            var modelName=[length];
                                            var excelSimpleName=[length];
                                            var excelName=[length];
                                            var able=true;
                                            for(var i=0;i<length;i++){
                                                able=record[i].get('exportAble');
                                                if(able===false){
                                                    Ext.Msg.alert('提示','不能导出无数据的表格！');
                                                    return;
                                                }
                                                modelName[i]=record[i].get('modelName');
                                                excelSimpleName[i]=record[i].get('excelSimpleName');
                                                excelName[i]=record[i].get('excelName');
                                            }
                                            Ext.Ajax.request({
                                                url:'achieve/export_excel_zip',
                                                method:'post',
                                                params:{
                                                    modelName:modelName,
                                                    excelSimpleName:excelSimpleName,
                                                    excelName:excelName,
                                                    kfqname:kfqname,
                                                    kfqyear:kfqyear,
                                                    kfqDM:kfqdm
                                                },
                                                success:function(response){
                                                    if(response.responseText===null)return;
                                                    var result=JSON.parse(response.responseText);
                                                    console.log(result);
                                                    var url="achieve/download_file?filepath="+result.filepath+"&filename="+result.filename;
                                                    window.open(url);
                                                },
                                                failure:function(){
                                                    Ext.Msg.alert('提示','打包导出请求失败！');
                                                }
                                            });
                                        }
                                    },
                                    icon: 'images/table/download.png',
                                    text: '打包导出'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var grid = Ext.getCmp('ExcelExportGridPanel');
                                        var record = grid.getSelectionModel().getSelection();
                                        var length=record.length;
                                        var kfqname=Ext.getCmp('kfqnameText1').getDisplayValue();
                                        var kfqdm=Ext.getCmp('kfqnameText1').value;
                                        var kfqyear=Ext.getCmp('kfqyearText1').value;
                                        console.log(kfqname+kfqyear);
                                        if(length === 0){
                                            Ext.Msg.alert('提示','请先选择您要导出的表格（至少1条）！');
                                            return;
                                        }else if(kfqname===''){
                                            Ext.Msg.alert('提示','请先选择开发区！');
                                            return;
                                        }else if(kfqyear===''&&kfqyear.length!=4){
                                            Ext.Msg.alert('提示','请先选择评价年度！');
                                            return;
                                        }else{
                                            var modelName=[length];
                                            var excelSimpleName=[length];
                                            var excelName=[length];
                                            var able=true;
                                            for(var i=0;i<length;i++){
                                                able=record[i].get('exportAble');
                                                if(able===false){
                                                    Ext.Msg.alert('提示','不能导出无数据的表格！');
                                                    return;
                                                }
                                                modelName[i]=record[i].get('modelName');
                                                excelSimpleName[i]=record[i].get('excelSimpleName');
                                                excelName[i]=record[i].get('excelName');
                                            }
                                            Ext.Ajax.request({
                                                url:'achieve/export_excel_to_achieve',
                                                method:'post',
                                                params:{
                                                    modelName:modelName,
                                                    excelSimpleName:excelSimpleName,
                                                    excelName:excelName,
                                                    kfqname:kfqname,
                                                    kfqyear:kfqyear,
                                                    kfqDM:kfqdm
                                                },
                                                success:function(response){
                                                    if(response.responseText===false)Ext.Msg.alert('提示','导出到成果目录失败！');
                                                    else  Ext.Msg.alert('提示','导出到成果目录成功！');
                                                },
                                                failure:function(){
                                                    Ext.Msg.alert('提示','导出请求失败！');
                                                }
                                            });
                                        }
                                    },
                                    icon: 'images/table/go.png',
                                    text: '导出到成果目录'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    hidden: true,
                    items: [
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var records=Ext.getCmp('excel_treeView').getView().getChecked(),
                                    names = [];

                                Ext.Array.each(records, function(rec){
                                    names.push(rec.get('name'));
                                });

                                Ext.MessageBox.show({
                                    title: 'Selected Nodes',
                                    msg: names.join('<br />'),
                                    icon: Ext.MessageBox.INFO
                                });
                            },
                            text: 'checked'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    autoScroll: true,
                    id: 'ExcelExportGridPanel',
                    store: 'ExcelExportionStore',
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 450,
                            dataIndex: 'excelName',
                            text: '表名'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var exportAble=record.get('exportAble');
                                console.log(exportAble);
                                if(exportAble==false)return '<span style="color:#FF4040;">无</span>';
                                else{
                                    //此方法文件路径中有空格，不适用 用replace方法把空格替换为%20
                                    var modelName=record.get('modelName').replace(/\s+/g,"%20");
                                    var excelSimpleName=record.get('excelSimpleName').replace(/\s+/g,"%20");
                                    var kfqName=record.get('kfqName').replace(/\s+/g,"%20");
                                    var kfqDM=record.get('kfqDM').replace(/\s+/g,"%20");
                                    var kfqYear=record.get('kfqYear').replace(/\s+/g,"%20");
                                    var excelName=record.get('excelName').replace(/\s+/g,"%20");

                                    return '<a href=achieve/export_excel?modelName='+modelName+"&excelName="+excelName+"&excelSimpleName="+excelSimpleName+"&kfqName="+kfqName+"&kfqDM="+kfqDM+"&kfqYear="+kfqYear+">导出</a>";
                                }
                            },
                            dataIndex: 'string',
                            text: '导出'
                        }
                    ],
                    selModel: {
                        selType: 'checkboxmodel'
                    }
                }
            ]
        },
        {
            xtype: 'treepanel',
            region: 'west',
            split: true,
            hidden: true,
            id: 'excel_treeView',
            modelValidation: false,
            width: 250,
            frameHeader: false,
            title: '',
            root: {
                expanded: true,
                children: [
                    {
                        checked: true,
                        text: '表F.1 开发区基本信息调查表（Ⅰ）',
                        leaf: true,
                        name: 'F1'
                    },
                    {
                        checked: true,
                        text: '表F.2 开发区基本信息调查表（Ⅱ）',
                        leaf: true,
                        icon: '',
                        name: 'F2'
                    },
                    {
                        checked: true,
                        text: '表F.3 开发区用地审批及调整情况调查表',
                        leaf: true,
                        icon: '',
                        name: 'F3'
                    }
                ]
            },
            rootVisible: false,
            useArrows: true,
            viewConfig: {

            }
        }
    ],

    onKfqyearTextChange1: function(field, newValue, oldValue, eOpts) {
        var kfqname=Ext.getCmp('kfqnameText1').getDisplayValue();
        var kfqdm=Ext.getCmp('kfqnameText1').value;
        if(kfqname===null||kfqname==="")return;
        var kfqyear=newValue;
        var mystore = Ext.StoreMgr.get('ExcelExportionStore'); //获得store对象
        mystore.reload({
           params:{
                kfqmc:kfqname,
                kfqyear:kfqyear,
               kfqdm:kfqdm
           }
        });
    }

});