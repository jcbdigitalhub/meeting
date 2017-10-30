frappe.treeview_settings["Team"] = {
	// get_tree_nodes: "meeting.doctype.team.team.get_children",
	// add_tree_node: "meeting.doctype.team.team.add_node",
	// get_tree_root: false,
	// root_label: "Team",
	ignore_fields:["parent_team"],
	onrender: function(node) {
		console.log(node.data);
		if (node.data) {
			$('<span class="balance-area pull-right text-muted small">'
			+ 'Active-' +node.data.value
			+ '</span>').insertBefore(node.$ul);
		}
	}
}
