frappe.views.calendar["Meeting"] = {
	field_map: {
		"start": "start",
		"end": "end",
		"id": "name",
		"title": "title",
		"status": "meeting_location",
		"allDay": "all_day",
		"color" : "color",
	},
	gantt: true,
	get_events_method: "meeting.api.get_meetings",
	filters: [
		{
			"fieldtype": "Link",
			"fieldname": "meeting_location",
			"options": "Meeting Location",
			"label": __("Meeting Location")
		}]
}
