import * as modules from './userFrom.js';
import * as ajaxCall from './ajaxCall.js';

const baseUrl = "http://localhost:7005";

function addItem(){
  showFrom(false);
};

function updateItem(){
  let item = $$("table").getSelectedItem();
  if(item) {
    showFrom(true, item.id);
    document.getElementById('user_email').value = item.email;
    document.getElementById('user_name').value = item.name;
    document.querySelector('input[value="'+ item.role + '"]').checked=true
  } else {
    alertMessage();
  }
};

var alertMessage = () => {
  webix.ui({
    view:"window",
    height:100,
    width:300,
    close:true,
    head:"Alert",
    position:"center",
    body:{
      template:"select row first"
    }
  }).show();
}

var showFrom = (isUpdate, id) => {
  let htm = modules.getFrom();
  var win = webix.ui({
    id:"fromdata",
    view:"window",
    height: 230,
    width:400,
    scroll:"y",
    close:true,
    head: {
      view:"toolbar",
      cols:[
        {view:"label", label: "Add User" },
        { view:"button", label: 'X', width: 100, align: 'right', click:function(){
            $$("fromdata").close();
          }
         }
      ]
    },
    position:"center",
    body:{
      template:htm,
    }
  });
  win.attachEvent("onShow", function(){
    if(isUpdate) {
      modules.updateFunction(id);
    } else {
      modules.addFunction(isUpdate);
    }
  });
  win.show();
}

function removeItem(){
  let item = $$("table").getSelectedId();
  if(item) {
    $$("table").remove(item.id);
  } else {
    alertMessage();
  }
};

var grida = {
    view:"datatable",
    id: "table",
    select:"row",
    autoheight: true,
    css:"webix_header_border webix_data_border",
    hover:"myhover",
    columns:[
      { id:"name",	header:"Name", width:120 },
      { id:"email",	header:"Email", adjust:"data" },
      { id:"role",	header:"Role", width:120 }
    ],
    select:"row",
    scroll:"y",
    url: baseUrl + "/getAllUser",
    save:{
      "insert":"rest->" + baseUrl + "/addUser",
      "update":"rest->" + baseUrl + "/updateUser",
      "delete":"rest->" + baseUrl + "/removeUser"
    },
    pager:"pager"
  };
  
  var pager = {
    view:"pager",
    id:"pager",
    size:20,
    group:30,
    template:"{common.first()}{common.prev()}{common.pages()}{common.next()}{common.last()}"
  };

  webix.ready(function(){
    webix.ui({
      container:"app_here",
      padding:10, rows:[
          {template:"row 1"},
          { view:"toolbar", 
            elements:[
            { view:"button", autowidth:true, value:"Add item", click:addItem },
            { view:"button", autowidth:true, value:"Update item", click:updateItem },
            { view:"button", autowidth:true, value:"Remove item", click:removeItem }
          ]},
          grida,
          pager
      ]
    });
  });


ajaxCall.getUserData(baseUrl + "/getlUsersForChart", (data)=>{
  let user_count = 0, super_admin_count = 0, admin_count = 0;
  for(let obj of data.data) {
    switch(obj.role) {
      case 'user': 
                  user_count++;
                  break;
      case 'admin': 
                  admin_count++;
                  break;
      case 'super admin': 
                  super_admin_count++;
                  break;

    }
  }
  var data_chart = [
    {count:super_admin_count, name:"super admin", color: "#ee3639"},
    {count:admin_count, name:"admin", color: "#ee9e36"},
    {count:user_count, name:"user", color: "#eeea36"}
  ]
    webix.ready(function() {
      webix.ui({
        container:"app_from",
        view: "chart",
        type:"donut",
        value:"#count#",
        legend:{
          width: 75,
          align:"right",
          valign:"middle",
          template:"#name#"
        },
        pieInnerText:"#count#",
        shadow:0,
        gradient:true,
        height:300,
        width:400,
        data:data_chart
      });
      document.querySelector('[aria-label="Hide chart admin"]').innerText="";
    }) 
});

  //webix.event(window, 'resize', function () { table.adjust(); })
