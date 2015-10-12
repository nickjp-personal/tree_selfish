Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.tree.*'
]);

Ext.onReady(function() {
    //we want to setup a model and store instead of using dataUrl
    Ext.define('List', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'name', type: 'string'},
            {name: 'size', type: 'string'},
            {name: 'time', type: 'string'}
        ]
    });

    var store = Ext.create('Ext.data.TreeStore', {
        model: 'List',
        proxy: {
            type: 'ajax',
            //the store will get the content from the .json file
            url: 'list.json'
        },
        folderSort: true
    });

    //Ext.ux.tree.TreeGrid is no longer a Ux. You can simply use a tree.TreePanel
    var tree = Ext.create('Ext.tree.Panel', {
        title: 'File List',
        // width: 500,
        // height: 300,
        renderTo: Ext.getBody(),
        collapsible: true,
        useArrows: true,
        rootVisible: false,
        store: store,
        multiSelect: true,
        singleExpand: false,
        //the 'columns' property is now 'headers'
        columns: [{
            xtype: 'treecolumn', //this is so we know which column will show the tree
            text: 'Path',
            flex: 2,
            sortable: true,
            dataIndex: 'name'
        },{
            text: 'Size',
            flex: 1,
            sortable: true,
            dataIndex: 'size'
        },{
            text: 'Time',
            flex: 1,
            sortable: true,
            dataIndex: 'time'
        }]
    });
});
