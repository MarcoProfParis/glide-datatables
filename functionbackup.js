window.function = function (table, tableID, buttons, colReorder, domOptions) {
  if (table.value === undefined) return undefined;
  if (tableID.value === undefined) return undefined;
  var buttonSpec = buttons.value ? buttons.value : `''`;
  var col_ordering = colReorder.value ? colReorder.value : false;
  var dom = domOptions.value ? domOptions.value : 'BRfrtlip';

  const BASE_OPTIONS = `
    <script type="text/javascript" src="/media/js/site.js?_=ddb358559c98dc9f79b85c6734f69e0f" data-domain="datatables.net" data-api="https://plausible.sprymedia.co.uk/api/event"></script>
	<script src="https://media.ethicalads.io/media/client/ethicalads.min.js"></script>
	<script type="text/javascript" src="/media/js/dynamic.php?comments-page=examples%2Fadvanced_init%2Frow_grouping.html" async></script>
    <script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css">
    `;

  const EXPORT_OPTIONS = `
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/2.2.3/css/buttons.dataTables.min.css">
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/2.2.3/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.html5.min.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.print.min.js"></script>
  `;

  const COLVIS_OPTIONS = `
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.colVis.min.js"></script>
  `;

  const COLREORDER_OPTIONS = col_ordering === true ? 
    `
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/colreorder/1.5.6/css/colReorder.dataTables.min.csss">
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/colreorder/1.5.6/js/dataTables.colReorder.min.js"></script>
    ` : '';
  
  var html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <title>DataTables example - Row grouping</title>
    <link rel="shortcut icon" type="image/png" href="/media/images/favicon.png">
    <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="http://www.datatables.net/rss.xml">
	<link rel="stylesheet" type="text/css" href="/media/css/site-examples.css?_=11229a4cc52ab488c3d6ed72e1ec231e1">
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css">
	<style type="text/css" class="init">
	
tr.group,
tr.group:hover {
	background-color: #ddd !important;
}

	</style>
    ${BASE_OPTIONS}
    ${EXPORT_OPTIONS}
    ${COLVIS_OPTIONS}
    ${COLREORDER_OPTIONS}
  </head>
  <body>
   ${table.value}
  </body>
  </html>
  <script type="text/javascript" class="init">
    $(document).ready(function () {
    var groupColumn = 1;
    	var table = $('tableID.value').DataTable({
		columnDefs: [{ visible: false, targets: groupColumn }],
		order: [[groupColumn, 'asc']],
		displayLength: 25,
		dom: '${dom}',
                buttons: [
                ${buttonSpec}
                ],
		drawCallback: function (settings) {
			var api = this.api();
			var rows = api.rows({ page: 'current' }).nodes();
			var last = null;

			api
				.column(groupColumn, { page: 'current' })
				.data()
				.each(function (group, i) {
					if (last !== group) {
						$(rows)
							.eq(i)
							.before('<tr class="group"><td colspan="5">' + group + '</td></tr>');

						last = group;
					}
				});
		},
	});

	// Order by the grouping
	$('#tableID.value tbody').on('click', 'tr.group', function () {
		var currentOrder = table.order()[0];
		if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
			table.order([groupColumn, 'desc']).draw();
		} else {
			table.order([groupColumn, 'asc']).draw();
		}
	});
});
  </script>
  `;

  var enc = encodeURIComponent(html);
  var uri = `data:text/html;charset=utf-8,${enc}`
  return uri; 
}

