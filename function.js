window.function = function (table, tableID, allow_export) {
  if (table.value === undefined) return undefined;
  if (tableID.value === undefined) return undefined;
  var export = allow_export.value ? allow_export.value : false;
  var export_js = '';

  const BASE_OPTIONS = `
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
  
  var html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    ${BASE_OPTIONS}
  `;

  if (export === true) {
    html += EXPORT_OPTIONS;
    export_js = `
      {
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    }`;
  }

  html += `
    </head>
    <body>
   ${table.value}
    </body>
    </html>
    <script type="text/javascript" class="init">
    $(document).ready(function () {
      $('#${tableID.value}').DataTable(${export_js});
    });
  </script>
  `;

  var enc = encodeURIComponent(html);
  var uri = `data:text/html;charset=utf-8,${enc}`
  return uri; 
}
