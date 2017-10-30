frappe.provide('meeting');

frappe.pages['crm-dashboard'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'CRM Dashboard',
		single_column: true
	});

	new meeting.CrmDashboard(wrapper, page);
	$("<br><div class='row'><div class='addCustomer col-xs-4' style='margin-left:10px;'> </div><div class='party-area col-xs-8'>\
	 </div><br><br></div>").appendTo($(wrapper).find('.layout-main-section'));


  	$("<div class='row'>\
	  	<div class='party-area col-xs-12'>\
			<div id='myGrid' class='mygraph' style='width:100%;height:500px;''></div>\
		</div>\
	</div>").appendTo($(wrapper).find('.layout-main-section'));

	frappe.breadcrumbs.add("Meeting");

}
meeting.CrmDashboard = Class.extend({
	init: function(wrapper, page) {
		// $.extend(this, opts);
		this.make_graph(wrapper, page);
		this.create_customer(wrapper);
		// this.make_party();
		// this.prepare_data();
        page.set_title(__("Dashboard") + " - " + __("CRM"));


	},
	make_graph: function(wrapper,page){
		let months = ['August, 2016', 'September, 2016', 'October, 2016', 'November, 2016',
			'December, 2016', 'January, 2017', 'February, 2017', 'March, 2017', 'April, 2017',
			'May, 2017', 'June, 2017', 'July, 2017'];

		let values1 = [24100, 31000, 17000, 12000, 27000, 16000, 27400, 11000, 8500, 15000, 4000, 20130];
		let values2 = [17890, 10400, 12350, 20400, 17050, 23000, 7100, 13800, 16000, 20400, 11000, 13000];
		let goal = 25000;
		let current_val = 20130;

		setTimeout(function(){ 
			let g = new frappe.ui.Graph({
				parent: $('.mygraph').empty(),
				height: 200,					// optional
				mode: 'line',					// 'line', 'bar' or 'percentage'

				title: 'Sales',
				subtitle: 'Monthly',

				y: [
					{
						title: 'Data 1',
						values: values1,
						formatted: values1.map(d => '$ ' + d),
						color: 'green'		// Indicator colors: 'grey', 'blue', 'red',
									// 'green', 'light-green', 'orange', 'purple', 'darkgrey',
									// 'black', 'yellow', 'lightblue'
					},
					{
						title: 'Data 2',
						values: values2,
						formatted: values2.map(d => '$ ' + d),
						color: 'light-green'
					}
				],

				x: {
					values: months.map(d => d.substring(0, 3)),
					formatted: months
				},

				specific_values: [
					{
						name: 'Goal',
						line_type: 'dashed',	// 'dashed' or 'solid'
						value: goal
					},
				],

				summary: [
					{
						name: 'This month',
						color: 'orange',
						value: '$ ' + current_val
					},
					{
						name: 'Goal',
						color: 'blue',
						value: '$ ' + goal
					},
					{
						name: 'Completed',
						color: 'green',
						value: (current_val/goal*100).toFixed(1) + "%"
					}
				]
			});
		},500);

     },
     create_customer: function(wrapper){
     	var d = new frappe.ui.Dialog({
			title: __("Add Customer"),
			fields: [

			{
			  "label": __("First Name"), 
			  "fieldname": "first_name",
			  "fieldtype": "Data", 
			  "reqd": 1
			},
			{
			  "label": __("Last Name"), 
			  "fieldname": "last_name",
			  "fieldtype": "Data", 
			  "reqd": 1
			},
			{
			  "label": __("Gender"), 
			  "fieldname": "gender",
			  "fieldtype": "Select", 
			  "options":["Male","Female"]
			},
			{
			  "label": __("Email"), 
			  "fieldname": "email",
			  "fieldtype": "Data", 
			  "reqd": 1
			},
			{
			  "label": __("Contact No."), 
			  "fieldname": "contact_no",
			  "fieldtype": "Int", 
			},
			{
			  "fieldname":"cb1",
			  "fieldtype":"Column Break",
			},
			{
			  "label": __("Mobile No."), 
			  "fieldname": "mobile_no",
			  "fieldtype": "Data", 
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
			{
			  "fieldname":"sb1",
			  "fieldtype":"Section Break",
			},
			{
			  "label": __("Address"), 
			  "fieldname": "address",
			  "fieldtype": "Small Text", 
			},
			{
			  "fieldname":"cb2",
			  "fieldtype":"Column Break",
			},
			{
			  "label": __("Counrty"), 
			  "fieldname": "country",
			  "fieldtype": "Data", 
			},
			{
			  "label": __("Postal Code"), 
			  "fieldname": "postal_code",
			  "fieldtype": "Int", 
			},
			],
			primary_action_label: "Save",
			primary_action: function(){
			//msgprint("hi");
			args = d.get_values();
			if(!args) return;
			console.log(args);
			frappe.call({
				method: "clinic_management.clinic_management.page.dashboard.dashboard.save_doctor",
				args: {
				"first_name": args.first_name,
				"last_name": args.last_name,
				"gender":args.gender,
				"email": args.email,
				"contact_no":args.contact_no,
				"mobile_no": args.mobile_no,
				"image":args.image,
				"disabled":args.disabled,
				"address":args.address,
				"country":args.country,
				"postal_code":args.postal_code,
			},  
				callback: function(r) {
					msgprint("Doctor added")
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
     }
});