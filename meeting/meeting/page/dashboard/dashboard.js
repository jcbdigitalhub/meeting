frappe.provide('meeting');
frappe.pages['dashboard'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Dashboard',
		single_column: true
	});
/*frappe.provide('meeting');

frappe.pages['crm-dashboard'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'CRM Dashboard',
		single_column: true
	});*/

	new meeting.CrmDashboard(wrapper, page);
	  $("<div class='container'>\
  <div id='pager' style='width:100%;height:20px;'></div>\
  <div class='row'>\
        <div class='col-lg-11 col-md-8 col-sm-8 col-xs-9 bhoechie-tab-container'>\
            <div class='col-lg-2 col-md-2 col-sm-3 col-xs-3 bhoechie-tab-menu'>\
              <div class='list-group'>\
                <a href='#' class='list-group-item active text-center'>\
                  <h4 class='glyphicon glyphicon-plane'></h4><br/>Customer\
                </a>\
                <a href='#' class='list-group-item text-center'>\
                  <h4 class='glyphicon glyphicon-credit-card'></h4><br/>Supplier\
                </a>\
                <a href='#' class='list-group-item text-center'>\
                  <h4 class='glyphicon glyphicon-road'></h4><br/>Item\
                </a>\
                <a href='#' class='list-group-item text-center'>\
                  <h4 class='glyphicon glyphicon-home'></h4><br/>Wards\
                </a>\
                <a href='#' class='list-group-item text-center'>\
                  <h4 class='glyphicon glyphicon-cutlery'></h4><br/>Stocks\
                </a>\
                <a href='#' class='list-group-item text-center'>\
                  <h4 class='glyphicon glyphicon-plane'></h4><br/>Surgeon\
                </a>\
              </div>\
            </div>\
            <div class='col-lg-10 col-md-9 col-sm-9 col-xs-9 bhoechie-tab'>\
                <!-- flight section -->\
                <div class='bhoechie-tab-content active'>\
                    <center>\
                      <span id='addCustomer'></span>\
                      <span id='additem'></span>\
                      <div class='col-md-12'>\
                        <div style='width:800px;'>\
                          <div id='customerGrid' style='width:100%;height:500px;'></div>\
                          <div id='pager' style='width:100%;height:20px;''></div>\
                        </div>\
                      </div>\
                    </center>\
                </div>\
                <!-- Trainn section -->\
                <div class='bhoechie-tab-content'>\
                    <center>\
                      <div class='col-md-10'>\
                        <div id='chart-content_1' style=''></div>\
                        <div id='chart-content_2'></div>\
                      </div>\
                    </center>\
                </div>\
                <div class='bhoechie-tab-content'>\
                    <center>\
                      <h1 class='glyphicon glyphicon-home' style='font-size:12em;color:#55518a'></h1>\
                      <h2 style='margin-top: 0;color:#55518a'>Cooming Soon</h2>\
                    </center>\
                </div>\
                <!-- hotel search -->\
                <div class='bhoechie-tab-content'>\
                    <center>\
                      <h1 class='glyphicon glyphicon-home' style='font-size:12em;color:#55518a'></h1>\
                      <h2 style='margin-top: 0;color:#55518a'>Cooming Soon</h2>\
                    </center>\
                </div>\
                <div class='bhoechie-tab-content'>\
                    <center>\
                      <h1 class='glyphicon glyphicon-cutlery' style='font-size:12em;color:#55518a'></h1>\
                      <h2 style='margin-top: 0;color:#55518a'>Cooming Soon</h2>\
                    </center>\
                </div>\
                <div class='bhoechie-tab-content'>\
                    <center>\
                      <span id='addSur'></span>\
                      <div class='col-md-12'>\
                        <div style='width:800px;'>\
                          <div id='myGrid' style='width:100%;height:500px;'></div>\
                        </div>\
                      </div>\
                    </center>\
                </div>\
            </div>\
        </div>\
    </div>\
  </div>").appendTo($(wrapper).find('.layout-main'));


  	/*$("<div class='row'>\
	  	<div class='party-area col-xs-12'>\
			<div id='myGrid' class='mygraph' style='width:100%;height:500px;''></div>\
		</div>\
	</div>").appendTo($(wrapper).find('.layout-main-section'));*/

	frappe.breadcrumbs.add("Meeting");

}
meeting.CrmDashboard = Class.extend({
	init: function(wrapper, page) {
		// $.extend(this, opts);
		this.create_customer(wrapper);
/*		this.make_party();
		this.prepare_data();*/
        page.set_title(__("Dashboard") + " - " + __("CRM"));

    	var datacust = []; 
	    frappe.call({
	      method: "meeting.meeting.page.dashboard.dashboard.get_customer",
	      async:true,
	      callback: function(r) {

	          $(function() {
	            $.each(r.message, function(i, item) {
	              //console.log(item);
	              var d = (datacust[i] = {});
	              d["id"] = i+1,
	              d["customer_name"] = item.customer_name;
	              d["customer_type"] = item.customer_type;
	              d["customer_group"] = item.customer_group;
	              d["territory"] = item.territory;
	              i = i+1;
	              // console.log(item,"in data")
	            });
	          });
	        //console.log(data);
	        setTimeout(function(){ 
	            var htmlinv = frappe.render_template("table_data_customer", {"datacust":datacust})
	            // console.log(htmlinv,"htmll patient");
	            $("#customerGrid").html(htmlinv);
	             

	            frappe.require(['/assets/meeting/js/jquery.dataTables.min.js',
	              '/assets/meeting/js/jquery.dataTables.min.css', 
	              '/assets/meeting/js/dataTables.responsive.js', 
	              '/assets/meeting/js/responsive.dataTables.css'], function() {
	              /*$('#patientTable').DataTable();*/
	              $('#customerTable').DataTable( {
	                  responsive: true
	              });
	            });
	        },700);
	     }
	  });

	},
	create_customer: function(wrapper){
     	var d = new frappe.ui.Dialog({
			title: __("Add Customer"),
			fields: [

			{
			  "label": __("Full Name"), 
			  "fieldname": "customer_name",
			  "fieldtype": "Data", 
			  "reqd": 1
			},
			{
			  "label": __("Type"), 
			  "fieldname": "customer_type",
			  "fieldtype": "Select", 
			  "options":["Company","Individual"]
			},
			{
			  "label": __("Customer Group"), 
			  "fieldname": "customer_group",
			  "fieldtype": "Link",
			  "options":"Customer Group" 

			},
			{
			  "fieldname":"cb2",
			  "fieldtype":"Column Break",
			},
			{
			  "label": __("Territory"), 
			  "fieldname": "territory",
			  "fieldtype": "Link",
			  "options":"Territory" 
			},

			{
			  "label": __("Image"), 
			  "fieldname": "image",
			  "fieldtype": "Attach Image", 
			},
			{
			  "label": __("Disabled"), 
			  "fieldname": "disabled",
			  "fieldtype": "Check", 
			},
			],
			primary_action_label: "Save",
			primary_action: function(){
			//msgprint("hi");
			args = d.get_values();
			if(!args) return;
			console.log(args);
			frappe.call({
				method: "meeting.meeting.page.dashboard.dashboard.save_customer",
				args: {
				"customer_name": args.customer_name,
				"customer_type": args.customer_type,
				"customer_group":args.customer_group,
				"territory": args.territory,
				"image":args.image,
				"disabled":args.disabled,
			},  
				callback: function(r) {
					msgprint("Customer added")
				}
				});
		        d.hide();
	       }
	    });
     	// d.show();

  		//add button to create customer

		this.elements = {
			layout: $(wrapper).find(".addCustomer"),
			add_customer:  wrapper.page.add_field({
			fieldname: "add_customer",
			label: __("Add Customer"),
			fieldtype: "Button",
			icon: "icon-upload"
			})
		};
     	 this.elements.add_customer.$input.on("click", function() {
	      // me.get_data(this);
	      d.show();
	    });

     },
     create_item: function(wrapper){
        var d = new frappe.ui.Dialog({
            title: __("Add Item"),
            fields: [

            {
              "label": __("Item Code"), 
              "fieldname": "item_code",
              "fieldtype": "Data", 
              "reqd": 1
            },
            {
              "label": __("Item Name"), 
              "fieldname": "item_name",
              "fieldtype": "Data", 
            },
            {
              "label": __("Item Group"), 
              "fieldname": "item_group",
              "fieldtype": "Link",
              "options":"Item Group" 

            },
            {
              "fieldname":"cb2",
              "fieldtype":"Column Break",
            },
            {
              "label": __("Default Unit of Measure"), 
              "fieldname": "stock_uom",
              "fieldtype": "Link",
              "options":"UOM" 
            },
            {
              "label": __("Disabled"), 
              "fieldname": "disabled",
              "fieldtype": "Check", 
            },
            ],
            primary_action_label: "Save",
            primary_action: function(){
            //msgprint("hi");
            args = d.get_values();
            if(!args) return;
            console.log(args);
            frappe.call({
                method: "meeting.meeting.page.dashboard.dashboard.save_item",
                args: {
                "item_code": args.item_code,
                "item_name": args.item_name,
                "item_group":args.item_group,
                "stock_uom": args.stock_uom,
                "disabled":args.disabled,
            },  
                callback: function(r) {
                    msgprint("Item added")
                }
                });
                d.hide();
           }
        });
        // d.show();

        //add button to create customer

        this.elements = {
            layout: $(wrapper).find(".additem"),
            add_item:  wrapper.page.add_field({
            fieldname: "add_item",
            label: __("Add Item"),
            fieldtype: "Button",
            icon: "icon-upload"
            })
        };
         this.elements.add_item.$input.on("click", function() {
          // me.get_data(this);
          d.show();
        });

     }
});
