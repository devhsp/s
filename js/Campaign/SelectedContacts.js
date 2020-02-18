var Groupid = '';
var isSelectAlltrue = false;
var SelectedIds = [];

function BindSelectedContacts() {

    var API_URL = "./saveEmailContacts";
    alert("hello")
    var gridContainer = $("#gridMain");
    gridContainer.GridUnload();
    gridContainer.jqGrid({
        url: API_URL,
        datatype: 'json',
        mtype: 'GET',
        pager: '#pagernav',
        sortable: true,
        height: '100%',
        rowNum: 10,
        rowList: [10, 20, 30, 50, 100],
        viewrecords: true,
        colNames: ['cid', 'Email', 'Gid', 'Name'],
        colModel: [{
                name: 'cid',
                index: 'cid',
                key: true,
                hidden: false,
                width: 180,
                editable: true
            },
            {
                name: 'email',
                index: 'ListName',
                key: true,
                editable: true,
                width: 180
            },
            {
                name: 'gid',
                align: 'center',
                key: true,
                index: 'CreateDate',
                editable: true,
                edittype: 'text',
                width: 180
            },
            {
                name: 'name',
                index: 'Contacts',
                key: true,
                editable: true,
                edittype: 'text',
                width: 180,
                align: 'center'
            },
            
        ],
        postData: {
            GroupId: Groupid
        },
        multiselect: true,
        autowidth: true,
        sortname: 'CreateDate',
        sortorder: "desc",

        onSelectRow: function(rowid, status) {
            debugger;
            updateIdsOfSelectedRows(rowid, status);

        },

        onSelectAll: function(aRowids, status) {
        	for (var i = 0; i < aRowids.length; i++) {
        		SelectedIds.push(aRowids[i]);
            }

        },

    }).navGrid('#pagernav', {
        edit: false,
        add: false,
        del: false,
        search: false
    });

    var updateIdsOfSelectedRows = function(id, isSelected) {
        debugger;

        if (isSelected == true) {
            SelectedIds.push(id);
        } else {

            SelectedIds.pop(id);
        }
    }
}




function formateadorLink(cellvalue, options, rowObject) {
    return "&nbsp;<a class='t-button t-grid-EditGroup t-button-icon' href='http://" + location.host + "/Group/Edit/" + rowObject[0] + "?Grid-page=1&Grid-orderBy=&Grid-filter='><span class='t-icon t-edit'></span></a>" +
        "&nbsp;<a class='t-button t-grid-AddContacts t-button-icon' href='http://" + location.host + "/Contacts/SelectContactType/" + rowObject[0] + "?Grid-page=1&Grid-orderBy=&Grid-filter='><span style='background-image:url(/Images/add.png)' class='t-icon t-AddContacts'></span></a>" +
        "&nbsp;<a class='t-button t-grid-ViewContacts t-button-icon' href='http://" + location.host + "/Contacts/Index/" + rowObject[0] + "?Grid-page=1&Grid-orderBy=&Grid-filter='><span style='background-image:url(/Images/Groups.png)' class='t-icon t-ViewContacts'></span></a>"
}

var CheckedIds = [];

function ValidateGroupSelection() {
    debugger;

    var gridContainer = $("#gridMain");
    var Ids = SelectedIds;
    if (Ids.length == 0) {
        alert("Please select Contacts.");
        return false;
    } else {
        lightboxLoading_open();
        //for (var i = 0; i < Ids.length; i++) {
        //    var cl = Ids[i];
        //    CheckedIds.push($('#gridMain').jqGrid('getCell', cl, 'GroupId'));
        //    selectedIds = selectedIds + $('#gridMain').jqGrid('getCell', cl, 'GroupId') + ",";
        //}
        $.ajax({
            url: '../AddContacts',
            data: {
                id: Groupid,
                checkedRecords: Ids
            },
            traditional: true,
            success: function(result) {
                var Url = "http://" + location.host + result;
                location.href = Url;
            }
        });
        selectedIds = selectedIds.substr(0, selectedIds.length - 1)
        $("#hdSelectedIds").val(Ids);
        lightboxLoading_close();
    }
}